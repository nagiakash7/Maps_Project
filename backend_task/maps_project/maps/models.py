from django.db import models

class Location(models.Model):
    address = models.CharField(max_length=255)
    formatted_address = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.formatted_address or self.address
