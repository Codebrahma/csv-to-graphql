const { factory } = require('factory-girl')
const { User } = require('./../../models')

module.exports = () => (
  factory.define('User', User, {
    email: factory.chance('email'),
    name: factory.chance('name'),
    photo: factory.chance('url'),
    clearbit: {},
    isUser: true,
  })
);
