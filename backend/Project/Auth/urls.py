from django.urls import path 
from . import views  
urlpatterns = [
    path('login', views.login_view),
    path('logout', views.logout_view),
    path('profile/<int:id>/', views.profile_view),
]