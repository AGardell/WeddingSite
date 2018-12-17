module.exports = function (sequelize, type) {
    return sequelize.define('guest', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAlphaNumeric: true               
            }
        },
        lastname: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isAlphaNumeric: true               
            }
        },
        email: {
            type: type.STRING,
            validate: {
                isEmail: true                
            }
        }
    });
};