const { server, chai, expect } = require('./../helper')

describe('GET /', function() {
  it('should render "Hello World!"', function(done) {
    chai.
      request(server).
      get('/').
      end(function(_, res) {
        expect(res.statusCode).to.be.equal(200);
        expect(res.text).to.be.equal('Hello World!');
        done();
      });
  });
});
