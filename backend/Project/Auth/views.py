from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Etudiant
from django.contrib import messages

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Trouver l'utilisateur correspondant à l'email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            messages.error(request, "Email ou mot de passe invalide.")
            return redirect('login')

        user = authenticate(request, username=user.username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')  # redirige vers la page d'accueil
        else:
            messages.error(request, "Email ou mot de passe invalide.")
    return render(request, 'login.html')


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
