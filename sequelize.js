const db = require("./models");

// // define credentials to connect to DB
// const sequelize = new Sequelize(
//     process.env.DB,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: "localhost",
//       dialect: "postgres",
//       pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//       },
//       logging: false
//     }
//   );

// // Guest model
// const Guest = GuestModel(sequelize, Sequelize);

// // Location model
// const Location = LocationModel(sequelize, Sequelize);

// create a new connection via sequelize
let bootstrapDB = new Promise(function(resolve, reject) {

  // test our connection to our database
  db.sequelize
    .authenticate()
    .then(() => {
      resolve(console.log("Successfully connected to DB!"));
    })
    .catch(err => {
      reject(console.log("Error connecting to DB: " + err));
    });
});

module.exports = {
    bootstrapDB,
}
