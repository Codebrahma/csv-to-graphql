'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    accessToken: DataTypes.TEXT,
    refreshToken: DataTypes.TEXT,
    expiryDate: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});

  Token.associate = function(models) {
    // Associations
    this.user = this.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Token;
};