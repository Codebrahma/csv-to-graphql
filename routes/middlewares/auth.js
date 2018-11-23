const { User } = require('./../../models');
const AuthService = require('./../../services/auth');

const authMiddleware = async (req, res, next) => {
  const jwt = req.headers.jwt;
  const { success, email } = await AuthService.verifyJWT(jwt);
  if (!success) {
    res.status(401).send({ error: 'Unauthorized' });
    return;
  };

  req.currentUser = await User.findBy({ email });
  next();
}

module.exports = authMiddleware;
