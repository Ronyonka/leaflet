// console.log = function() {}

console.log('This Works!')
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// function covidCases() {
    
//     axios.get('https://corona.lmao.ninja/countries')
//       .then(function (response) {
//           // for(let i=0; i<response.data.length; i++){
//           //     let country = response.data[i].country
//           //     let cases = response.data[i].cases
//           //     console.log(`${country} has recorded ${cases} cases`)
//           // }
//         console.log(response.data)
//       })
//       .catch(function (error) {
//         console.log(error)
//       });   
//   }
var mymap = L.map('mapid').setView([0, 0], 2.6);

// covidCases()
// var covid = axios.get()
// console.log(covid)
L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapbox_token}`, {
    attribution: 'By <a href="https://ronyonka.github.io" target="_blank">Ron Onyonka</a>',
    minZoom: 2,
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

// for(let j=0; j<covid_cases.length; j++){
// if(covid_cases[j]['coordinates']){
//   let country = covid_cases[j]['country']
//   let cases = covid_cases[j]['cases']
//   let active_cases = covid_cases[j]['active']
//   let deaths = covid_cases[j]['deaths']
//   let recovered = covid_cases[j]['recovered']
//   let point = 50000
//   let point_color = 'green'
//   let customPopup = `<h3>${country}</h3><p><b>Cases:</b> ${numberWithCommas(cases)}</p><p><b>Deaths:</b> ${numberWithCommas(deaths)}</p><p><b>Recovered: </b>${numberWithCommas(recovered)}</p><p><b>Active Cases: </b>${numberWithCommas(active_cases)}</p>`
//   if(cases>=10000){
//     point_color='red'
//     point = 5*50000
//   }else if(cases>=50 && cases<100){
//     point_color='blue'
//   }else if(cases>=1000 && cases<10000){
//     point_color = 'orange'
//     point = 2*50000
//   }else if(cases>=100 && cases<1000){
//     point_color = 'yellow'
//     point = 1.5*50000
//   }
//   let circle = L.circle(covid_cases[j]['coordinates'], {
//     color: point_color,
//     fillColor: point_color,
//     fillOpacity: 0.3,
//     radius: point
//   }).addTo(mymap);
//   // let marker = L.marker(covid_cases[j]['coordinates']).addTo(mymap);
//   // marker.bindPopup("I am a circle.");
//   // if(cases >1){
//     circle.bindPopup(customPopup);
//     // circle.bindPopup(`${country} has recorded ${numberWithCommas(cases)} cases of COVID-19`);
//   // }
//   // else{
//   //   circle.bindPopup(`${country} has recorded ${cases} case of COVID-19`);
//   // }
// }else{
//   // check for coordinates that are not presents
//   console.log(covid_cases[j]['country']+" does not have coordinates")
// }
// }

var legend = L.control({ position: "bottomright" });

legend.onAdd = function(mymap) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Covid-19 Cases</h4>";
  div.innerHTML += '<i style="background: green"></i><span>1-49</span><br>';
  div.innerHTML += '<i style="background: blue"></i><span>50-99</span><br>';
  div.innerHTML += '<i style="background: yellow"></i><span>100-999</span><br>';
  div.innerHTML += '<i style="background: orange"></i><span>1,000-9,999</span><br>';
  div.innerHTML += '<i style="background: red"></i><span>10,000+</span><br>';
  
  

  return div;
};

legend.addTo(mymap);


// function openNav() {
//   document.getElementById("mySidenav").style.width = "26%";
//   $("#btn").hide()
//   document.getElementById("mapid").style.marginLeft = "26%";
//   }

//   function closeNav() {
//   document.getElementById("mySidenav").style.width = "0";
//   $("#btn").show()
//   document.getElementById("mapid").style.marginLeft = "0";
//   }