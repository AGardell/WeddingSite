"use strict";
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define(
    "location",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      website: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      blurb: {
        type: DataTypes.TEXT
      }
    },
    {
      updatedAt: 'updated_at',
      createdAt: 'created_at'
    }
  );
  location.associate = function(models) {
    // associations can be defined here
  };
  return location;
};
