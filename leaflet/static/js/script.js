covidCases()
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function covidCases() {
    
    axios.get('https://corona.lmao.ninja/countries')
      .then(function (response) {
          for(let i=0; i<response.data.length; i++){
              let country = response.data[i].country
              if(response.data[i].countryInfo.iso2 !== null){
                let country_code = response.data[i].countryInfo.iso2
                if (country_code in country_code_coordinates){
                  response.data[i].coordinates= country_code_coordinates[country_code]
                  // calls the map plotting function taking the country data as the parmeter
                  map_plotting(response.data[i]);
                }else{
                  console.log(`USING ISO2 COUNTRY CODE: ${country_code} Country (${country}) does not have coordinates`)
                }
              }else{
                  if (country in country_coordinates){
                    response.data[i].coordinates= country_coordinates[country]
                    // calls the map plotting function taking the country data as the parmeter
                    map_plotting(response.data[i]);
                  }else{
                    console.log(`USING FULL COUNTRY NAME: ${country} does not have coordinates`)
                  }
          }}
          // console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });   
  }


var mymap = L.map('mapid').setView([0, 0], 2.6);



L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapbox_token}`, {
    attribution: 'By <a href="https://ronyonka.github.io" target="_blank">Ron Onyonka</a>',
    minZoom: 2,
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

function map_plotting(myobj) {
  let country = myobj['country']
  let cases = myobj['cases']
  let active_cases = myobj['active']
  let deaths = myobj['deaths']
  let recovered = myobj['recovered']
  let point = 50000
  let point_color = 'green'
  let customPopup = `<h3>${country}</h3><p><b>Cases:</b> ${numberWithCommas(cases)}</p><p><b>Deaths:</b> ${numberWithCommas(deaths)}</p><p><b>Recovered: </b>${numberWithCommas(recovered)}</p><p><b>Active Cases: </b>${numberWithCommas(active_cases)}</p>`
  if(active_cases>=10000){
    point_color='red'
    point = 5*50000
  }else if(active_cases>=50 && active_cases<100){
    point_color='blue'
  }else if(active_cases>=1000 && active_cases<10000){
    point_color = 'orange'
    point = 2*50000
  }else if(active_cases>=100 && active_cases<1000){
    point_color = 'yellow'
    point = 1.5*50000
  }
  let circle = L.circle(myobj['coordinates'], {
    color: point_color,
    fillColor: point_color,
    fillOpacity: 0.3,
    radius: point
  }).addTo(mymap);
  circle.bindPopup(customPopup);
}

var legend = L.control({ position: "bottomright" });

legend.onAdd = function(mymap) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Covid-19 Active Cases</h4>";
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