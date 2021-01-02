'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'People',
      [{ role: 'user' }, { role: 'admin' }],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
