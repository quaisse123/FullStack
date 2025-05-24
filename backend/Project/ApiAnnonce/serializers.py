from rest_framework import serializers
from .models import Annonce

class AnnonceSerializer(serializers.ModelSerializer):
    auteur_username = serializers.ReadOnlyField(source='auteur.username')  # Pour afficher le nom d'utilisateur

    class Meta:
        model = Annonce
        fields = ['id', 'auteur', 'auteur_username', 'titre', 'contenu', 'date_creation']  # 👈 Ajout ici
