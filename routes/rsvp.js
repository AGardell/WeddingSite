const express = require("express");
const Guest = require("../models").guest;

var router = express.Router();

router.get("/", (req, res) => {
  res.render("rsvp");
});

router.post("/", (req, res) => {
  let myGuests = [];

  for (var key in req.body) {
    myGuests.push({
      firstname: req.body[key].firstname,
      lastname: req.body[key].lastname,
      email: req.body[key].email
    });
  }

  Guest.bulkCreate(myGuests, 
    {
      validate:true
    })
    .then(() => {
      res.send('1');
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
