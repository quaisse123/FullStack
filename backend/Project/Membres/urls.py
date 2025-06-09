from django.urls import path
from . import views 
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('liste', views.MembersList, name="MembersList"),
    path('ajouter', views.AjouterAdherentAPIView, name='ajouter-adherent'),
    path('supprimer/<int:id>', views.DeleteAdherentAPIView, name='supprimer-adherent'),
]




urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)