from django.shortcuts import render
from django.http import JsonResponse
from Auth.models import MembreBureau ,Adherent
# Create your views here.


def Dashboard (request):
    nbr_adherents = Adherent.objects.count()
    if request.user.is_authenticated:
        first_name = request.user.first_name
        last_name = request.user.last_name
        email = request.user.email
        photo_url = MembreBureau.objects.get(user=request.user).photo.url
        # Utilise ces données dans ton contexte pour les afficher dans le template
        return JsonResponse({
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'photo_url': photo_url,
            'nbr_adherents': nbr_adherents
        })
    else :
        return JsonResponse({'error' : 'Données non transmises'})