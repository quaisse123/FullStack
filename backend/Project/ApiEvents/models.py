from django.db import models

# Create your models here.


class Event(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateTimeField()
    location = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    capacite = models.PositiveIntegerField(default=0)
    places_dispo = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title