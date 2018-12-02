const express = require("express");
const app = express();
const { Pool } = require("pg");
const PORT = process.env.PORT;

// require my ENV file to set envrionment variables
require("dotenv").config();

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

// importing routes
var mainRoute = require("./routes/index.js");

app.use(mainRoute);

app.listen(PORT, () => {
  console.log("Website started on port 5500!");
});
