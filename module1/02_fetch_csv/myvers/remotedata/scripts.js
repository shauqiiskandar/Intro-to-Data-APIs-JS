const api = 'https://api.wheretheiss.at/v1/satellites/25544';

const name1 = document.getElementById('name');
const visi1 = document.getElementById('visi');
const vel1 = document.getElementById('vel');
const time1 = document.getElementById('time');
const lat1 = document.getElementById('lat');

//*making the map and tiles
var mymap = L.map('issmap').setView([0, 0], 1);

const maptiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

//*making the marker with icon
const sicon = L.icon({
  iconUrl: 'space.png',
  iconSize: [50, 30],
  iconAnchor: [0, 0]
});

const mark = L.marker([0, 0], {icon: sicon}).addTo(mymap);

let initial = true;
async function getIss() {
  const resp = await fetch(api);
  const data = await resp.json();

  //*the json data from the api endpoint has been parsed into a readable js object so we can apply dot notation to get the object properties
  console.log(data.name);
  console.log(data.visibility);
  console.log(data.velocity);

  //*or we can use object destructuring take out the values for each property
  const {
    name,
    timestamp,
    latitude,
    visibility,
    velocity,
    longitude
  } = data;
  console.log('timestamp ' + timestamp);
  console.log('latitude ' + latitude);
  name1.textContent = 'name: ' + name;
  visi1.textContent = 'visibility: ' + visibility;
  vel1.textContent = 'velocity: ' + velocity;
  time1.textContent = 'time: ' + timestamp;
  lat1.textContent = 'latitude: ' + latitude;

  //*setting the marker location
  // let mark = L.marker([latitude, longitude]);
  // mark.addTo(mymap);

  //*getting old markers to disappear on every interval of t his function being called so as to not have markers all over the map
  // setInterval(() => {
  //   mark.remove();  
  // },999)
  //! to set the initial value of the map centralizing the marker
  if(initial == true){
    mymap.setView([latitude, longitude], 3);
    initial = false;
  } 
  

  //!using the global marker constant method. this will set the lang and long of the 1 marker everytime the  function is called. and not create a new marker
  mark.setLatLng([latitude, longitude]);
}
//*if calling the function without the interval you will only get the data once. with the interval fucn, you can continuously refresh the info.
setInterval(() => {
  getIss();
}, 1000);

//% try using the loop while i=1 then i--