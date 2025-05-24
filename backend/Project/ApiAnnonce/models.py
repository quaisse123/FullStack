from django.db import models
from Auth.models import MembreBureau

class Annonce(models.Model):
    auteur = models.ForeignKey(MembreBureau, on_delete=models.CASCADE, related_name='annonces')
    titre = models.CharField(max_length=255)
    contenu = models.TextField()
    date_creation = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return self.titre
