from django.contrib import admin
from .models import Etudiant,MembreBureau,Adherent
# Register your models here.
admin.site.register (Etudiant)
admin.site.register (MembreBureau)
admin.site.register (Adherent)