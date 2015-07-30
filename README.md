# Fitbit client

An OAuth 2.0 client to consume [Fitbit's API](http://www.fitbit.com/). 

## Usage

### Using an existing user token

```
var FitbitClient = require('fitbit-client-oauth2');

var client = new FitbitClient(<YOUR_FITBIT_API_KEY>, <YOUR_FITBIT_API_SECRET> );

// retrieve previously saved user's token from db
client.setTokens(access_token, refresh_token, expires_in);

client.getTimeSeries().then(function(res) {

    console.log('results: ', res);

}).catch(function(err) {
    console.log('error getting user data', err);
});

```

### Refreshing an expired user token

```
    client.refreshAccessToken().then(function(token) {
    
        // save new token data to db
        // do more stuff here.
    
    }).catch(function(err) {
      console.log('error refreshing user token', err);
    });

```

## TODO

 * Implement full OAuth authorization code flow. (now it relays on [passport-fitbit-oauth2](https://github.com/IGZgustavomarin/passport-fitbit-oauth2)).
 * Cover more of the Fitbit API endpoints
 * Add token expiration event to the client (EventEmitter).
 * Implement automatic retries on token expiration errors

