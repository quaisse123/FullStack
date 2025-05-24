from django.shortcuts import render
from .models import Event
from django.http import JsonResponse
from .serializers import EventSerializer
# Create your views here.
from django.utils import timezone

def EventListView(request):
    events = Event.objects.all()
    search = request.GET.get('search')
    status = request.GET.get('status')
    period = request.GET.get('period')
    eventtype = request.GET.get('type')

    if search:
        events = events.filter(title__icontains=search)

    if status:
        if status == 'upcoming':
            events = events.filter(date__gte=timezone.now())
        else :
            events = events.filter(date__lt=timezone.now())
        
    if period != 'all':
        if period == 'week':
            start_date = timezone.now()
            end_date = start_date + timezone.timedelta(days=7)
            events = events.filter(date__range=(start_date, end_date))
        elif period == 'month':
            start_date = timezone.now()
            end_date = start_date + timezone.timedelta(days=30)
            events = events.filter(date__range=(start_date, end_date))

    
    serializer = EventSerializer(events, many=True)
    serialized_data = serializer.data
    
    return JsonResponse(serialized_data, safe=False)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Event

@csrf_exempt
def NewEvent(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        Event.objects.create(
            title=data['title'],
            description=data['description'],
            date=data['date'],
            location=data['location'],
            capacite=data['capacite'],
            places_dispo=data['places_dispo']
        )

        return JsonResponse({'message': 'Event created'}, status=201)

    return JsonResponse({'message': 'Only POST allowed'}, status=405)