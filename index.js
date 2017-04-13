const got = require('got');
const geolib = require('geolib');
const lib = require('lib');
const url = "http://api.open-notify.org/iss-now.json";
const myPosition = { latitude: 30.484429, longitude: -97.788762 };

let delaySeconds = 3000;

function loop(){
  got(url, { json: true})
    .then(iss => {
      const iss_position = iss.body.iss_position;
      console.log("ISS position: " + JSON.stringify(iss_position));
      const distanceFromISS = geolib.getDistance(myPosition, iss_position);
      const distanceFromISSInMiles = geolib.convertUnit('mi', distanceFromISS, 2);
      console.log(`my distance from ISS ${distanceFromISSInMiles} miles`);

      var coord = {}
      coord.lat = Number(iss_position.latitude);
      coord.long = Number(iss_position.longitude);
      console.log(coord);
      lib.arajan.gps(coord, (err, result)=>{
        if (err){
          console.log(err);
          return;
        }
        console.log(result);
      });
    })
    .catch(error => {
      console.log(error.response.body);
    })
    .then(() => {
      setTimeout(loop, delaySeconds);
    });
}

loop();

