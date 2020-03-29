import requests
import json
import csv

from django.shortcuts import render

# importing the access token from the settings module
from leaflet.settings import ACCESS_TOKEN


def lng_lat():
    coordinates = {}
    with open('countries - longitudes and latitudes.csv', 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            country = row[3]
            lat = row[1]
            lng = row[2]
            coordinates[country]=[lat, lng]
    del coordinates['name']
    return coordinates
def lng_lat_country_code():
    coordinates = {}
    with open('countries - longitudes and latitudes.csv', 'r') as file:
        reader = csv.reader(file)
        for row in reader:
            country_code = row[0]
            lat = row[1]
            lng = row[2]
            coordinates[country_code]=[lat, lng]
    del coordinates['country']
    return coordinates

def home(request):
    access_token=ACCESS_TOKEN
    coordinates = lng_lat()
    coordinates_coded = lng_lat_country_code()
    context = {
        'access_token':access_token,
        'coordinates':coordinates,
        'coordinates_coded':coordinates_coded
    }
    return render(request, 'map.html', context)


# def get_api_data():
#     r = requests.get(url='https://corona.lmao.ninja/countries')
#     data = json.loads(r.text)
#     return data

# def checkKey(dict, key): 
      
#     if key in dict.keys(): 
#         return True
#     else: 
#         return False

# def total_cases():
#     data = get_api_data()
#     cases = []
#     for i in range(len(data)):
#         cases.append(data[i]['cases'])
#     return sum(cases)

# def total_deaths():
#     data = get_api_data()
#     deaths = []
#     for i in range(len(data)):
#         deaths.append(data[i]['deaths'])
#     return sum(deaths)

# def total_recovered():
#     data = get_api_data()
#     recovered = []
#     for i in range(len(data)):
#         recovered.append(data[i]['recovered'])
#     return sum(recovered)

# def total_active():
#     data = get_api_data()
#     active = []
#     for i in range(len(data)):
#         active.append(data[i]['active'])
#     return sum(active)

# def home(request):
#     mapbox_access_token = ACCESS_TOKEN
#     cases = get_api_data()
#     sum_cases = total_cases()
#     sum_deaths = total_deaths()
#     sum_recovered = total_recovered()
#     sum_active= total_active()
#     coordinates = {}
#     with open('countries - longitudes and latitudes.csv', 'r') as file:
#         reader = csv.reader(file)
#         for row in reader:
#             country = row[3]
#             lat = row[1]
#             lng = row[2]
#             coordinates[country]=[lat, lng]
#     for i in range(len(cases)):
#         key = cases[i]['country']
#         if checkKey(coordinates, key):
#             cases[i]['coordinates']=coordinates[key]
       
#     context = {
#         'access_token':mapbox_access_token,
#         'cases': cases,
#         'cases_json': json_response(cases),
#         'total_cases':sum_cases,
#         'total_deaths':sum_deaths,
#         'total_recovered':sum_recovered,
#         'total_active':sum_active,
#     }
#     del coordinates['name']
#     # print(cases)
#     return render(request, 'index.html', context)
