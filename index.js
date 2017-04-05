const got = require('got');
const geolib = require('geolib');
const url = "http://api.open-notify.org/iss-now.json";
const myPosition = { latitude: 30.484429, longitude: -97.788762 };

let delaySeconds = 3000;

function loop(){
  got(url, { json: true})
    .then(iss => {
      const iss_position = iss.body.iss_position;
      const distanceFromISS = geolib.getDistance(myPosition, iss_position);
      const distanceFromISSInMiles = geolib.convertUnit('mi', distanceFromISS, 2);
      console.log(`my distance from ISS ${distanceFromISSInMiles} miles`);
    })
    .catch(error => {
      console.log(error.response.body);
    })
    .then(() => {
      setTimeout(loop, delaySeconds);
    });
}

loop();

