'use strict';

const encryptPassword = require('../encryption');
const faker = require('faker');


module.exports = {
  up: async (queryInterface, Sequelize) => {

    let users = [];

    for (let i = 0; i < 10; i++) {
      users.push({
        email: faker.internet.email(),
        password: encryptPassword("s3cr3t"),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }


    await queryInterface.bulkInsert('users', users)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
