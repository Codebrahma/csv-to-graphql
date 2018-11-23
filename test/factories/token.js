const { factory } = require('factory-girl')
const moment = require('moment')
const { Token } = require('./../../models')

module.exports = () => (
  factory.define('Token', Token, {
    accessToken: factory.chance('word'),
    refreshToken: factory.chance('word'),
    expiryDate: moment().add(1, 'month').valueOf() / 1000
  })
);
