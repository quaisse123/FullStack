from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Etudiant , MembreBureau ,Adherent
from django.contrib import messages

import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)

        user = authenticate(request, username=user.username, password=password)
        if user is not None:
            login(request, user)
            
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)



def logout_view(request):
    logout(request)
    return redirect('login')


def register_etudiant(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        cne = request.POST.get('cne')
        niveau = request.POST.get('niveau')
        filiere = request.POST.get('filiere')

        if User.objects.filter(username=username).exists():
            messages.error(request, "Nom d'utilisateur déjà utilisé.")
            return redirect('register')

        if User.objects.filter(email=email).exists():
            messages.error(request, "Email déjà utilisé.")
            return redirect('register')

        user = User.objects.create_user(username=username, email=email, password=password)
        Etudiant.objects.create(user=user, cne=cne, niveau=niveau, filiere=filiere)

        messages.success(request, "Compte créé avec succès. Vous pouvez maintenant vous connecter.")
        return redirect('login')

    return render(request, 'register.html')
