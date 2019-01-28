const bcrypt = require('bcryptjs');
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
          username: 'Tester1234',
          password: 'test1234'
        }).
        end(function(_, res) {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.include({ success: true });
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('token');
          done();
        })
    });
  });

  describe('when invalid params are passed', function() {
    describe('when some of the inputs are empty', function() {
      it('should render errors with 400', function(done) {
        chai.
          request(server).
          post('/register').
          send({
            name: '',
            username: '',
            email: 'tstahma.com',
            password: 'tst1234'
          }).
          end(function(_, res) {
            expect(res.statusCode).to.be.equal(400);
            expect(res.body).to.include({ success: false });
            expect(res.body).to.have.property('errors');
            expect(res.body.errors).to.have.members([
              "Name must be at least 4 characters",
              "Username must be at least 8 characters",
              "Email must be valid"
            ])
            done();
          })
      });
    });

    describe('when email is already registered', function() {
      before(async function() {
        await User.create({ email: 'newuser@codebrahma.com' });
      });

      it('should render errors with 400', function(done) {
        chai.
          request(server).
          post('/register').
          send({
            name: 'Tester data',
            username: 'newtester',
            email: 'newuser@codebrahma.com',
            password: 'tst1234'
          }).
          end(function(_, res) {
            expect(res.statusCode).to.be.equal(400);
            expect(res.body).to.include({ success: false });
            expect(res.body).to.have.property('errors');
            expect(res.body.errors).to.have.members([
              "Email is already registered"
            ])
            done();
          })
      });
    });
  });
});

describe('POST /sign-in', function() {
  before(async function() {
    await User.create({
      name: 'Tester',
      email: 'test.main@codebrahma.com',
      username: 'Tester.main1234',
      password: bcrypt.hashSync('test1234', 10)
    });
  });

  describe('when valid params are passed', function() {
    it('should validate and render token', function(done) {
      chai.
        request(server).
        post('/sign-in').
        send({
          email: 'test.main@codebrahma.com',
          password: 'test1234'
        }).
        end(function(_, res) {
          expect(res.statusCode).to.be.equal(200);
          expect(res.body).to.include({ success: true });
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('token');
          done();
        })
    });
  });

  describe('when invalid params are passed', function() {
    describe('when some of the inputs are empty', function() {
      it('should render errors with 400', function(done) {
        chai.
          request(server).
          post('/sign-in').
          send({
            email: '',
            password: ''
          }).
          end(function(_, res) {
            expect(res.statusCode).to.be.equal(401);
            expect(res.body).to.include({ success: false });
            expect(res.body).to.have.property('errors');
            expect(res.body.errors).to.have.members([
              "Invalid credentials"
            ])
            done();
          })
      });
    });

    describe('when email or password is invalid', function() {
      it('should render errors with 400', function(done) {
        chai.
          request(server).
          post('/sign-in').
          send({
            email: 'test@1234.com',
            password: ''
          }).
          end(function(_, res) {
            expect(res.statusCode).to.be.equal(401);
            expect(res.body).to.include({ success: false });
            expect(res.body).to.have.property('errors');
            expect(res.body.errors).to.have.members([
              "Invalid credentials"
            ])
            done();
          })
      });
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
