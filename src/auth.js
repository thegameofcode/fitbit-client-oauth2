var Promise = require('promise');

module.exports = function(proto) {

  proto.createToken = function(tokenObj) {

    if (tokenObj && tokenObj.create) {
      return tokenObj;
    }

    return this.oauth2_token.accessToken.create(tokenObj);
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

    var authCode = this.oauth2_token.authCode;
    var _this = this;
    return new Promise(function(resolve, reject) {

      authCode.getToken({
        code: code,
        redirect_uri: redirect_uri
      }, function(err, token) {
        return err ? reject(err) : resolve(_this.createToken(token));
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

};
