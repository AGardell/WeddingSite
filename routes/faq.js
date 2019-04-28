const express = require("express");
const Guest = require("../models").guest;
const transporter = require("../modules/emailer");

var router = express.Router();

router.get("/", (req, res) => {
  res.render("faq");
});

router.post("/", (req, res) => {
    transporter.sendFaqAlert(req.body.name, req.body.subject, req.body.message);
    res.send('1');
});

module.exports = router;
