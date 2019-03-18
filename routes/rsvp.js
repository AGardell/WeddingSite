const express = require("express");
const Guest = require("../models").guest;
const transporter = require("../modules/emailer");

var router = express.Router();

router.get("/", (req, res) => {
  res.render("rsvp");
});

router.post("/", (req, res) => {
  let myGuests = [];
  // console.log(req.body.guestList);
  for (var key in req.body.guestList) {
    myGuests.push({
      firstname: req.body.guestList[key].firstname,
      lastname: req.body.guestList[key].lastname,
      email: req.body.guestList[key].email,
      hotelRequired: req.body.guestList[key].roomConfirm
    });
  }

  Guest.bulkCreate(myGuests, 
    {
      validate:true
    })
    .then(() => {
      transporter.sendRsvpAlert(myGuests);
      console.log('Guest saved to database.');
      res.send('1');
    })
    .catch(err => {
      // TODO: Look into if error proprerly being sent via email.
      transporter.sendError(err);
      console.log('ERROR: ' + err);
      res.send(err);
    });
});

module.exports = router;
