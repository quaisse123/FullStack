from django.shortcuts import render
from rest_framework import generics , status
from rest_framework.response import Response
# from rest_framework import APIView
from django.http import Http404
from . import models 
from . import serializers
# Create your views here.


class Articles (generics.ListCreateAPIView)  :
    queryset = models.Article.objects.all()
    serializer_class = serializers.ArticleSerializer


class Article (generics.ListCreateAPIView)  :
    queryset = models.Article.objects.all()
    serializer_class = serializers.ArticleSerializer


class Landing (generics.ListCreateAPIView)  :
    queryset = models.Article.objects.all()
    serializer_class = serializers.ArticleSerializer