var helper = require('../helpers');
var activities = require('./activities');

module.exports = function(proto) {

  activities.addFeatures(proto);

  proto.getTimeSeries = function(token, options) {
    options.units = this.units;
    options = helper.buildTimeSeriesOptions(this, options);
    token = this.createToken(token);

    //TODO: improve this way of getting the token
    options.access_token = token.token.access_token;
    return helper.createRequestPromise(options);

  };

  proto.getIntradayTimeSeries = function(token, options) {
    options = helper.buildIntradayTimeSeriesOptions(client, options);
    token = this.createToken(token);

    //TODO: improve this way of getting the token
    options.access_token = token.token.access_token;
    return helper.createRequestPromise(options);
  };

};
