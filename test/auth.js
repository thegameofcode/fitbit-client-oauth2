var expect = require('chai').expect;

var FitbitClient = require('../src/client');
var config = require('../src/config');

describe('FitbitClient Authorization flow', function() {

  var client;

  beforeEach(function() {
    client = new FitbitClient('clientId_1234', 'consumerSecret_5678', {
      redirect_uri: 'http://redirect_uri'
    });
  });

  it('it has a default authorization url', function() {
    var authorization_uri = client.getAuthorizationUrl();
    var final_url = 'https://api.fitbit.com/oauth2/authorize?redirect_uri=http%3A%2F%2Fredirect_uri&scope=activity&scope=nutrition&scope=profile&scope=settings&scope=sleep&scope=social&scope=weight&response_type=code&client_id=clientId_1234';

    expect(authorization_uri).to.eql(final_url);
  });

  it('accept a different redirect_uri for authorization', function() {
    var redirect_uri = 'http://different_redirect_uri';
    var authorization_uri = client.getAuthorizationUrl(redirect_uri);
    var final_url = 'https://api.fitbit.com/oauth2/authorize?redirect_uri=http%3A%2F%2Fdifferent_redirect_uri&scope=activity&scope=nutrition&scope=profile&scope=settings&scope=sleep&scope=social&scope=weight&response_type=code&client_id=clientId_1234';

    expect(authorization_uri).to.eql(final_url);
  });

  it('accept a different scope for authorization', function() {
    var redirect_uri = 'http://different_redirect_uri';
    var scope = config.FITBIT_DEFAULT_SCOPE;
    scope.push('heartrate');
    var authorization_uri = client.getAuthorizationUrl(redirect_uri, scope);
    var final_url = 'https://api.fitbit.com/oauth2/authorize?redirect_uri=http%3A%2F%2Fdifferent_redirect_uri&scope=activity&scope=nutrition&scope=profile&scope=settings&scope=sleep&scope=social&scope=weight&scope=heartrate&response_type=code&client_id=clientId_1234';

    expect(authorization_uri).to.eql(final_url);
  });

  it('accept state for authorization', function() {
    var redirect_uri = 'http://different_redirect_uri';
    var scope = config.FITBIT_DEFAULT_SCOPE;
    scope.push('heartrate');
    var state = 'KEEP_THIS_STATE';
    var authorization_uri = client.getAuthorizationUrl(redirect_uri, scope, state);
    var final_url = 'https://api.fitbit.com/oauth2/authorize?redirect_uri=http%3A%2F%2Fdifferent_redirect_uri&scope=activity&scope=nutrition&scope=profile&scope=settings&scope=sleep&scope=social&scope=weight&scope=heartrate&scope=heartrate&state=KEEP_THIS_STATE&response_type=code&client_id=clientId_1234';

    expect(authorization_uri).to.eql(final_url);
  });

});
