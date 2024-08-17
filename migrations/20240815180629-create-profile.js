'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      position: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      ktp: {
        type: Sequelize.STRING
      },
      birthplace: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATEONLY
      },
      gender: {
        type: Sequelize.STRING
      },
      religion: {
        type: Sequelize.STRING
      },
      bloodtype: {
        type: Sequelize.STRING
      },
      marriage: {
        type: Sequelize.STRING
      },
      ktpaddress: {
        type: Sequelize.TEXT
      },
      currentaddress: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      pic: {
        type: Sequelize.STRING
      },
      skill: {
        type: Sequelize.TEXT
      },
      placement: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Profiles');
  }
};