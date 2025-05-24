import random
from datetime import datetime, timedelta
from django.utils.timezone import make_aware
from ApiEvents.models import Event  # Remplace `yourapp` par le nom de ton app

# Supprime les anciens événements pour un test propre (optionnel)
Event.objects.all().delete()

titles = [
    "Conférence sur l'IA",
    "Atelier Django",
    "Hackathon Étudiant",
    "Rencontre Tech ENSAM",
    "Conférence Énergies Renouvelables",
    "Forum de l'Innovation",
    "Workshop Design Thinking",
    "Formation Sécurité Web",
    "Présentation Projets Fin d'Études",
    "Salon des Clubs ENSAM"
]

locations = [
    "Amphi 1", "Salle B204", "Amphi central", "Laboratoire 3", "Salle informatique",
    "Salle des conférences", "Salle B101", "Hall principal", "Centre des clubs", "Auditorium"
]

descriptions = [
    "Un événement pour explorer les dernières avancées dans le domaine.",
    "Une session pratique pour apprendre en équipe.",
    "Compétition entre étudiants sur 48h.",
    "Rencontres avec les professionnels du secteur.",
    "Découverte des nouvelles technologies vertes.",
    "Partage d’idées et d’initiatives innovantes.",
    "Travail collaboratif autour d’un thème donné.",
    "Apprentissage des bonnes pratiques de sécurité.",
    "Présentation des projets réalisés cette année.",
    "Vitrine des activités menées par les clubs."
]

for i in range(10):
    date = make_aware(datetime.now() + timedelta(days=random.randint(1, 60)))
    capacite = random.randint(30, 100)
    places_dispo = random.randint(0, capacite)

    Event.objects.create(
        title=titles[i],
        date=date,
        location=locations[i],
        description=descriptions[i],
        capacite=capacite,
        places_dispo=places_dispo
    )

print("✅ 10 événements ajoutés avec succès.")
