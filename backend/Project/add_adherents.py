import random
import uuid
from Auth.models import Adherent, MembreBureau, Etudiant  # Importation des modèles
from django.contrib.auth.models import User  # Importation du modèle User
from datetime import datetime

# Liste simulée de prénoms et noms arabes
first_names = ["Ahmed", "Omar", "Youssef", "Ali", "Hassan", "Mohamed", "Khaled", "Rachid", "Tariq", "Abdelkader"]
last_names = ["Ben Ali", "El Mahdi", "Belaid", "Zaid", "Bensalem", "Farsi", "Boumediene", "Charef", "Mansouri", "Mokhtar"]

# Liste des niveaux et des filières
NIVEAUX = ['API1', 'API2', 'CI1', 'CI2', 'CI3']
FILIERES = ['IAGI', 'CS2C', 'GEM', 'MSEI', 'GSMI', 'GSI']

# Fonction pour générer un utilisateur avec un identifiant unique
def generate_user(first_name, last_name):
    # Ajouter un UUID pour garantir l'unicité du nom d'utilisateur
    username = f"{first_name.lower()}.{last_name.lower()}.{uuid.uuid4().hex[:6]}"
    email = f"{username}@adherent.com"
    password = 'password123'  # Utilise un mot de passe par défaut (ou tu peux en générer un)
    
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name
    )
    return user

# Boucle pour créer 20 adhérents, membres de bureau et étudiants
for i in range(20):
    first_name = random.choice(first_names)
    last_name = random.choice(last_names)
    
    # Générer un utilisateur avec un username unique
    user = generate_user(first_name, last_name)
    
    # Attribuer un niveau et une filière aléatoires
    niveau = random.choice(NIVEAUX)
    filiere = random.choice(FILIERES)
    
    # Créer un adhérent
    Adherent.objects.create(
        user=user,
        niveau=niveau,
        filiere=filiere,
        telephone=f"06{random.randint(10000000, 99999999)}",
    )
    
    # Créer un membre de bureau (20% de chances d'être un membre de bureau)
    if random.random() < 0.2:
        role = random.choice(['Président', 'Vice-président', 'Secrétaire', 'Trésorier'])
        MembreBureau.objects.create(
            user=user,
            role=role,
            niveau=niveau,
            filiere=filiere,
            telephone=f"06{random.randint(10000000, 99999999)}"
        )
    
    # Créer un étudiant (5% de chances d'être un étudiant)
    if random.random() < 0.05:
        Etudiant.objects.create(
            user=user,
            cne=f"CNE{random.randint(1000000, 9999999)}",
            niveau=niveau,
            filiere=filiere
        )
    
    # Affichage pour chaque adhérent ajouté
    print(f"Adhérent {first_name} {last_name} ajouté.")
