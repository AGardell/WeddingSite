const express = require("express");
const app = express();
const PORT = "5500";

// set view engine to ejs
app.set("view engine", "ejs");

// importing routes
var mainRoute = require("./routes/index.js");

app.use(mainRoute);

app.listen(PORT, () => {
    console.log("Website started on port 5500!");
});