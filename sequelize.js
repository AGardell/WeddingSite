const Sequelize = require("sequelize");
const GuestModel = require("./models/guest.js");

// define credentials to connect to DB
const sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "postgres",
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      logging: false
    }
  );

// Guest model
const Guest = GuestModel(sequelize, Sequelize);

// create a new connection via sequelize
let bootstrapDB = new Promise(function(resolve, reject) {

  // test our connection to our database
  sequelize
    .authenticate()
    .then(() => {
      console.log("Successfully connected to DB!");
      sequelize
        .sync()
        .then(() => {
            resolve(console.log('Models synced!'));
        })
        .catch(err => {
            reject(console.log('Error syncing: ' + err));
        });
    })
    .catch(err => {
      reject(console.log("Error connecting to DB: " + err));
    });
});

module.exports = {
    bootstrapDB,
    Guest   
}
