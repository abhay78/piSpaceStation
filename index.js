const got = require('got');
const url = "http://api.open-notify.org/iss-now.json";
let delaySeconds = 3000;

function loop(){
  got(url, { json: true})
    .then(iss => {
      console.log(iss.body.iss_position);
    })
    .catch(error => {
      console.log(error.response.body);
    })
    .then(() => {
      setTimeout(loop, delaySeconds);
    });
}

loop();

