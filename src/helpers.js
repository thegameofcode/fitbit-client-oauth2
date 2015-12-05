var assign = require('object-assign');
var request = require('request-promise');
var moment = require('moment');

var config = require('./config');

module.exports = {
  createRequestPromise: createRequestPromise,
  buildTimeSeriesOptions: buildTimeSeriesOptions,
  buildIntradayTimeSeriesOptions: buildIntradayTimeSeriesOptions,
  buildDailyActivitySummaryOptions: buildDailyActivitySummaryOptions
};

function createRequestPromise(options) {
  var acceptLanguage = options.units === 'METRIC' ? 'es_ES' : 'en_US';
  options = assign({
    url: options.url,
    method: 'GET',
    json: true,
    headers: {
      Authorization: 'Bearer ' + options.access_token,
      'Accept-Language': acceptLanguage
    }
  }, options);

  delete options.units;
  return request.get(options).then(function(res) {
    if (options.resourcePath) {
      res.requestedResource = options.resourcePath.replace('/', '-');
    }
    return res;
  });
}

function buildTimeSeriesOptions(options) {
  var url = config.FITBIT_BASE_API_URL_TOKEN + '/1/user/{userId}/{resourcePath}/date/{baseDate}/{period}.json';

  options = assign({
    userId: '-',
    resourcePath: 'activities/steps',
    baseDate: 'today',
    period: '1d',
    units: 'IMPERIAL'
  }, options);

  if (options.endDate) {
    delete options.period;
  }

  options.url = url.replace('{userId}', options.userId)
    .replace('{resourcePath}', options.resourcePath)
    .replace('{baseDate}', options.baseDate)
    .replace('{period}', options.endDate ? options.endDate : options.period);

  return options;
}

function buildIntradayTimeSeriesOptions(options) {
  var url = config.FITBIT_BASE_API_URL_TOKEN + '/1/user/{userId}/{resourcePath}/date/{startDate}/{endDate}/{detailLevel}{extra}.json';

  var extra = '/time/{startTime}/{endTime}';

  options = assign({
    userId: '-',
    resourcePath: 'activities/steps',
    startDate: 'today',
    endDate: 'today',
    detailLevel: '1min',
    units: 'IMPERIAL'
  }, options);

  if (options.startTime && options.endTime) {
    url = url.replace('{extra}', extra);
  }

  options.url = url.replace('{userId}', options.userId)
    .replace('{resourcePath}', options.resourcePath)
    .replace('{startDate}', options.startDate)
    .replace('{endDate}', options.endDate)
    .replace('{detailLevel}', options.detailLevel)
    .replace('{extra}', '')
    .replace('{startTime}', options.startTime)
    .replace('{endTime}', options.endTime);

  return options;
}

function buildDailyActivitySummaryOptions(options) {
  var uri = config.FITBIT_BASE_API_URL_TOKEN + '/1/user/{userId}/activities/date/{date}.json';

  options = assign({
    userId: '-',
    date: moment().format('YYYY-MM-DD'),
    units: 'IMPERIAL'
  }, options);

  options.uri = uri.replace('{userId}', options.userId).replace('{date}', options.date);

  return options;
}
