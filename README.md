# Fitbit client

[![npm version](https://badge.fury.io/js/fitbit-client-oauth2.svg)](http://badge.fury.io/js/fitbit-client-oauth2)
[![Circle CI](https://circleci.com/gh/thegameofcode/fitbit-client-oauth2.svg?style=svg)](https://circleci.com/gh/thegameofcode/fitbit-client-oauth2)

An OAuth 2.0 client to consume [Fitbit's API](http://www.fitbit.com/). 

**WARNING**: Every release should be usable and stable, but it is a Work in Progress until all Fitbit's API is covered. 

[![NPM](https://nodei.co/npm/fitbit-client-oauth2.png?downloads=true)](https://nodei.co/npm/fitbit-client-oauth2/)


## Usage

### Token object

Every method of the API needs a valid token object with these properties:

 * `access_token`: a valid user's access token.
 * `refresh_token`: the user's refresh token. Optional for every call except `refreshAccessToken()`
 * `expires_in`: expiration time in seconds. Optional.

### Using an existing user token

```
    var FitbitClient = require('fitbit-client-oauth2');
    
    var client = new FitbitClient(<YOUR_FITBIT_API_KEY>, <YOUR_FITBIT_API_SECRET> );
    
    // retrieve previously saved user's token from db or somewhere
    var tokens = existingUser.fitbitTokens;
    
    var options = { /* TIME_SERIES_OPTIONS */ };
    
    client.getTimeSeries(tokens, options)
        .then(function(res) {
            console.log('results: ', res);
        }).catch(function(err) {
            console.log('error getting user data', err);
        });

```

### Refreshing an expired user token

```
    client.refreshAccessToken(tokens)
        .then(function(new_token) {
            // save new_token data to db
            // then do more stuff here.
        
        }).catch(function(err) {
          console.log('error refreshing user token', err);
        });

```

### Get an access token

 If you need to start an OAuth flow to get user's permission and access_token, you need to redirect to Fitbit's OAuth endpoint.

 **NOTE**: You can also use [passport-fitbit-oauth2](https://github.com/thegameofcode/passport-fitbit-oauth2) instead of doing this manually.
 
``` 
    var client = new FitbitClient(<YOUR_FITBIT_API_KEY>, <YOUR_FITBIT_API_SECRET>);
    var redirect_uri = 'http://redirect_uri_used_in_fitbit_app_website';
    var scope =  [ 'activity', 'nutrition', 'profile', 'settings', 'sleep', 'social', 'weight' ];
    
    server.get('/auth/fitbit', function(req, res, next) {
    
        var authorization_uri = client.getAuthorizationUrl(redirect_uri, scope);
        
        res.redirect(authorization_uri);
    });
    
    // If /auth/fitbit/callbac is your redirec_uri
    
    server.get('/auth/fitbit/callback', function(req, res, next) {
    
        var code = req.query.code;
        
        client.getToken(code, redirect_uri)
            .then(function(token) {

                // ... save your token on db or session... 
                
                // then redirect
                res.redirect(302, '/user');

            })
            .catch(function(err) {
                // something went wrong.
                res.send(500, err);
            
            });
    
    });
    
```


## TODO

 * Implement full OAuth authorization code flow. (use it on Connect servers with [passport-fitbit-oauth2](https://github.com/thegameofcode/passport-fitbit-oauth2)).
 * Cover more of the Fitbit API endpoints
 * Add token expiration event to the client (EventEmitter).
 * Implement automatic retries on token expiration errors

## Other implementations

This package exists because Fitbit's newest endpoints works only with OAuth 2.0 and all other existing packages works only with OAuth 1.0. Some examples:

- [fitbit-node](https://github.com/lukasolson/fitbit-node)
- [fitbit-js](https://github.com/smurthas/fitbit-js)
- [node-fitbit](https://github.com/p-m-p/node-fitbit)

