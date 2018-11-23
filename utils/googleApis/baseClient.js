const { google } = require('googleapis');

const baseClient = () => (
  new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  )
);

module.exports = baseClient;

