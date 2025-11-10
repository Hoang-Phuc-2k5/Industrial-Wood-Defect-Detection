# app/models.py
from django.db import models

'''
class Supplier(models.Model):
    name = models.CharField(max_length=255, unique=True)
    contact = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
'''

class ImageAnalysis(models.Model):
    image_name = models.CharField(max_length=255)
    total_errors = models.IntegerField()
    class_counts = models.JSONField()  # {"Crack":2,"Marrow":0,...}
    quality = models.CharField(max_length=50)  # "Rất tốt", "Tốt", ...
    threshold = models.FloatField(default=0.5)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.image_name} - {self.quality} - {self.total_errors} errors"
