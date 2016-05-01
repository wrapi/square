'use strict';

var util = require('util');
var wrapi = require('wrapi');

var merchantEndpoints = {
  payments: require('./api/payments.json'),
  settlements: require('./api/settlements.json'),
  refunds: require('./api/refunds.json'),
  orders: require('./api/orders.json'),
  bankAccounts: require('./api/bank-accounts.json'),
  items: require('./api/items.json'),
  variations: require('./api/variations.json'),
  inventory: require('./api/inventory.json'),
  modifierLists: require('./api/modifier-lists.json'),
  modifierOptions: require('./api/modifier-options.json'),
  categories: require('./api/categories.json'),
  discounts: require('./api/discounts.json'),
  fees: require('./api/fees.json'),
  pages: require('./api/pages.json'),
  cells: require('./api/cells.json')
};


var otherEndpoints = {
  merchant: require('./api/merchant.json')
};


function squareWrapi(apiVersion, merchant_id, access_token) {
  if (!!access_token) {
      pathPrefix = merchant_id;
  }
  else {
    if (!!merchant_id) {
      access_token = merchant_id;
      merchant_id = apiVersion;
      pathPrefix = merchant_id;
    }
    else {
      access_token = apiVersion;
      merchant_id = null;
    }
    apiVersion = 'v1';
  }

  var pathPrefix = merchant_id || ':merchant_id';

  var opts = {
    auth: {
      "bearer": access_token
    },
    headers: {
      "User-Agent": 'square-wrapi',
      "Accept": 'application/json'
    }
  };

  var all = {};
  for (var name in merchantEndpoints) {
    for (var sub in merchantEndpoints[name]) {
      merchantEndpoints[name][sub].path = pathPrefix + '/' + merchantEndpoints[name][sub].path;
      all[name + '.' + sub] = merchantEndpoints[name][sub];
    }
  }

  for (var name in otherEndpoints) {
    for (var sub in otherEndpoints[name]) {
      all[name + '.' + sub] = otherEndpoints[name][sub];
    }
  }

  squareWrapi.super_.call(this,
            'https://connect.squareup.com/' + apiVersion + '/',
            all,
            opts);
};

util.inherits(squareWrapi, wrapi);
module.exports = squareWrapi;
