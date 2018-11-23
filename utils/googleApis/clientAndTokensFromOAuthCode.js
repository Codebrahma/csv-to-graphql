const baseClient = require('./baseClient');
const logger = require('./logger');

const clientAndTokensFromOAuthCode = async (code) => {
  const oAuth2Client = baseClient();
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    logger.info(`Successfully fetched tokens for oAuth code(${code})`);
    return { tokens, oAuth2Client };
  } catch(err) {
    logger.error(`Error while fetching tokens for oAuth code(${code}): ${err.message}`);
    throw err;
  }
}

module.exports = clientAndTokensFromOAuthCode;
