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
                notEmpty: true                
            }
        },
        lastname: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notEmpty: true                
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