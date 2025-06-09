from django.shortcuts import render
from django.http import JsonResponse
from Auth.models import MembreBureau ,Adherent
# Create your views here.


def Dashboard (request):
    nbr_adherents = Adherent.objects.count()
    if request.user.is_authenticated:
        id = request.user.id
        first_name = request.user.first_name
        last_name = request.user.last_name
        email = request.user.email
        
        
        photo_url = None
        try:
            # Cas 1 : MembreBureau
            membre = MembreBureau.objects.get(user=request.user)
            photo_url = membre.photo.url
        except MembreBureau.DoesNotExist:
            try:
                # Cas 2 : Adherent
                adherent = Adherent.objects.get(user=request.user)
                photo_url = adherent.photo.url
            except Adherent.DoesNotExist:
                # Aucun des deux : laisse photo_url à None
                pass
        
        # Utilise ces données dans ton contexte pour les afficher dans le template
        return JsonResponse({
            'id': id,
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'photo_url': photo_url,
            'nbr_adherents': nbr_adherents
        })
    else :
        return JsonResponse({'error' : 'Données non transmises'})