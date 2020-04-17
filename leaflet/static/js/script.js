covidCases()
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function summationData(x){
  return x.reduce((a, b) => a + b, 0)
}

function covidCases() {
    
    axios.get('https://corona.lmao.ninja/v2/countries')
      .then(function (response) {
        let cases = []
        let deaths = []
        let recovered = []
        let activeCases = []
        let table_head = "<table><tr><th>Country</th><th>Active Cases</th><th>Deaths</th></tr>"
        let rows = []
          for(let i=0; i<response.data.length; i++){
              let country = response.data[i].country
              let country_active = numberWithCommas(response.data[i].active)
              let country_deaths = numberWithCommas(response.data[i].deaths)
              rows.push(`<tr> <td>${country}</td> <td>${country_active}</td> <td>${country_deaths}</td></tr>`)
              if(response.data[i].countryInfo.iso2 !== null){
                let country_code = response.data[i].countryInfo.iso2
                cases.push(response.data[i]['cases'])
                recovered.push(response.data[i]['recovered'])
                deaths.push(response.data[i]['deaths'])
                activeCases.push(response.data[i]['active'])
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
          for(let k=0;k<rows.length;k++){
            table_head+=rows[k]
          }
          $('#table').append(table_head+"</table>")
          $('#cases').append(numberWithCommas(summationData(cases)))
          $('#deaths').append(numberWithCommas(summationData(deaths)))
          $('#recovered').append(numberWithCommas(summationData(recovered)))
          $('#active-cases').append(numberWithCommas(summationData(activeCases)))
          // console.log(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });   
  }

var mymap = L.map('mapid').setView([0, 0], 2.6);



L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${atob(mapbox_token)}`, {
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
  let point_color = 'blue'
  let customPopup = `<h3>${country}</h3><p><b>Cases:</b> ${numberWithCommas(cases)}</p><p><b>Deaths:</b> ${numberWithCommas(deaths)}</p><p><b>Recovered: </b>${numberWithCommas(recovered)}</p><p><b>Active Cases: </b>${numberWithCommas(active_cases)}</p>`
  if(active_cases>=10000){
    point_color='red'
    point = 5*50000
  }else if(active_cases>=50 && active_cases<100){
    point_color='green'
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
  div.innerHTML += '<i style="background: blue"></i><span>1-49</span><br>';
  div.innerHTML += '<i style="background: green"></i><span>50-99</span><br>';
  div.innerHTML += '<i style="background: yellow"></i><span>100-999</span><br>';
  div.innerHTML += '<i style="background: orange"></i><span>1,000-9,999</span><br>';
  div.innerHTML += '<i style="background: red"></i><span>10,000+</span><br>';
  
  

  return div;
};

legend.addTo(mymap);

var width_phone = matchMedia("(max-width: 600px)")
var width_tab = matchMedia("(max-width: 800px)")

function openNav() {
  if(width_phone.matches){
    document.getElementById("mySidenav").style.width = "60%";
    document.getElementById("mapid").style.marginLeft = "60%";
  }else if(width_tab.matches){
    document.getElementById("mySidenav").style.width = "40%";
    document.getElementById("mapid").style.marginLeft = "40%";
  }else{
    document.getElementById("mySidenav").style.width = "28%";
    // document.getElementById("mapid").style.marginLeft = "26%";
  }

  $("#btn").hide()

}

  function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  $("#btn").show()
  document.getElementById("mapid").style.marginLeft = "0";
}
