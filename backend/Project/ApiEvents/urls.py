from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.EventListView,name='event-list'),
    path('new', views.NewEvent,name='new-event'),
]