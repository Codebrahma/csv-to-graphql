const bcrypt = require('bcryptjs');
const { User } = require('./../models');
const AuthService = require('./../services/auth');
const controllerLogger = require('./../logger').makeLogger('CONTROLLER');
const { successResponder, errorResponder } = require('./responders');

class AuthController {
  static async register(req, res) {
    const { email, name, username } = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);
    const errors = await User.validate(req.body);

    if (errors && errors.length) { return errorResponder(res, 400, errors); }
    await User.create({ email, name, username, password });
    return successResponder(res, { token: AuthService.generateJWT({ email }) });
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    const user = await User.findBy({ email }) || { password: '' };
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) { return errorResponder(res, 401, ['Invalid credentials']); }
    return successResponder(res, { token: AuthService.generateJWT({ email }) });
  }

  static async isUserAuthenticated(_, res) {
    res.send({ success: true });
  }
}

module.exports = AuthController;
