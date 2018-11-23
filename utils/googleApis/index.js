const oAuthClient = require('./oAuthClient');
const googlePlusProfile = require('./googlePlusProfile');
const clientAndTokensFromOAuthCode = require('./clientAndTokensFromOAuthCode');

class GoogleApis {
  static getOAuthClient(user) {
    return oAuthClient(user);
  }

  static getGooglePlusProfile(oAuthClient) {
    return googlePlusProfile(oAuthClient);
  }

  static getClientAndTokensFromOAuthCode(oAuthCode) {
    return clientAndTokensFromOAuthCode(oAuthCode);
  }
}

module.exports = GoogleApis;
