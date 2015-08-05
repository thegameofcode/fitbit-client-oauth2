var oauth2 = require('simple-oauth2');
var Promise = require('promise');

var helper = require('./helpers');
var config = require('./config');

var proto;

var FitbitClient = function(clientId, consumerSecret) {

  // Set the client credentials and the OAuth2 server
  this.oauth2 = oauth2({
    clientID: clientId,
    clientSecret: consumerSecret,
    site: config.FITBIT_BASE_API_URL,
    authorizationPath: config.FITBIT_AUTH_PATH,
    tokenPath: config.FITBIT_TOKEN_PATH,
    useBasicAuthorizationHeader: true
  });

};

proto = FitbitClient.prototype;

proto.setTokens = function(accessToken, refreshToken, expiresIn) {
  this.token = this.oauth2.accessToken.create({
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn
  });
};

proto.refreshAccessToken = function(options) {
  var _this = this;
  options = options || {};

  if( !this.token.expired() && !options.forceRefresh) {
    return Promise.resolve(this.token);
  }

  return new Promise(function(resolve, reject) {

    _this.token.refresh(function(err, token) {

      if (err) {
        return reject(err);
      }

      _this.token = token;
      return resolve(token);
    });

  });
};


proto.getDailyActivitySummary = function(options) {
  options = helper.buildDailyActivitySummaryOptions(options);

  //TODO: improve this way of getting the token
  options.access_token = this.token.token.access_token;
  return helper.createRequestPromise(options);

};
proto.getTimeSeries = function(options) {
  options = helper.buildTimeSeriesOptions(options);

  //TODO: improve this way of getting the token
  options.access_token = this.token.token.access_token;
  return helper.createRequestPromise(options);

};

proto.getIntradayTimeSeries = function(options) {
  options = helper.buildIntradayTimeSeriesOptions(options);

  options.access_token = this.token.token.access_token;
  return helper.createRequestPromise(options);
};

module.exports = FitbitClient;
