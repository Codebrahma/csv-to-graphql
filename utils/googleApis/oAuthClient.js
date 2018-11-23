const baseClient = require('./baseClient');

const oAuthClient = async (user) => {
  const token = await user.getToken();

  if (!token) {
    throw new Error('Token not found to initialize oauth client');
  }

  const oAuth2Client = baseClient();
  oAuth2Client.setCredentials({
    access_token: token.accessToken,
    refresh_token: token.refreshToken,
    email: user.email
  });

  oAuth2Client.on('tokens', async (tokens) => {
    token.accessToken = tokens.access_token;
    token.expiryDate = tokens.expiry_date / 1000;

    if (tokens.refresh_token) {
      token.refreshToken = tokens.refresh_token;
    }

    await token.save();
  });

  return oAuth2Client;
}

module.exports = oAuthClient;
