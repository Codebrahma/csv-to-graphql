const nock = require('nock');
const { parse: parseURL }  = require('url');

function stub(
  host,
  pathname='',
  method = 'get',
  reqHeaders = {},
  data = {},
  statusCode = 200,
  resHeaders = {},
  resBody = {},
  times = 1
) {
  const requestMethod = method.toLowerCase();
  let request = nock(host, { reqheaders: reqHeaders })
  request = request[requestMethod](pathname, data)
  request.times(times).reply(statusCode, resBody, resHeaders);
}

function stubURL(
  url,
  method = 'get',
  reqHeaders = {},
  data = {},
  statusCode = 200,
  resHeaders = {},
  resBody = {}
) {
  const urlInstance = parseURL(url);
  const requestMethod = method.toLowerCase();
  let request = nock(url.host, { reqheaders: reqHeaders })
  request = request[requestMethod](urlInstance.pathname, data)
  request.reply(statusCode, resBody, resHeaders);
}

module.exports = {
  stub,
  stubURL,
};
