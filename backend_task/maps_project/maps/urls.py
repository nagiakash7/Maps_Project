from django.urls import path
from .views import GeocodeView, ReverseGeocodeView, CalculateDistanceView

urlpatterns = [
    path('geocode/', GeocodeView.as_view(), name='geocode'),
    path('reverse-geocode/', ReverseGeocodeView.as_view(), name='reverse-geocode'),
    path('calculate-distance/', CalculateDistanceView.as_view(), name='calculate-distance'),
]
