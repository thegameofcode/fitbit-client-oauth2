var helper = require('../helpers');

function addFeatures(proto) {

  proto.getDailyActivitySummary = function(token, options) {
    options = helper.buildDailyActivitySummaryOptions(this, options);
    token = this.createToken(token);

    options.access_token = token.token.access_token;
    return helper.createRequestPromise(options);

  };

  proto.browseActivityTypes = function(token, options) {
    // GET https://api.fitbit.com/1/activities.json
    token = this.createToken(token);

    options = helper.createOptions({
      units: this.units,
      uri: '/1/activities.json'
    }, options, token);

    return helper.createRequestPromise(options);
  };

  proto.getActivityLogsList = function(token, options) {
    // GET https://api.fitbit.com/1/user/-/activities/list.json
    token = this.createToken(token);

    // options:  userId, beforeDate, afterDate, sort, offset, limit

    options = helper.createOptions({
      userId: '-',
      units: this.units,
      uri: '/1/user/-/activities/list.json'
    }, options, token);

    return helper.createRequestPromise(options);

  };

  proto.getActivityType = function(token, options) {
    // GET https://api.fitbit.com/1/activities/[activity-id].json
    token = this.createToken(token);

    options = helper.createOptions({
      units: this.units,
      uri: '/1/activities/{activity-id}.json'.replace('{activity-id}', options.activityId)
    }, options, token);

    return helper.createRequestPromise(options);

  };

  proto.getFrequentActivities = function(token, options) {
    // GET https://api.fitbit.com/1/user/-/activities/frequent.json
    token = this.createToken(token);

    options = helper.createOptions({
      units: this.units,
      uri: '/1/user/-/activities/frequent.json'
    }, options, token);

    return helper.createRequestPromise(options);
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
