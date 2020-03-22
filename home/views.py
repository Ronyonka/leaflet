import requests 
from django.shortcuts import render
from leaflet.settings import ACCESS_TOKEN
import csv

def checkKey(dict, key): 
      
    if key in dict.keys(): 
        return True
    else: 
        return False

def home(request):
    mapbox_access_token = ACCESS_TOKEN
    r = requests.get(url='https://corona.lmao.ninja/countries')
    cases = r.json() 
    coordinates = {}
    with open('countries - longitudes and latitudes.csv', 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            country = row[3]
            lat = row[1]
            lng = row[2]
            coordinates[country]=[lat, lng]
    for i in range(len(cases)):
        key = cases[i]['country']
        if checkKey(coordinates, key):
            cases[i]['coordinates']=coordinates[key]
       
    context = {
        'access_token':mapbox_access_token,
        'cases': cases
    }
    del coordinates['name']
    print(cases)
    return render(request, 'index.html', context)