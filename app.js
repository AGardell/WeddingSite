const express = require("express");
const app = express();

// require my ENV file to set envrionment variables
require("dotenv").config();

const PORT = process.env.PORT;

// require js file that bootstraps sequelize and tests the connection to the DB.
const {bootstrapDB, Guest} = require("./sequelize.js");

// execute promise and if resolved, proceeed to launch web application. If rejected, return the error and end.
bootstrapDB
    .then(() => {
        // set view engine to ejs
        app.set("view engine", "ejs");
        app.use(express.static(__dirname + "/public"));
        
        // importing routes
        var mainRoute = require("./routes/index.js");
        var rsvpRoute = require("./routes/rsvp.js");
    
        app.use(mainRoute);
        app.use(rsvpRoute);
    
        app.listen(PORT, () => {
        console.log("Website started on port 5500!");
        });
    })
    .catch(err => {
        console.log('Failed to connect to DB: ' + err);
    });
