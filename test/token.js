var expect = require('chai').expect;
var accessToken = require('simple-oauth2')({}).accessToken;
var nock = require('nock');
var assign = require('object-assign');


var FitbitClient = require('../src/client');

describe('Token management', function() {

  var client;
  var token = {
    access_token: 'access_token_1234',
    refresh_token: 'refresh_token_5678',
    expires_in: 3600
  };
  var tokenObj = accessToken.create(token);

  beforeEach(function() {
    client = new FitbitClient('clientId_1234', 'consumerSecret_5678', {
      redirect_uri: 'http://redirect_uri'
    });
  });

  describe('Token object', function() {

    it('creates a token object', function() {

      var tokenObj = client.createToken(token);

      expect(tokenObj).to.be.an('object');
      expect(tokenObj).to.respondTo('expired');
      expect(tokenObj.token).to.have.property('access_token');
      expect(tokenObj.token).to.have.property('refresh_token');

    });

    it('accept an existing token object', function() {

      var tokenObj2 = client.createToken(tokenObj);

      expect(tokenObj).to.eql(tokenObj2);

    });

  });

  describe('Token exchange', function() {

    var nockedRequest;

    beforeEach(function() {

      nockedRequest = nock('https://api.fitbit.com')
        .post('/oauth2/token')
        .reply(200, {
          access_token: "new_access_token_1234",
          expires_in: 3600,
          refresh_token: "new_refresh_token_5678",
          token_type: "Bearer"
        });
    });

    it('can exchange an authorization code for a token', function(done) {

      var code = 'authorization_code_1234';
      var redirect_uri = 'http://redirect_uri';

      client.getToken(code, redirect_uri)
        .then(function(token) {
          validateToken(token);
          done();
        })
        .catch(function(err) {
          done(new Error(err));
        })

    });
  });

  describe('Refresh token', function() {

    var nockedRequest;

    beforeEach(function() {

      nockedRequest = nock('https://api.fitbit.com')
        .post('/oauth2/token')
        .reply(200, {
          access_token: "new_access_token_1234",
          expires_in: 3600,
          refresh_token: "new_refresh_token_5678",
          token_type: "Bearer"
        });
    });

    it('it doesn\'t calls Fitbit\'s OAuth when token is valid', function(done) {

      client.refreshAccessToken(token)
        .then(function(data) {
          expect(data.token).to.eql(tokenObj.token);

          var notCalled = expect(nockedRequest.isDone()).to.be.false;

          done();
        })

        .catch(function(err) {
          done(new Error('Error refreshing a valid token'));
        });
    });

    it('it calls Fitbit\'s OAuth when token is expired', function(done) {

      var expiredToken = assign({}, token);
      expiredToken.expires_in = -3600;

      client.refreshAccessToken(expiredToken)
        .then(function(data) {
          validateToken(data);
          done();
        })
        .catch(function(err) {
          console.error(err);
          done(new Error('Error refreshing an expired token'));
        });
    });

    it('it calls Fitbit\'s OAuth when token is valid and refresh is forced', function(done) {

      var expiredToken = assign({}, token);
      expiredToken.expires_in = -3600;

      client.refreshAccessToken(expiredToken, {forceRefresh: true})
        .then(function(data) {
          validateToken(data);
          done();
        })

        .catch(function(err) {
          console.error(err);

          done(new Error('Error refreshing an expired token'));
        });
    });

  });


});

function validateToken(data) {

  expect(data).to.respondTo('expired');
  expect(data.token).to.have.property('access_token');
  expect(data.token).to.have.property('refresh_token');
  expect(data.token).to.have.property('expires_in');
  expect(data.token).to.have.property('expires_at');
  expect(data.token.expires_at).to.be.a('date');
  expect(data.token.access_token).to.equal('new_access_token_1234');
  expect(data.token.refresh_token).to.equal('new_refresh_token_5678');
  expect(data.token.expires_in).to.equal(3600);

}
