# auth/serializers.py
from rest_framework import serializers
from .models import Adherent
from django.contrib.auth.models import User

class AdherentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adherent
        fields = [field.name for field in Adherent._meta.get_fields()]  # Récupère tous les champs du modèle
        depth = 1  # Cela inclut les champs de l'objet lié 'user'
