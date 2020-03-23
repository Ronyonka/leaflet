import requests 
from django.shortcuts import render
from leaflet.settings import ACCESS_TOKEN
import csv

def get_request():
    r = requests.get(url='https://corona.lmao.ninja/countries')
    data = r.json()
    return data

def checkKey(dict, key): 
      
    if key in dict.keys(): 
        return True
    else: 
        return False

def total_cases():
    data = get_request()
    cases = []
    for i in range(len(data)):
        cases.append(data[i]['cases'])
    return sum(cases)

def total_deaths():
    data = get_request()
    deaths = []
    for i in range(len(data)):
        deaths.append(data[i]['deaths'])
    return sum(deaths)

def total_recovered():
    data = get_request()
    recovered = []
    for i in range(len(data)):
        recovered.append(data[i]['recovered'])
    return sum(recovered)

def total_active():
    data = get_request()
    active = []
    for i in range(len(data)):
        active.append(data[i]['active'])
    return sum(active)

def home(request):
    mapbox_access_token = ACCESS_TOKEN
    r = requests.get(url='https://corona.lmao.ninja/countries')
    cases = r.json()
    sum_cases = total_cases()
    sum_deaths = total_deaths()
    sum_recovered = total_recovered()
    sum_active= total_active()
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
        'cases': cases,
        'total_cases':sum_cases,
        'total_deaths':sum_deaths,
        'total_recovered':sum_recovered,
        'total_active':sum_active,
    }
    del coordinates['name']
    # print(cases)
    return render(request, 'index.html', context)
