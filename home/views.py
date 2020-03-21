from django.shortcuts import render
from leaflet.settings import ACCESS_TOKEN

def home(request):
    mapbox_access_token = ACCESS_TOKEN
    context = {
        'access_token':mapbox_access_token
    }
    return render(request, 'index.html', context)