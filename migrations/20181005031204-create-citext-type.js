'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.
      sequelize.
      query('CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;').
      catch(console.log);
  },

  down: () => { return; }
};