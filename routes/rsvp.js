const express = require("express");
const Guest = require("../models").guest;

var router = express.Router();

router.get("/", (req, res) => {
  res.render("rsvp");
});

router.post("/", (req, res) => {
  let myGuests = [];
  console.log(req.body.guestList);
  for (var key in req.body.guestList) {
    myGuests.push({
      firstname: req.body.guestList[key].firstname,
      lastname: req.body.guestList[key].lastname,
      email: req.body.guestList[key].email
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
