const jwt = require('jsonwebtoken');
const { User } = require('./../models');
const { makeLogger } = require('./../logger');
const { JWT_TOKEN_EXPIRY_DURATION } = require('./../config/constants');
const { JWT_APP_SECRET } = process.env;
const logger = makeLogger('AUTHENTICATION');

class AuthService {
  static generateJWT(email) {
    const expiresIn = Math.floor( Date.now() / 1000 ) + JWT_TOKEN_EXPIRY_DURATION;
    return jwt.sign(email, JWT_APP_SECRET, { expiresIn });
  }

  static async verifyJWT(token) {
    logger.info(`Verifying token: ${token}`);
    try {
      const decodedToken = jwt.verify(token, JWT_APP_SECRET);
      if (decodedToken.email) {
        const user = await User.findBy({ email: decodedToken.email });
        logger.info(`Found ${ user ? 'a' : 'no' } user for the token`);
        return { success: !!user, email: decodedToken.email };
      } else {
        logger.error(`Email not found when token is decoded`);
        return { success: false };
      }
    }
    catch (e) {
      logger.error(`Token is invalid`);
      return { success: false };
    }
  }
}

module.exports = AuthService;
