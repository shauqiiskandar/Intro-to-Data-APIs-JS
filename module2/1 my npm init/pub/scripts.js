//% to check if geolocating functionality is available
if ('geolocation' in navigator) {
  console.log('geolocation is available');

  //% to get the current position object using the geolocator. (position) will be an object that has multiple pieces of information that we can tell about the coordinate
  navigator.geolocation.getCurrentPosition((position) => {
    //%to get all the coordinates lat,long,everything
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    console.log(position);
    console.log(position.timestamp);

    //%put the coords into a constant
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    //*end of tut 2.3 addition
    const time = position.timestamp;

    //% get the dom elements
    const la = document.getElementById('lat');
    const lo = document.getElementById('long');

    //%assign the coords to the elements
    la.textContent = lat;
    lo.textContent = long;

    //%the above 2 blocks can also be condensed
    //?document.getElementById('lat').textContent = lat;
    //?document.getElementById('long').textContent = long;

    //% we create an object with the data that we want to send to the server
    const data = {
      lat,
      long,
      time
    };

    //%set the fetch config file
    const config = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    //!STEP5C getting a response from the server
    //% using fetch post request and use then for response
    fetch('/api', config)
      .then((resp) => resp.json())
      .then((opt) => console.log(opt));

    //% using await to get a response
    // const resp = await fetch('/api', config);
    // const coord = await resp.json();
    // console.log(coord);

  });
} else {
  console.log('geolocation is not available');
}