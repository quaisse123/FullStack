from django.shortcuts import render
from django.http import JsonResponse
from Auth.models import MembreBureau
# Create your views here.


def Dashboard (request):
    print('='*200)
    print("Dkhelt lview dial dashboard",request.user)
    print('='*200)
    if request.user.is_authenticated:
        first_name = request.user.first_name
        last_name = request.user.last_name
        email = request.user.email
        photo_url = MembreBureau.objects.get(user=request.user).photo.url
        print("Ana f dashboard view ","="*70,"\n",first_name,last_name,email,photo_url,"\n","="*70)
        # Utilise ces données dans ton contexte pour les afficher dans le template
        return JsonResponse({
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'photo_url': photo_url,
        })
    else :
        return JsonResponse({'error' : 'Données non transmises'})