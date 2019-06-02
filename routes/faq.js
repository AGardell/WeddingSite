const express = require("express");
const Guest = require("../models").guest;
const transporter = require("../modules/emailer");

var router = express.Router();

router.get("/", (req, res) => {
  res.render("faq");
});

router.post("/", async (req, res) => {
  try {
    await transporter.sendFaqAlert(req.body.name.trim(), req.body.subject.trim(), req.body.email, req.body.message.trim());
    res.send('1');
  } catch (emailerErr) {
    return next(emailerErr);
  }
});

module.exports = router;
