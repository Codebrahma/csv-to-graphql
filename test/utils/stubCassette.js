const { headersArrayToObject } = require('nock/lib/common');
const { stub } = require('./stub');
const getCassette = require('./getCassette');

function stubCassette(cassetteName, times = 1) {
  const cassette = getCassette(cassetteName);
  const { scope, path, method, body, status, response, reqHeaders = {} } = cassette;
  const responseHeaders = headersArrayToObject(cassette.rawHeaders);
  stub(scope, path, method, reqHeaders, body, status, responseHeaders, response, times);
}

module.exports = stubCassette;
