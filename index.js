'use strict';

var util = require('util');
var wrapi = require('wrapi');

var otherEndpoints = {
  merchant: require('./api/merchant.json'),
  business: require('./api/business.json')
};

var meEndpoints = {
  employees: require('./api/me/employees.json'),
  roles: require('./api/me/roles.json'),
  timecards: require('./api/me/timecards.json')
};

var locationEndpoints = {
  // Business Management - https://docs.connect.squareup.com/api/connect/v1/#navsection-business
  cashDrawerShifts: require('./api/cash-drawer-shifts.json'),

  // Transaction Management - https://docs.connect.squareup.com/api/connect/v1/#navsection-transactions
  payments: require('./api/payments.json'),
  settlements: require('./api/settlements.json'),
  refunds: require('./api/refunds.json'),
  orders: require('./api/orders.json'),
  bankAccounts: require('./api/bank-accounts.json'),

  // Item Management - https://docs.connect.squareup.com/api/connect/v1/#navsection-itemmanagement
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


function squareWrapi(apiVersion, access_token, location_id) {
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

  for (var name in meEndpoints) {
    for (var sub in meEndpoints[name]) {
      meEndpoints[name][sub].path = 'me/' + meEndpoints[name][sub].path;
      all[name + '.' + sub] = meEndpoints[name][sub];
    }
  }

  var pathPrefix = location_id || ':location_id';
  for (var name in locationEndpoints) {
    for (var sub in locationEndpoints[name]) {
      locationEndpoints[name][sub].path = pathPrefix + '/' + locationEndpoints[name][sub].path;
      all[name + '.' + sub] = locationEndpoints[name][sub];
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
