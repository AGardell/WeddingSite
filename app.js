const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const app = express();
const emailer = require("./modules/emailer");

// require my ENV file to set environment variables
require("dotenv").config();
// required for body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT;

// execute promise and if resolved, proceeed to launch web application. If rejected, return the error and end.

// ASYNC / AWAIT
(async () => {
  try {
    await testDB(db);
    // set view engine to ejs
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/public"));
    

    // importing routes
    let mainRoute = require("./routes/index.js");
    let rsvpRoute = require("./routes/rsvp.js");
    let musicRoute = require("./routes/music.js");
    let rsvpShowerRoute = require("./routes/rsvpShower.js");
    let faqRoute = require("./routes/faq.js");

    //set routes up in pipeline
    app.use(mainRoute);
    app.use('/rsvpShower', rsvpShowerRoute);
    app.use('/rsvp', rsvpRoute);
    app.use('/music', musicRoute);
    app.use('/faq', faqRoute);

    // error handler all routes
    app.use((err, req, res, next) => {
      emailer.sendError(err);
      res.sendStatus(404).send(err);
    });

    app.listen(PORT, () => {
      console.log("Website started on port 5500!");
    });    
  } catch (dbConnectError) {
    try {
      console.log("Unable to connect to database: " + dbConnectError);
      await emailer.sendError(dbConnectError);
    } catch (emailerError) {
      console.log("Email service failed: " + emailerError);
    }
  }
})();

function testDB(db) {
    return new Promise ((resolve, reject) => {
        db.sequelize.authenticate()
        .then(() => {
            resolve(console.log("Successfully connected to database!"));
        })
        .catch((err) => {
            console.log("Unable to connect to database.");
            reject(err);
        })
    });
};
