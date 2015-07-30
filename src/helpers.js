var assign = require('object-assign');
var request = require('request-promise');

var config = require('./config');

module.exports = {
  createRequestPromise: createRequestPromise,
  buildTimeSeriesOptions: buildTimeSeriesOptions,
  buildIntradayTimeSeriesOptions: buildIntradayTimeSeriesOptions
};

function createRequestPromise(options) {
  return request.get({
    url: options.url,
    method: 'GET',
    json: true,
    headers: {
      Authorization: 'Bearer ' + options.access_token
    }
  }).then(function(res) {
    res.requestedResource = options.resourcePath.replace('/', '-');
    return res;
  });
}

function buildTimeSeriesOptions(options) {
  var url = config.FITBIT_BASE_API_URL + '/1/user/{userId}/{resourcePath}/date/{baseDate}/{period}.json';

  options = assign({
    userId: '-',
    resourcePath: 'activities/steps',
    baseDate: 'today',
    period: '1d'
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
  var url = config.FITBIT_BASE_API_URL + '/1/user/{userId}/{resourcePath}/date/{startDate}/{endDate}/{detailLevel}{extra}.json';

  var extra = '/time/{startTime}/{endTime}';

  options = assign({
    userId: '-',
    resourcePath: 'activities/steps',
    startDate: 'today',
    endDate: 'today',
    detailLevel: '1min'
  }, options);

  if (options.startTime && options.endTime) {
    url.replace('{extra}', extra);
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
