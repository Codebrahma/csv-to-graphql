'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: DataTypes.STRING,
    photo: DataTypes.STRING,
    isUser: DataTypes.BOOLEAN,
  }, {
    defaultScope: { where: { isUser: true } },
    freezeTableName: true,
  });

  User.findBy = async function(options) {
    const user = await User.findOne({ where: options });
    return user;
  }

  return User;
};