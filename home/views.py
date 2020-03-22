from django.shortcuts import render
from leaflet.settings import ACCESS_TOKEN
import csv

def home(request):
    mapbox_access_token = ACCESS_TOKEN
    coordinates = {}
    with open('countries - longitudes and latitudes.csv', 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            country = row[3]
            lat = row[1]
            lng = row[2]
            coordinates[country]=[lat, lng]
            # print(row)
    context = {
        'access_token':mapbox_access_token
    }
    del coordinates['name']
    print(coordinates)
    return render(request, 'index.html', context)