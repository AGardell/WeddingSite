'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("guests", 
      [
        "firstname",
        "lastname"
      ],
      {
        type: "unique",
        name: "uniqueNameConstraint"
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("guests","uniqueNameConstraint");
  }
};
