"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("song_requests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      song: {
        type: Sequelize.STRING
      },
      artist: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => {
       return queryInterface.addConstraint("song_requests", 
      [
        "song",
        "artist"
      ],
      {
        type: "unique",
        name: "songArtistContraint"
      })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("song_requests");
  }
};
