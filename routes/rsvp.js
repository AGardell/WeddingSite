const express = require("express");
var router = express.Router();

router.get("/rsvp", (req, res) => {
    res.render("rsvp");
});

module.exports = router;