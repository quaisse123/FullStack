from django.urls import path 
from .views import Articles,Article,Landing
urlpatterns = [
    path('articles/', Articles.as_view() ,name='articles-list-create'),
    path('article', Article.as_view() ,name='articles Page'),
    path('landing', Landing.as_view() ,name='article Page'),
]
