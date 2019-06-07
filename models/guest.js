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
          is: /^[A-Za-z]+(\s?[A-Za-z]*)*[A-Za-z]$/
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
        allowNull: true,
        validate: {
          isEmail: true
        }
      },
      hotelRequired: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        {
          name: "uniqueGuestIndex",
          unique: true,
          fields: [
            sequelize.fn("lower", sequelize.col("firstname")),
            sequelize.fn("lower", sequelize.col("lastname"))
          ]
        }
      ]
    }
  );
  guest.associate = function(models) {
    // associations can be defined here
  };

  return guest;
};
