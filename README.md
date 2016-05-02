# Square Connect API Wrapper ▣

Client interface for accessing [Square Connect API](https://docs.connect.squareup.com/).

### Update
> *This is a breaking change.*

> Applications created after February 16, 2016 will not be able to use the `merchant` methods.
> Instead, use `business` methods. For older apps use version `0.1.0`.
> More info.: https://docs.connect.squareup.com/articles/connect-api-changes-2016-02/

## Usage
Create a client object to connect to Square Connect API endpoints.

```JS
var squareWrapi = require('square-wrapi');

var client = new squareWrapi('v1', API_ACCESS_TOKEN);

```

A note about [`LOCATION_ID`](https://docs.connect.squareup.com/api/connect/v1/#endpointpaths):
> Most endpoint paths include a `location_id` parameter that indicates which of a business's locations your application is acting on behalf of. You can get a business's location IDs with the `business.locations()` endpoint method.

There are two ways to use the API (use #1 or #2 - not both):

1. For a specific location.
  >  If you have the location id, create the client object with the location id.

  > `var client = new squareWrapi('v1', API_ACCESS_TOKEN, LOCATION_ID);`
  
  > square-wrapi will use this location id. on calls that require location id and you do not have to provide it on each call.

2. For all locations.
  > Create the client object without location id.

  > `var client = new squareWrapi('v1', API_ACCESS_TOKEN);`
  
  > Provide `location_id` as the first parameter to all the calls that require location id.


Once you have the client object, you are ready to make API calls to Square.

Provide parameters and a callback. 

API calls follow this syntax:

`client.apigroup.action(param1, ..., queryString, callback);`

* `param` - (*if required*) url parameters - eg: For [payments.retrieve](#payments.retrieve) the value for `:payment_id`. Provide `location_id` if you created the client without `LOCATION_ID`.
* `queryString` - (*as required*) API endpoint parameters as key-value pairs.

### Examples

#### List Payments
```JS
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

// Or with location_id
client.payments.list('JGHJ0343', {
    "begin_time": "2015-12-01T00:00:00Z",
    "end_time": "2015-12-31T00:00:00Z"
  },
  function(err, data) {
    if (!err) {
      console.log(data);
    } 
  }
);
```

#### Fetch Single Payment
```JS
client.payments.retrieve('Jq74mCczmFXk1tC10GB', function(err, data) {
  if (!err) {
    console.log(data);
  } 
});
```

#### Create a Refund
```JS
client.refunds.create({
    "payment_id": "Jq74mCczmFXk1tC10GB",
    "type": "PARTIAL",
    "reason": "Returned Goods",
    "refunded_money": {
      "amount": -500,
      "currency_code": "USD"
    },
    "request_idempotence_key": "1"
  }, 
  function(err, data) {
    if (!err) {
      console.log(data);
    } 
  }
);
```

#### Update an item
```JS
client.items.update("442d1344-6d2b-4238-83d0-0284dfd335d8", {
    "name": "Milkshake",
    "description": "It's better than yours",
    "visibility": "PRIVATE"
  },
  function(err, data) {
    if (!err) {
      console.log(data);
    } 
  }
);
```

#### Upload Item Image
```JS
client.items.uploadImage(
  {
    formData: {
      custom_file: {
        value:  fs.createReadStream('/path/to/MyImage.png.png'),
        options: {
          filename: 'MyImage.png',
          contentType: 'image/png'
        }
      }
    }
  }, 
  function(err, data) {
    if (!err) {
      console.log(data);
    } 
  }
);
```

#### Deletes an existing fee (tax).
```JS
client.fees.del(FEE_ID, function(err, data) {
  if (!err) {
    console.log(data);
  } 
});

// or with location_id
client.fees.del(LOCATION_ID, FEE_ID, function(err, data) {
  if (!err) {
    console.log(data);
  } 
});```


#### Removes a fee assocation from an item.
```JS
client.fees.remove(ITEM_ID, FEE_ID, function(err, data) {
  if (!err) {
    console.log(data);
  } 
});

// or with location_id
client.fees.remove(LOCATION_ID, ITEM_ID, FEE_ID, function(err, data) {
  if (!err) {
    console.log(data);
  } 
});

```

## API Functions

### Business Management

#### Business & Locations
* [business.me](https://docs.connect.squareup.com/api/connect/v1/#get-merchantid)
* [business.locations](https://docs.connect.squareup.com/api/connect/v1/#get-locations)

#### Employees
* [employees.create](https://docs.connect.squareup.com/api/connect/v1/#post-employees)
* [employees.list](https://docs.connect.squareup.com/api/connect/v1/#get-employees)
* [employees.retrieve](https://docs.connect.squareup.com/api/connect/v1/#get-employeeid)
* [employees.update](https://docs.connect.squareup.com/api/connect/v1/#put-employeeid)

#### Roles
* [roles.create](https://docs.connect.squareup.com/api/connect/v1/#post-roles)
* [roles.list](https://docs.connect.squareup.com/api/connect/v1/#get-roles)
* [roles.retrieve](https://docs.connect.squareup.com/api/connect/v1/#get-roleid)
* [roles.update](https://docs.connect.squareup.com/api/connect/v1/#put-roleid)

### Timecards
* [timecards.create](https://docs.connect.squareup.com/api/connect/v1/#post-timecards)
* [timecards.list](https://docs.connect.squareup.com/api/connect/v1/#get-timecards)
* [timecards.retrieve](https://docs.connect.squareup.com/api/connect/v1/#get-timecardid)
* [timecards.update](https://docs.connect.squareup.com/api/connect/v1/#put-timecardid)
* [timecards.del](https://docs.connect.squareup.com/api/connect/v1/#delete-timecardid)
* [timecards.uploadImage](https://docs.connect.squareup.com/api/connect/v1/#get-events)

#### Cash Drawer Shifts
* [cashDrawerShifts.list](https://docs.connect.squareup.com/api/connect/v1/#get-cashdrawershifts)
* [cashDrawerShifts.retrieve](https://docs.connect.squareup.com/api/connect/v1/#get-cashdrawershiftid)


### Transaction Management

#### Payments
* [payments.list](https://docs.connect.squareup.com/api/connect/v1/#get-payments)
* [payments.retrieve](https://docs.connect.squareup.com/api/connect/v1/#get-paymentid)

#### Settlements
* [settlements.list](https://docs.connect.squareup.com/api/connect/v1/#get-settlements)
* [settlements.retrieve](https://docs.connect.squareup.com/api/connect/v1/#get-settlementid)

#### Refunds
* [refunds.create](https://docs.connect.squareup.com/api/connect/v1/#post-refunds)
* [refunds.list](https://docs.connect.squareup.com/api/connect/v1/#get-refunds)

#### Orders
* [orders.list](https://docs.connect.squareup.com/api/connect/v1/#get-orders)
* [orders.retrieve](https://docs.connect.squareup.com/api/connect/v1/#get-orderid)
* [orders.update](https://docs.connect.squareup.com/api/connect/v1/#put-orderid)

#### Merchant (Deprecated)
* [merchant.me](https://docs.connect.squareup.com/api/connect/v1/#get-merchantid)
* [merchant.retrieve](https://docs.connect.squareup.com/api/connect/v1/#get-merchantid)

#### Bank Accounts
* [bankAccounts.list](https://docs.connect.squareup.com/api/connect/v1/#get-bankaccounts)
* [bankAccounts.retrieve](https://docs.connect.squareup.com/api/connect/v1/#get-bankaccountid)

### Item Management

### Items
* [items.create](https://docs.connect.squareup.com/api/connect/v1/#post-items)
* [items.list](https://docs.connect.squareup.com/api/connect/v1/#get-items)
* [items.retrieve](https://docs.connect.squareup.com/api/connect/v1/#get-itemid)
* [items.update](https://docs.connect.squareup.com/api/connect/v1/#put-itemid)
* [items.del](https://docs.connect.squareup.com/api/connect/v1/#delete-itemid)
* [items.uploadImage](https://docs.connect.squareup.com/api/connect/v1/#post-image)

### Variations
* [variations.create](https://docs.connect.squareup.com/api/connect/v1/#post-variations)
* [variations.update](https://docs.connect.squareup.com/api/connect/v1/#put-variationid)
* [variations.del](https://docs.connect.squareup.com/api/connect/v1/#delete-variationid)

### Inventory
* [inventory.list](https://docs.connect.squareup.com/api/connect/v1/#get-inventory)
* [inventory.adjust](https://docs.connect.squareup.com/api/connect/v1/#post-inventory-variationid)

### Modifier Lists
* [modifierLists.create](https://docs.connect.squareup.com/api/connect/v1/#post-modifierlists)
* [modifierLists.list](https://docs.connect.squareup.com/api/connect/v1/#get-modifierlists)
* [modifierLists.retrieve](https://docs.connect.squareup.com/api/connect/v1/#get-modifierlistid)
* [modifierLists.update](https://docs.connect.squareup.com/api/connect/v1/#put-modifierlistid)
* [modifierLists.del](https://docs.connect.squareup.com/api/connect/v1/#delete-modifierlistid)
* [modifierLists.apply](https://docs.connect.squareup.com/api/connect/v1/#put-itemid-modifierlistid)
* [modifierLists.remove](https://docs.connect.squareup.com/api/connect/v1/#delete-itemid-modifierlistid)

### Modifier Options
* [modifierOptions.create](https://docs.connect.squareup.com/api/connect/v1/#post-modifieroptions)
* [modifierOptions.update](https://docs.connect.squareup.com/api/connect/v1/#put-modifieroptionid)
* [modifierOptions.del](https://docs.connect.squareup.com/api/connect/v1/#delete-modifieroptionid)

### Categories
* [categories.create](https://docs.connect.squareup.com/api/connect/v1/#post-categories)
* [categories.list](https://docs.connect.squareup.com/api/connect/v1/#get-categories)
* [categories.update](https://docs.connect.squareup.com/api/connect/v1/#put-categoryid)
* [categories.del](https://docs.connect.squareup.com/api/connect/v1/#delete-categoryid)

### Discounts
* [discounts.create](https://docs.connect.squareup.com/api/connect/v1/#post-discounts)
* [discounts.list](https://docs.connect.squareup.com/api/connect/v1/#get-discounts)
* [discounts.update](https://docs.connect.squareup.com/api/connect/v1/#put-discountid)
* [discounts.del](https://docs.connect.squareup.com/api/connect/v1/#delete-discountid)

### Fees
* [fees.create](https://docs.connect.squareup.com/api/connect/v1/#post-fees)
* [fees.list](https://docs.connect.squareup.com/api/connect/v1/#get-fees)
* [fees.update](https://docs.connect.squareup.com/api/connect/v1/#put-feeid)
* [fees.del](https://docs.connect.squareup.com/api/connect/v1/#delete-feeid)
* [fees.apply](https://docs.connect.squareup.com/api/connect/v1/#put-itemid-feeid)
* [fees.remove](https://docs.connect.squareup.com/api/connect/v1/#delete-itemid-feeid)

### Pages
* [pages.create](https://docs.connect.squareup.com/api/connect/v1/#post-pages)
* [pages.list](https://docs.connect.squareup.com/api/connect/v1/#get-pages)
* [pages.update](https://docs.connect.squareup.com/api/connect/v1/#put-pageid)
* [pages.del](https://docs.connect.squareup.com/api/connect/v1/#delete-pageid)

### Cells
* [cells.update](https://docs.connect.squareup.com/api/connect/v1/#put-cells)
* [cells.del](https://docs.connect.squareup.com/api/connect/v1/#delete-cells)

## License

  [MIT](LICENSE)


