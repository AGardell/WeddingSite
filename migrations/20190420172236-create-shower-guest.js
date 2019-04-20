"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable("showerGuests", {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        firstname: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
            isAlphanumeric: true
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
      .then(() => {
        return queryInterface.addIndex("showerGuests", {
          name: "uniqueShowerGuestIndex",
          unique: true,
          fields: [
            Sequelize.fn("lower", Sequelize.col("firstname")),
            Sequelize.fn("lower", Sequelize.col("lastname"))
          ]
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("showerGuests");
  }
};
