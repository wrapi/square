var squareWrapi = require('../index.js');

var access_token = 'MY_ACCESS_TOKEN';
var location_id = 'MY_LOCATION_ID';

var client = new squareWrapi('v1', access_token, location_id);
client.payments.list({
    "begin_time": "2016-04-01T00:00:00Z",
    "end_time": "2016-05-01T00:00:00Z"
  },
  function(err, data) {
    if (!err) {
      console.log(data);
    } 
  }
);
