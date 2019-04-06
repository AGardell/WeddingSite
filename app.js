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
testDB(db)
  .then(() => {
    // set view engine to ejs
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/public"));
    

    // importing routes
    let mainRoute = require("./routes/index.js");
    let rsvpRoute = require("./routes/rsvp.js");
    let musicRoute = require("./routes/music.js");

    app.use(mainRoute);
    app.use('/rsvp', rsvpRoute);
    app.use('/music', musicRoute);

    // error handler all routes
    app.use((err, req, res, next) => {
      emailer.sendError(err);
      res.sendStatus(404).send(err);
    });

    app.listen(PORT, () => {
      console.log("Website started on port 5500!");
    });
  })
  .catch(err => {
    console.log("Failed to connect to DB: " + err);
  });

function testDB(db) {
    return new Promise ((resolve, reject) => {
        db.sequelize.authenticate()
        .then(() => {
            resolve(console.log("Successfully connected to database!"));
        })
        .catch((err) => {
            reject(console.log("Unable to connect to database! ERROR: " + err));
        })
    });
};
