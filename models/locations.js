module.exports = function (sequelize, type) {
    return sequelize.define('location', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
        },
        address: {
            type: type.STRING,
        },
        website: {
            type: type.STRING,
        }
    }, {
        timestamps: false
    });
};