'use strict';
const bcrypt = require('bcrypt');
const { SALT_ROUND } = require('../../constants');

function createPass() {
  return bcrypt.hashSync('password', SALT_ROUND);
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
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkDelete('users', null, {});
  },
};
