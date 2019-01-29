'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return queryInterface.renameColumn('locations','createdAt','created_at', { transaction: t})
      .then(() => {
        return queryInterface.renameColumn('locations','updatedAt','updated_at', { transaction: t})
      })
      .then(() => {
        return queryInterface.renameColumn('guests','updatedAt','updated_at', { transaction: t})        
      })
      .then (() => {
        return queryInterface.renameColumn('guests','createdAt','created_at', { transaction: t})         
      })
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return queryInterface.renameColumn('locations','created_at','createdAt', { transaction: t})
      .then(() => {
        return queryInterface.renameColumn('locations','updated_at','updatedAt', { transaction: t})
      })
      .then(() => {
        return queryInterface.renameColumn('guests','updated_at','updatedAt', { transaction: t})        
      })
      .then (() => {
        return queryInterface.renameColumn('guests','created_at','createdAt', { transaction: t})         
      })
    });
  }
};
