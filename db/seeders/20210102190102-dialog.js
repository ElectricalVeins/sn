'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'People',
      [
        {
          user_id: 1,
          interlocutor_id: 2,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
