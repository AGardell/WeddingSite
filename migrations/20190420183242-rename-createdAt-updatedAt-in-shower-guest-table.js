'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return queryInterface.renameColumn('showerGuests','createdAt','created_at', { transaction: t})
      .then(() => {
        return queryInterface.renameColumn('showerGuests','updatedAt','updated_at', { transaction: t})
      })
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return queryInterface.renameColumn('showerGuests','created_at','createdAt', { transaction: t})
      .then(() => {
        return queryInterface.renameColumn('showerGuests','updated_at','updatedAt', { transaction: t})
      })
    });
  }
};
