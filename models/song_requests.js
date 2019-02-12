"use strict";
module.exports = (sequelize, DataTypes) => {
  const song_requests = sequelize.define(
    "song_requests",
    {
      song: DataTypes.STRING,
      artist: DataTypes.STRING
    },
    {
      updatedAt: "updated_at",
      createdAt: "created_at"
    }
  );
  song_requests.associate = function(models) {
    // associations can be defined here
  };
  return song_requests;
};
