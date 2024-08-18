'use strict';
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const salt = bcrypt.genSaltSync(16)
   const newUsers = []
   for (let i = 5; i < 20; i++) {
    newUsers.push({
      email: `user${i}@example.com`,
      password: bcrypt.hashSync('User#1234', salt),
      role: 'USER'
    })
   }
    // await queryInterface.bulkInsert('Users', [{
    //   email: 'admin@example.com',
    //   password: bcrypt.hashSync('Admin#1234', salt),
    //   role: 'ADMIN'
    // }], {});
    // await queryInterface.bulkInsert('Users', newUsers, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
