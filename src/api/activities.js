var config = require('../config');
var helper = require('../helpers');

function addFeatures(proto) {

  proto.getDailyActivitySummary = function(token, options) {
    options = helper.buildDailyActivitySummaryOptions(options);
    token = this.createToken(token);

    options.access_token = token.token.access_token;
    return helper.createRequestPromise(options);

  };

  proto.browseActivityTypes = function(token, options) {
    // GET https://api.fitbit.com/1/activities.json
    token = this.createToken(token);

    options = options || {};
    options.units = options.unit || 'IMPERIAL';
    options.uri = config.FITBIT_BASE_API_URL + '/1/activities.json';
    options.access_token = token.token.access_token;

    return helper.createRequestPromise(options);
  };

  proto.getActivityLogsList = function(token, options) {
    // GET https://api.fitbit.com/1/user/-/activities/list.json
    token = this.createToken(token);

    // options:  userId, beforeDate, afterDate, sort, offset, limit

    options = options || {};
    options.units = options.unit || 'IMPERIAL';
    options.uri = config.FITBIT_BASE_API_URL + '/1/user/-/activities/list.json';
    options.access_token = token.token.access_token;

    return helper.createRequestPromise(options);

  };

  proto.getActivityType = function(token, options) {
    // GET https://api.fitbit.com/1/activities/[activity-id].json
    token = this.createToken(token);

    options = options || {};
    options.units = options.unit || 'IMPERIAL';
    options.uri = config.FITBIT_BASE_API_URL + '/1/activities/{activity-id}.json'.replace('{activity-id}', options.activityId);
    options.access_token = token.token.access_token;

    return helper.createRequestPromise(options);

  };

  proto.getFrequentActivities = function(token, options) {

  };

  proto.getRecentActivities = function(token, options) {

  };

  proto.getFavoriteActivities = function(token, options) {

  };

  proto.getActivityGoals = function(token, options) {

  };

  proto.getLifetimeStats = function(token, options) {

  };

}

module.exports = {
  addFeatures: addFeatures
};
