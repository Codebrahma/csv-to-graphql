const { server, chai, sinonSandbox, expect, factory } = require('./../helper');
const { User } = require('./../../models');
const AuthService = require('./../../services/auth');
const { cleanDatabase, stubCassette } = require('./../utils');
const oauthCode = "4/egCFs62C-w5rdb2-DXO1IWp3wH0dePFxXI7WO5muqZjpqRn5ZMb7T_WAXP6hWZj6l7LXZqrVvj0otFzKFT4-ZLc";
const invalidOauthCode = "4/egCFs62C-w5rdb2-DXO1IWp3wH0dedfxXI7WO5muqZjpqRn5ZMb7T_WAXP6hWZj6l7LXZqrVvj0otFzKFT4-ZLc";

describe('GET /auth/google', function() {
  before(function() {
    const currentDate = new Date('2018-10-17T13:34:13.167Z');
    this.clock = sinonSandbox.useFakeTimers(currentDate.getTime());
  });

  describe('when valid code is passed', function() {
    describe('when fetch access token and profile api\'s response is success', function() {

      before(async function () {
        stubCassette('OAUTH_TOKEN_VALID_RESPONSE');
        stubCassette('OAUTH_REFRESH_TOKEN_VALID_RESPONSE', 2);
        stubCassette('GPLUS_PROFILE_VALID_RESPONSE');
        await cleanDatabase();
      });

      it('it should create user, token records and respond success with jwt', function(done) {
        chai.
          request(server).
          get('/auth/google').
          query({ code: oauthCode }).
          end(async (_, res) => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.body).to.contain.keys([
              'jwt',
              'email',
              'refresh_token',
              'access_token',
              'photo',
              'name',
              'expiry_date'
            ]);

            const user = await User.findOne({ where: { email: 'tester@codebrahma.com' } });
            const token = await user.getToken();
            expect(user.email).to.be.equal('tester@codebrahma.com');
            expect(token.dataValues).to.contain.keys([
              'id',
              'userId',
              'accessToken',
              'refreshToken',
              'expiryDate',
            ]);
            done();
          });
      });
    });

    describe('when fetch access token is success and profile api\'s response is failure', function() {
      before(async function() {
        stubCassette('OAUTH_TOKEN_VALID_RESPONSE');
        stubCassette('GPLUS_PROFILE_INVALID_RESPONSE');
        await cleanDatabase();
      })

      it('should respond error with 500', function(done) {
        chai.
          request(server).
          get('/auth/google').
          query({ code: oauthCode }).
          end(async (_, res) => {
            expect(res.statusCode).to.be.equal(500);
            expect(res.body).to.deep.equal({ error: 'Something went wrong' });
            done();
          });
      })
    })
  });

  describe('when invalid code is passed', function() {
    before(function() {
      stubCassette('OAUTH_TOKEN_INVALID_RESPONSE');
    });

    it('should render unauthorized', function(done) {
      chai.
        request(server).
        get('/auth/google').
        query({ code: invalidOauthCode }).
        end(function(_, res) {
          expect(res.statusCode).to.be.equal(401);
          expect(res.body).to.deep.equal({ error: 'Unauthorized' })
          done();
        });
    });
  });

  after(function() {
    this.clock.restore();
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

  describe('when invalid jwt is present', function() {
    it('should render unauthorized with status code 401', function(done) {
      chai.
        request(server).
        get('/am-i-authenticated').
        set({ jwt: 'invalid jwt' }).
        end(function(_, res) {
          expect(res.statusCode).to.be.equal(401);
          expect(res.body).to.deep.equal({ error: 'Unauthorized' });
          done();
        });
    });
  });

  describe('when no jwt is present', function() {
    it('should render unauthorized with status code 401', function(done) {
      chai.
        request(server).
        get('/am-i-authenticated').
        end(function(_, res) {
          expect(res.statusCode).to.be.equal(401);
          expect(res.body).to.deep.equal({ error: 'Unauthorized' });
          done();
        });
    });
  });
});
