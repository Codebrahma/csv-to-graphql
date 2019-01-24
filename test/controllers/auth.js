const { server, chai, expect, factory } = require('./../helper');
const { User } = require('./../../models');
const AuthService = require('./../../services/auth');
const { cleanDatabase } = require('./../utils');
const { assertInvalidToken } = require('./privateRouteAssert');

before(async () => await cleanDatabase());

describe('POST /register', function() {
  describe('when valid params are passed', function() {
    it('should create an account and render token', function(done) {
      chai.
        request(server).
        post('/register').
        send({
          name: 'Tester',
          email: 'test@codebrahma.com',
          password: 'test1234'
        }).
        end(function(_, res) {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.include({ success: true });
          expect(res.body).to.have.property('token');
          done();
        })
    });
  });
});

describe('GET /am-i-authenticated', function() {
  describe('when valid jwt is present', function() {
    let user;

    before(async () => {
      user = await factory.create('User');
    });

    it('should render success with status code 200', function(done) {
      chai.
        request(server).
        get('/am-i-authenticated').
        set({ jwt: AuthService.generateJWT({ email: user.email }) }).
        end(function(_, res) {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.deep.equal({ success: true });
          done();
        });
    });
  });

  describe('when invalid jwt is present', assertInvalidToken('/am-i-authenticated', true));

  describe('when no jwt is present', assertInvalidToken('/am-i-authenticated'));
});
