"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return queryInterface
        .addColumn("locations", "image", Sequelize.STRING, { transaction: t })
        .then(() => {
          return queryInterface.addColumn("locations", "blurb", Sequelize.TEXT, {
            transaction: t
          });
        });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return queryInterface
        .removeColumn("locations", "blurb", { transaction: t })
        .then(() => {
          return queryInterface.removeColumn("locations", "image", {
            transaction: t
          });
        });
    });
  }
};
