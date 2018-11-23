'use strict';
module.exports = (sequelize, DataTypes) => {
  const { col, where } = sequelize;
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: DataTypes.STRING,
    photo: DataTypes.STRING,
    clearbit: DataTypes.JSONB,
    isUser: DataTypes.BOOLEAN,
  }, {
    defaultScope: { where: { isUser: true } },
    freezeTableName: true,
    tableName: 'People',
  });

  User.associate = function(models) {
    const { Token } = models;

    // Associations
    this.token = this.hasOne(Token, { foreignKey: 'userId' });

    // Class Methods
    User.upsertWithToken = async function(userWithToken) {
      const {
        name,
        email,
        photo,
        access_token: accessToken,
        refresh_token: refreshToken,
        expiry_date: expiryDate
      } = userWithToken;

      const [ user ] = await User.findOrCreate({ where: { email } });
      await user.update({ name, photo, isUser: true });
      const [ token ] = await Token.findOrCreate({ where: { userId: user.id } });
      await token.update({ accessToken, refreshToken, expiryDate });
      return user;
    }

    User.findBy = async function(options) {
      const user = await User.findOne({ where: options });
      return user;
    }
  };

  return User;
};