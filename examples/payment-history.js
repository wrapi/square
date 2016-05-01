var squareWrapi = require('../index.js');

var access_token = 'REPLACE_ME';
var merchant_id = 'me';

var client = new squareWrapi('v1', merchant_id, access_token);
client.payments.list({
    "begin_time": "2015-12-01T00:00:00Z",
    "end_time": "2015-12-31T00:00:00Z"
  },
  function(err, data) {
    if (!err) {
      console.log(data);
    } 
  }
);
