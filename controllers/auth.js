const bcrypt = require('bcryptjs');
const { User } = require('./../models');
const AuthService = require('./../services/auth');
const controllerLogger = require('./../logger').makeLogger('CONTROLLER');

class AuthController {
  static async register(req, res) {
    const { email, name } = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.findBy({ email });

    if (user) {
      return res.status(400).send({ success: false, error: 'User is already registered' });
    }

    await User.create({ email, name, password });
    res.send({ success: true, token: AuthService.generateJWT({ email }) });
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    const user = await User.findBy({ email }) || {};
    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({ success: false, error: 'Invalid credentials' });
    }

    res.send({ success: true, token: AuthService.generateJWT({ email }) });
  }

  static async isUserAuthenticated(_, res) {
    res.send({ success: true });
  }
}

module.exports = AuthController;
