from django.db import models
from django.contrib.auth.models import User

DEFAULT_PROFILE = 'profile_photos/defaultProfile.png'
  # chemin vers une image par défaut


NIVEAUX  = [
        ('API1', 'API1'),
        ('API2', 'API2'),
        ('CI1', 'CI1'),
        ('CI2', 'CI2'),
        ('CI3', 'CI3'),
    ]
FILIERES  = [
        ('IAGI', 'IAGI'),
        ('CS2C', 'CS2C'),
        ('GEM', 'GEM'),
        ('MSEI', 'MSEI'),
        ('GSMI', 'GSMI'),
        ('GSI', 'GSI'),
    ]

class Adherent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='adherent_profile')
    photo = models.ImageField(upload_to='profile_photos/', default=DEFAULT_PROFILE)
    date_adhesion = models.DateField()
    is_approved = models.BooleanField(default=True)
    niveau = models.CharField(max_length=10, choices=NIVEAUX , blank=True, null=True)
    filiere = models.CharField(max_length=10, choices=FILIERES , blank=True, null=True)
    telephone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"Adhérent: {self.user.username}"

class MembreBureau(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='bureau_profile')
    photo = models.ImageField(upload_to='profile_photos/', default=DEFAULT_PROFILE)
    role = models.CharField(max_length=50)  # Président, Vice-président, etc.
    niveau = models.CharField(max_length=10, choices=NIVEAUX , blank=True, null=True)
    filiere = models.CharField(max_length=10, choices=FILIERES , blank=True, null=True)
    telephone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"Bureau: {self.user.username} - {self.role}"

class Etudiant(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='etudiant_profile')
    photo = models.ImageField(upload_to='profile_photos/', default=DEFAULT_PROFILE)
    cne = models.CharField(max_length=20, unique=True)  # Code national étudiant
    niveau = models.CharField(max_length=10, choices=NIVEAUX , blank=True, null=True)
    filiere = models.CharField(max_length=10, choices=FILIERES , blank=True, null=True)

    def __str__(self):
        return f"Etudiant: {self.user.username}"
