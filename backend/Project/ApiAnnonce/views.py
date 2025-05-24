from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Annonce
from Auth.models import MembreBureau

@csrf_exempt
def ApiAnnonce(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # par exemple, récupérer contenu et titre
            contenu = data.get('contenu')
            titre = data.get('titre', 'Sans titre')

            # récupérer l'auteur, ici tu peux faire un fallback ou une méthode d'authentification
            auteur = MembreBureau.objects.first()  # à changer par utilisateur connecté

            annonce = Annonce.objects.create(auteur=auteur, titre=titre, contenu=contenu)

            return JsonResponse({
                'id': annonce.id,
                'titre': annonce.titre,
                'contenu': annonce.contenu,
                'date_creation': annonce.date_creation.strftime("%Y-%m-%d %H:%M:%S"),
                'auteur': {
                    'id': annonce.auteur.id,
                    'username': annonce.auteur.user.username
                }
            }, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    # Pour GET ou autres méthodes
    if request.method == 'GET':
        annonces = Annonce.objects.all().order_by('-date_creation')
        result = []
        for a in annonces:
            result.append({
                'id': a.id,
                'titre': a.titre,
                'contenu': a.contenu,
                'date_creation': a.date_creation.strftime("%Y-%m-%d %H:%M:%S"),
                'auteur': {
                    'id': a.auteur.id,
                    'username': a.auteur.user.username
                }
            })
        return JsonResponse(result, safe=False)
