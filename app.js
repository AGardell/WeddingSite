const express = require("express");
const app = express();
const { Pool } = require("pg");

// require my ENV file to set envrionment variables
require("dotenv").config();

const PORT = process.env.PORT;

const pool = new Pool({
    user: process.env.DB_USER,
    host: "localhost",
    database: "gardellwagnerwedding",
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });

pool.connect(err => {
    if (err) {
        console.log("Error: " + err);
    } else {
        pool.query("SELECT * FROM guestsconfirmed", (err, res) => {
            if (!err){
                console.log(res.rows[0]);
            } else {
                console.log (err);
            }
            pool.end();
        });
    }
});

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
