const bcrypt = require('bcrypt');
const { SALT_ROUND } = require('../../constants');

function createPass() {
  const salt = bcrypt.genSaltSync(SALT_ROUND);
  return bcrypt.hashSync('password', salt);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          first_name: 'John',
          last_name: 'Doe',
          gender: 'male',
          birthday: new Date(),
          email: 'test@test.com',
          phone: '380997774301',
          passwordHash: createPass(),
          user_role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          first_name: 'Jane',
          last_name: 'Doe',
          gender: 'female',
          birthday: new Date(),
          email: 'test222@test.com',
          phone: '380995744311',
          passwordHash: createPass(),
          user_role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkDelete('users', null, {});
  },
};
