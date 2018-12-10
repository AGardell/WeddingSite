module.exports = function (sequelize, type) {
    return sequelize.define('guest', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: type.STRING,
            allowNull: false
        },
        lastname: {
            type: type.STRING,
            allowNull: false
        },
        email: {
            type: type.STRING,
            isEmail: true
        }
    });
};