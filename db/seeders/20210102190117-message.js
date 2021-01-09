module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'messages',
      [
        {
          body: 'konichiwa',
          user_id: 1,
          dialog_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          body: 'hi',
          user_id: 2,
          dialog_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
