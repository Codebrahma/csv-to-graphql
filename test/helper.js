process.env.NODE_ENV = 'test';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { factory } = require('factory-girl')

const server = require('./../app');
const factoriesInitializer = require('./factories');
const { cleanDatabase, cleanPgBoss } = require('./utils');
const { expect, assert } = chai;
const sinonSandbox = sinon.createSandbox();

before(async function() {
  factoriesInitializer();
  chai.use(chaiHttp);

  await cleanPgBoss();
  await cleanDatabase();
});

afterEach(function() {
  sinonSandbox.restore();
});

module.exports = {
  server,
  factory,
  sinonSandbox,
  chai,
  expect,
  assert
};
