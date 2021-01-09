module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'posts',
      [
        {
          user_id: 1,
          body: 'post content 1',
          image_src:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.epravda.com.ua%2Fnews%2F2020%2F11%2F14%2F667254%2F&psig=AOvVaw3nIOs1DzHqpYSBIWMRXb-x&ust=1609701103065000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKDI24j6_e0CFQAAAAAdAAAAABAD',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          body: 'post content 2',
          image_src:
            'https://python.ivan-shamaev.ru/wp-content/uploads/2020/04/Python-API-Tutorial.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
