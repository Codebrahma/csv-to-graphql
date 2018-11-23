const { User } = require('./../models');
const AuthService = require('./../services/auth');
const GoogleApis = require('./../utils/googleApis');
const to = require('./../utils/to');
const controllerLogger = require('./../logger').makeLogger('CONTROLLER');

class AuthController {
  static async index(req, res) {
    let tokens, oAuth2Client;

    try {
      const tokenAndClient = await GoogleApis.getClientAndTokensFromOAuthCode(req.query.code);
      tokens = tokenAndClient.tokens;
      oAuth2Client = tokenAndClient.oAuth2Client;
    } catch(error) {
      controllerLogger.error(`Failed to fetch oauth token from Google: ${error.message}`);
      return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
      const { emails, image, name } = await GoogleApis.getGooglePlusProfile(oAuth2Client);
      const email = emails[0].value;
      const userDetail = {
        email,
        refresh_token: tokens.refresh_token,
        access_token: tokens.access_token,
        photo: image.url,
        name: `${name.givenName} ${name.familyName}`,
        expiry_date: tokens.expiry_date / 1000,
      };

      controllerLogger.info(`Finding a user with email: ${email}`);
      let user = await User.findBy({ email });
      controllerLogger.info(`Found ${user ? 1 : 'no'} user with email ${email}`);

      if (!user) {
        let err;

        controllerLogger.info(`Creating a user with email: ${email}`);
        [ err, user ] = await to(User.upsertWithToken(userDetail));

        if (err) {
          controllerLogger.error(`Unable to create a user with email: ${err.message}`);
          return res.status(500).send({ error: 'Something went wrong' });
        }

        controllerLogger.info(`Created a user record and tokens for: ${email}`);
      } else {
        user = await User.upsertWithToken(userDetail);
      }

      res.json({
        jwt: AuthService.generateJWT({ email }),
        ...userDetail
      });
    } catch(error) {
      controllerLogger.error(`Error occurred while processing: ${error.message} ${error.stack}`);
      return res.status(500).send({ error: 'Something went wrong' });
    }
  }

  static async isUserAuthenticated(_, res) {
    res.send({ success: true });
  }
}

module.exports = AuthController;
