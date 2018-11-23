'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn('People', 'isUser', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    })
  ),

  down: (queryInterface) => (
    queryInterface.removeColumn('People', 'isUser')
  )
};