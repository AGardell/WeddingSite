'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex("guests", "uniqueGuestIndex");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addIndex("guests", {
      name: "uniqueGuestIndex",
      unique: true,
      fields: [
        Sequelize.fn("lower", Sequelize.col("firstname")),
        Sequelize.fn("lower", Sequelize.col("lastname"))
      ]
    });
  }
};
