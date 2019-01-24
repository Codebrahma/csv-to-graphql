const bcrypt = require('bcryptjs');
const { User } = require('./../models');
const AuthService = require('./../services/auth');
const controllerLogger = require('./../logger').makeLogger('CONTROLLER');

class AuthController {
  static async register(req, res) {
    const { email, name } = req.body;
    const password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.findBy({ where: { email } });

    if (user) {
      return res.status(400).send({ success: false, error: 'User is already registered' });
    }

    await User.create({ email, name, password });
    res.status(201).send({ success: true, token: AuthService.generateJWT({ email }) });
  }

  static async signIn(req, res) {
    const user = await User.findBy({ email: req.body.email }) || {};
    const isValidPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!isValidPassword) {
      return res.status(401).send({ success: false, error: 'Invalid credentials' });
    }

    res.status(201).send({ success: true, token: AuthService.generateJWT({ user.email }) });
  }

  static async isUserAuthenticated(_, res) {
    res.send({ success: true });
  }
}

module.exports = AuthController;
