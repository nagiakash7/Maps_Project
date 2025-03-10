import requests
import os
import math
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Location
from .serializers import LocationSerializer

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access the API key
GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

class GeocodeView(APIView):
    def get(self, request):
        address = request.query_params.get("address")  # ✅ Use query_params for GET requests
        if not address:
            return Response({"error": "Address is required"}, status=status.HTTP_400_BAD_REQUEST)

        url = f"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={GOOGLE_MAPS_API_KEY}"
        response = requests.get(url).json()

        if response["status"] != "OK":
            return Response({"error": "Invalid address"}, status=status.HTTP_400_BAD_REQUEST)

        result = response["results"][0]
        formatted_address = result["formatted_address"]
        location = result["geometry"]["location"]
        latitude, longitude = location["lat"], location["lng"]

        location_obj, created = Location.objects.get_or_create(
            address=formatted_address,  # Use formatted address
            defaults={"latitude": latitude, "longitude": longitude},
        )

        serializer = LocationSerializer(location_obj)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class ReverseGeocodeView(APIView):
    def get(self, request):
        lat = request.GET.get("lat")
        lng = request.GET.get("lng")
        if not lat or not lng:
            return Response({"error": "Latitude and Longitude are required"}, status=status.HTTP_400_BAD_REQUEST)

        url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat},{lng}&key={GOOGLE_MAPS_API_KEY}"
        response = requests.get(url).json()

        if response["status"] != "OK":
            return Response({"error": "Invalid coordinates"}, status=status.HTTP_400_BAD_REQUEST)

        formatted_address = response["results"][0]["formatted_address"]
        return Response({"formatted_address": formatted_address}, status=status.HTTP_200_OK)


class CalculateDistanceView(APIView):
    def get(self, request):
        lat1, lng1 = request.GET.get("lat1"), request.GET.get("lng1")
        lat2, lng2 = request.GET.get("lat2"), request.GET.get("lng2")

        if not all([lat1, lng1, lat2, lng2]):
            return Response({"error": "All coordinates (lat1, lng1, lat2, lng2) are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            lat1, lng1, lat2, lng2 = map(float, [lat1, lng1, lat2, lng2])
        except ValueError:
            return Response({"error": "Coordinates must be valid numbers"}, status=status.HTTP_400_BAD_REQUEST)

        def haversine(lat1, lon1, lat2, lon2):
            R = 6371  # Earth radius in km
            d_lat = math.radians(lat2 - lat1)
            d_lon = math.radians(lon2 - lon1)
            a = math.sin(d_lat / 2) ** 2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(d_lon / 2) ** 2
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
            return R * c  # Distance in km

        distance = haversine(lat1, lng1, lat2, lng2)
        return Response({"distance_km": round(distance, 2)}, status=status.HTTP_200_OK)
