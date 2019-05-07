'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('guests', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^[A-Za-z]+(\s?[A-Za-z]*)*[A-Za-z]$/
        }
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlphanumeric: true
        }
      },
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: true
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('guests');
  }
};