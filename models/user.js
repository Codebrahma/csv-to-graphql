'use strict';
const { validateParams } = require('./../utils/validation');
module.exports = (sequelize, DataTypes) => {
  const { Op: { or: $or } } = sequelize;

  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    photo: DataTypes.STRING,
    password: DataTypes.STRING
  });

  User.findBy = async function(options) {
    const user = await User.findOne({ where: options });
    return user;
  }

  User.validate = async function(data) {
    let errors = validateParams(data);
    if (!data.email && !data.username) { return errors }

    const { email, username } = data;
    const user = await User.findBy({ [$or] : [ { email }, { username } ] });
    errors = user ? [ ...errors, 'Email is already registered' ] : errors;
    return errors;
  }

  return User;
};