const express = require("express");
const Guest = require("../models").guest;
const transporter = require("../modules/emailer");

var router = express.Router();

router.get("/", (req, res) => {
  res.render("rsvp");
});

router.post("/", (req, res) => {
  console.log(req.body.response);
  let myGuests = [];
  for (var key in req.body.guestList) {
    myGuests.push({
      firstname: req.body.guestList[key].firstname.trim(),
      lastname: req.body.guestList[key].lastname.trim(),
      email: req.body.guestList[key].email.trim(),
      hotelRequired: req.body.guestList[key].roomConfirm
    });
  }

  if (req.body.response == 'confirm')
  {
    Guest.bulkCreate(myGuests, 
      {
        validate:true
      })
      .then(async () => {
        try {
          await transporter.sendRsvpAlert(myGuests);
          res.send('1');
        } catch (emailerErr) {
          return next(emailerErr);
        }
      })
      .catch(err => {
        // TODO: Look into if error proprerly being sent via email.
        transporter.sendError(err, myGuests);
        res.send(err);
      });
  }
  else if (req.body.response == 'decline')
  {
    (async () => {
      try {
        await transporter.declineRSVP(myGuests);
        res.send('2');
      } catch (emailerErr) {
        return next(emailerErr);
      }
    })();
  }
});

module.exports = router;
