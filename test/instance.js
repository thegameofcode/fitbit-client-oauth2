var expect = require('chai').expect;

var FitbitClient = require('../src/client');
var config = require('../src/config');

describe('FitbitClient class', function () {

  it('should create a default instance', function () {
    var client = new FitbitClient('clientId', 'consumerSecret');

    expect(client).to.have.property('oauth2');
    expect(client.redirect_uri).to.eql(undefined);
    expect(client.scope).to.eql(config.FITBIT_DEFAULT_SCOPE);
  });

  it('should accept a redirect_uri parameter', function() {
    var client = new FitbitClient('clientId', 'consumerSecret', { redirect_uri: 'http://redirect_uri' });

    expect(client.redirect_uri).to.eql('http://redirect_uri');
  });

  it('should throw without clientId', function() {

    function createEmptyClient() {
      return new FitbitClient();
    }
    expect(createEmptyClient).to.throw(Error, /Missing clientId parameter/);
  });

  it('should throw without consumerSecret', function() {

    function createEmptyClient() {
      return new FitbitClient('clientId');
    }
    expect(createEmptyClient).to.throw(Error, /Missing consumerSecret parameter/);
  });

});
