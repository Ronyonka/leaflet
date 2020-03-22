console.log('This Works!')
function covidCases() {
    
    axios.get('https://corona.lmao.ninja/countries')
      .then(function (response) {
          // for(let i=0; i<response.data.length; i++){
          //     let country = response.data[i].country
          //     let cases = response.data[i].cases
          //     console.log(`${country} has recorded ${cases} cases`)
          // }
        console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });   
  }
var mymap = L.map('mapid').setView([0, 0], 2.6);
covidCases()
// var covid = axios.get()
// console.log(covid)
L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapbox_token}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    minZoom: 2,
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

for(let j=0; j<covid_cases.length; j++){
if(covid_cases[j]['coordinates']){
  var circle = L.circle(covid_cases[j]['coordinates'], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
  }).addTo(mymap);
}
}

console.log(covid_cases)