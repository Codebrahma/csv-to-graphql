const userCreator = require('./user')
const tokenCreator = require('./token')

module.exports = () => {
  userCreator();
  tokenCreator();
}
