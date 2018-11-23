const { google } = require('googleapis');
const util = require('util');
const logger = require('./logger');

const googlePlusProfile = async (auth) => {
  const plus = google.plus({ version: 'v1',auth });
  const params = {
    userId: 'me' ,
    fields: 'emails,image,name,nickname, organizations',
  };

  logger.info(`Fetching GOOGLE PLUS profile`);
  try {
    const result = await util.promisify(plus.people.get)(params);
    logger.info(`Successfully fetched GOOGLE PLUS profile: ${result.data.emails[0].value}`);
    return result.data;
  }
  catch (err) {
    logger.error(`Error occured while fetching GOOGLE PLUS profile: ${err.message}`);
    throw err;
  }
}

module.exports = googlePlusProfile;
