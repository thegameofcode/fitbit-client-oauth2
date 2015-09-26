var oauth2 = require('simple-oauth2');

var config = require('./config');
var addAuth = require('./auth');
var addAPI = require('./api');

var FitbitClient = function(clientId, consumerSecret, options) {

  options = options || {};

  if (!clientId) {
    throw new Error('Missing clientId parameter');
  }

  if (!consumerSecret) {
    throw new Error('Missing consumerSecret parameter');
  }

  // Set the client credentials and the OAuth2 server
  this.oauth2 = oauth2({
    clientID: clientId,
    clientSecret: consumerSecret,
    site: config.FITBIT_BASE_API_URL,
    authorizationPath: config.FITBIT_AUTH_PATH,
    tokenPath: config.FITBIT_TOKEN_PATH,
    useBasicAuthorizationHeader: true
  });

  this.oauth2_token = oauth2({
    clientID: clientId,
    clientSecret: consumerSecret,
    site: config.FITBIT_BASE_API_URL_TOKEN,
    authorizationPath: config.FITBIT_AUTH_PATH,
    tokenPath: config.FITBIT_TOKEN_PATH,
    useBasicAuthorizationHeader: true
  });

  this.redirect_uri = options.redirect_uri;
  this.scope = options.scope || config.FITBIT_DEFAULT_SCOPE;

};

addAuth(FitbitClient.prototype);
addAPI(FitbitClient.prototype);

module.exports = FitbitClient;
