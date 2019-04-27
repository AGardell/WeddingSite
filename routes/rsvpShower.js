const express = require("express");
const Guest = require("../models").showerGuest;
const transporter = require("../modules/emailer");

var router = express.Router();

router.get("/", (req, res) => {
  res.render("rsvpShower");
});

router.post("/", (req, res) => {
  let myGuests = [];
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
      transporter.sendBridalRSVPAlert(myGuests);
      res.send('1');
    })
    .catch(err => {
      // TODO: Look into if error proprerly being sent via email.
      transporter.sendError(err);
      res.send(err);
    });
});

module.exports = router;
