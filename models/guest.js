"use strict";
module.exports = (sequelize, DataTypes) => {
  const guest = sequelize.define(
    "guest",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlphanumeric: true
        }
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isAlphanumeric: true
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      }
    },
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  );
  guest.associate = function(models) {
    // associations can be defined here
  }
  
  return guest;
};
