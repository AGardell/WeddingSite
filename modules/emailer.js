const nodemailer = require("nodemailer");

const auth = {
  type: 'OAuth2',
  user: 'goinggardell@gmail.com',
  clientid: '350027263679-ilfeet30r1dadusndprdsqlnq4e6r8qa.apps.googleusercontent.com',
  clientSecret: 'hBE8PeH_jnnGntvNEQs8L3lo',
  refreshToken: '6YLDiO8nOUbfAB4O0Fa8gSUSkCMBMM_zTxlh_wEL9oE'
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: auth
  // auth: {
  //   user: process.env.EMAIL_USERNAME,
  //   pass: process.env.EMAIL_PASSWORD
  // }
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
        console.log("Email sent. " + JSON.parse(info));
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
        to: "alexgardell@yahoo.com",
        subject: "You've Received an RSVP!",
        html: `<p>The following person(s) have sent their RSVP. Please see below:
                    <br/>
                    <br/>` + guestListHtml + `</p>`
        },
        (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent. " + JSON.parse(info));
        }
        }
    );
};

module.exports.sendBridalRSVPAlert = function(guestList) {

  let guestListHtml = guestList.reduce((totalGuests, guest)  => {
      return totalGuests + '<p>' + guest.firstname + ' ' + guest.lastname + '</p>'
  }, '');

  transporter.sendMail(
      {
      from: "goinggardell@gmail.com",
      to: ["betts109@gmail.com","alexgardell@yahoo.com"],
      subject: "You've Received an RSVP to your kick ass Bridal Shower!",
      html: `<p>The following person(s) have sent their RSVP to your Bridal Shower!!! Please see below:
                  <br/>
                  <br/>` + guestListHtml + `</p>`
      },
      (err, info) => {
      if (err) {
          console.log(err);
      } else {
          console.log("Email sent. " + JSON.parse(info));
      }
      }
  );
};

module.exports.sendFaqAlert = function(name, subject, email, message) {
  transporter.sendMail(
    {
    from: {
      name: email,
      address: "goinggardell@gmail.com"
    },
    to: "alexgardell@yahoo.com",
    subject: subject,
    html: `Name: ${name} 
           <br>
           <br>
           <br>` + message
    },
    (err, info) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Email sent. " + JSON.parse(info));
    }
    }
);
};