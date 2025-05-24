from django.urls import path
from . import views
urlpatterns = [
    
    path ('annonces/',views.ApiAnnonce,name='annonces')
]


