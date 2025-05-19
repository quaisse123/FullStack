from rest_framework.response import Response
from rest_framework.decorators import api_view
from Auth.models import Adherent
from Auth.serializers import AdherentSerializer
from django.db.models import Q

@api_view(['GET'])
def MembersList(request):
    search = request.GET.get("search", "")
    statut = request.GET.get("statut", "")
    annee = request.GET.get("annee", "")
    filiere = request.GET.get("filiere", "")

    adherents = Adherent.objects.all()

    if search:
        adherents = adherents.filter(
            Q(user__first_name__icontains=search) |
            Q(user__last_name__icontains=search) |
            Q(filiere__icontains=search) |
            Q(niveau__icontains=search)
        )

    if statut:
    # Ici, on filtre selon si 'Approuvé' ou 'Non approuvé' (exemple : statut='approuvé')
        if statut.lower() == "approuvé":
            adherents = adherents.filter(is_approved=True)
        elif statut.lower() == "non approuvé":
            adherents = adherents.filter(is_approved=False)

    if annee:
        # Filtre par année sur la date d’adhésion, en convertissant la chaîne en int
        try:
            annee_int = int(annee)
            adherents = adherents.filter(date_adhesion__year=annee_int)
        except ValueError:
            print("Année invalide, filtre ignoré.")
            pass  # Ignore filtre si année invalides

    if filiere:
        # Filtre insensible à la casse, mais partiel (contient) au lieu de exact
        adherents = adherents.filter(filiere__icontains=filiere)


    serializer = AdherentSerializer(adherents, many=True)
    return Response(serializer.data)


from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from Auth.serializers import AdherentSerializer

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def AjouterAdherentAPIView(request):
    data = request.data.copy()

    user = User.objects.create_user(
        username=data['prenom'] + data['nom'],
        email=data['email'],
        first_name=data['prenom'],
        last_name=data['nom'],
        password='default1234'
    )
    data['user'] = user.id

    serializer = AdherentSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=user)
        return Response({'message': 'Adhérent créé avec succès'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
