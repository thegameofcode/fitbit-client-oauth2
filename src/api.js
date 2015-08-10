var helper = require('./helpers');

module.exports = function(proto) {

  proto.getDailyActivitySummary = function(token, options) {
    options = helper.buildDailyActivitySummaryOptions(options);
    token = this.createToken(token);

    //TODO: improve this way of getting the token
    options.access_token = token.token.access_token;
    return helper.createRequestPromise(options);

  };

  proto.getTimeSeries = function(token, options) {
    options = helper.buildTimeSeriesOptions(options);
    token = this.createToken(token);

    //TODO: improve this way of getting the token
    options.access_token = token.token.access_token;
    return helper.createRequestPromise(options);

  };

  proto.getIntradayTimeSeries = function(token, options) {
    options = helper.buildIntradayTimeSeriesOptions(options);
    token = this.createToken(token);

    //TODO: improve this way of getting the token
    options.access_token = token.token.access_token;
    return helper.createRequestPromise(options);
  };

};
