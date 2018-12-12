const { server, chai, expect } = require('./../helper');
const AuthService = require('./../../services/auth');

const assertInvalidToken = (url, setToken = false, method = 'get') => (function () {
  it('should render unauthorized', function(done) {
    chai.
    request(server)[method](url).
    set(setToken ? { jwt: AuthService.generateJWT({ email: 'non-existent-user1@gmail.com' }) } : {}).
    end(function(_, res) {
      expect(res.statusCode).to.be.equal(401);
      expect(res.body).to.deep.equal({ error: 'Unauthorized' });
      done();
    });
  });
});

module.exports = {
  assertInvalidToken,
}