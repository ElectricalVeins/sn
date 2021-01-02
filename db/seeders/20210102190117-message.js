'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'messages',
      [
        {
          body: 'konichiwa',
          user_id: 1,
          dialog_id: 1,
        },
        {
          body: 'hi',
          user_id: 2,
          dialog_id: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
