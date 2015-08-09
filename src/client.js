var oauth2 = require('simple-oauth2');
var Promise = require('promise');

var helper = require('./helpers');
var config = require('./config');

var proto;

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

  this.redirect_uri = options.redirect_uri;
  this.scope = options.scope || config.FITBIT_DEFAULT_SCOPE;

};

proto = FitbitClient.prototype;

proto.createToken = function(tokenObj) {

  if (tokenObj && tokenObj.create) {
    return tokenObj;
  }

  return this.oauth2.accessToken.create(tokenObj);
};

proto.getAuthorizationUrl = function(redirect_uri, scope, state) {

  var options = {
    redirect_uri: redirect_uri || this.redirect_uri,
    scope: scope || this.scope
  };

  if (state) {
    options.state = state;
  }

  return this.oauth2.authCode.authorizeURL(options);
};

proto.getToken = function(code, redirect_uri) {

  var authCode = this.oauth2.authCode;
  return new Promise(function(resolve, reject) {

    authCode.getToken({
      code: code,
      redirect_uri: redirect_uri
    }, function(err, token) {
      return err ? reject(err) : resolve(token);
    });

  });
};

proto.refreshAccessToken = function(token, options) {
  options = options || {};
  token = this.createToken(token);

  if( !token.expired() && !options.forceRefresh) {
    return Promise.resolve(token);
  }

  return new Promise(function(resolve, reject) {

    token.refresh(function(err, token) {
      return err ? reject(err) : resolve(token);
    });

  });
};

proto.getDailyActivitySummary = function(token, options) {
  options = helper.buildDailyActivitySummaryOptions(options);
  token = this.createToken(token);

  //TODO: improve this way of getting the token
  options.access_token = token.access_token;
  return helper.createRequestPromise(options);

};
proto.getTimeSeries = function(token, options) {
  options = helper.buildTimeSeriesOptions(options);
  token = this.createToken(token);

  //TODO: improve this way of getting the token
  options.access_token = token.access_token;
  return helper.createRequestPromise(options);

};

proto.getIntradayTimeSeries = function(token, options) {
  options = helper.buildIntradayTimeSeriesOptions(options);
  token = this.createToken(token);

  options.access_token = token.access_token;
  return helper.createRequestPromise(options);
};

module.exports = FitbitClient;
