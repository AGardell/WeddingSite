const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

module.exports.sendError = function(err) {
  transporter.sendMail(
    {
      from: "goinggardell@gmail.com",
      to: "alexgardell@yahoo.com",
      subject: "Error in application!",
      html: `<p>Error has occurred in the application. Please see below:
              <br/>
              <br/> 
              ${err}</p>`
    },
    (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("SUCCESS! " + info);
      }
    }
  );
};

module.exports.sendRsvpAlert = function(guestList) {

    let guestListHtml = guestList.reduce((totalGuests, guest)  => {
        return totalGuests + '<p>' + guest.firstname + ' ' + guest.lastname + '</p>'
    }, '');

    transporter.sendMail(
        {
        from: "goinggardell@gmail.com",
        to: ["alexgardell@yahoo.com", "wagnermichelle91@gmail.com"],
        subject: "You've Received an RSVP!",
        html: `<p>The following persons) have sent their RSVP. Please see below:
                    <br/>
                    <br/>` + guestListHtml + `</p>`
        },
        (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log("SUCCESS! " + info);
        }
        }
    );
};
