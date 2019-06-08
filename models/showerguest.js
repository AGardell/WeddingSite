"use strict";
module.exports = (sequelize, DataTypes) => {
  const showerGuest = sequelize.define(
    "showerGuest",
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
          notEmpty: true
          //isAlphanumeric: true
        }
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
          //isAlphanumeric: true
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
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        {
          name: "uniqueShowerGuestIndex",
          unique: true,
          fields: [
            sequelize.fn("lower", sequelize.col("firstname")),
            sequelize.fn("lower", sequelize.col("lastname"))
          ]
        }
      ]
    }
  );
  showerGuest.associate = function(models) {
    // associations can be defined here
  };
  return showerGuest;
};
