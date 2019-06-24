const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "goinggardell@gmail.com",
    clientId: process.env.NODEMAILER_CLIENT_ID,
    clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
    refreshToken: process.env.NODEMAILER_REFRESH_TOKEN,
    expires: 3600
  }
});

module.exports.sendError = function(err, guestList) {
  return new Promise((resolve, reject) => {
    let html = `<p>Error has occurred in the application. Please see below:
                <br/>
                <br/> 
                ${err}</p>`;
    if (guestList != undefined) {
      guestListHtml = guestList.reduce((totalGuests, guest) => {
        return (
          totalGuests + "<p>" + guest.firstname + " " + guest.lastname + "</p>"
        );
      }, "");

      html += '<br/>' + guestListHtml;
    }

    transporter.sendMail(
      {
        from: "goinggardell@gmail.com",
        to: "alexgardell@yahoo.com",
        subject: "Error in application!",
        html: html
      },
      (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      }
    );
  });
};

module.exports.sendRsvpAlert = function(guestList) {
  return new Promise((resolve, reject) => {
    let guestListHtml = guestList.reduce((totalGuests, guest) => {
      return (
        totalGuests + "<p>" + guest.firstname + " " + guest.lastname + "<br/>hotel: " + guest.hotelRequired + "</p>"
      );
    }, "");

    transporter.sendMail(
      {
        from: "goinggardell@gmail.com",
        to: "alexgardell@yahoo.com",
        subject: "You've Received an RSVP!",
        html:
          `<p>The following person(s) have sent their RSVP. Please see below:
                    <br/>
                    <br/>` +
          guestListHtml +
          `</p>`
      },
      (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      }
    );
  });
};

module.exports.sendBridalRSVPAlert = function(guestList) {
  return new Promise((resolve, reject) => {
    let guestListHtml = guestList.reduce((totalGuests, guest) => {
      return (
        totalGuests + "<p>" + guest.firstname + " " + guest.lastname + "</p>"
      );
    }, "");

    transporter.sendMail(
      {
        from: "goinggardell@gmail.com",
        to: ["betts109@gmail.com", "alexgardell@yahoo.com"],
        subject: "You've Received an RSVP to your kick ass Bridal Shower!",
        html:
          `<p>The following person(s) have sent their RSVP to your Bridal Shower!!! Please see below:
                  <br/>
                  <br/>` +
          guestListHtml +
          `</p>`
      },
      (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      }
    );
  });
};

module.exports.sendFaqAlert = function(name, subject, email, message) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: {
          name: email,
          address: "goinggardell@gmail.com"
        },
        to: "alexgardell@yahoo.com",
        subject: subject,
        html:
          `Name: ${name} 
           <br>
           <br>
           <br>` + message
      },
      (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      }
    );
  });
};

module.exports.declineRSVP = function(guestList) {
  return new Promise((resolve, reject) => {
    let guestListHtml = guestList.reduce((totalGuests, guest) => {
      return (
        totalGuests + "<p>" + guest.firstname + " " + guest.lastname + "</p>"
      );
    }, "");

    transporter.sendMail(
      {
        from: "goinggardell@gmail.com",
        to: "alexgardell@yahoo.com",
        subject: "Someone will not be able to make the wedding :(",
        html:
          `<p>The following person(s) have declined their RSVP. Please see below:
                    <br/>
                    <br/>` +
          guestListHtml +
          `</p>`
      },
      (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      }
    );
  });
};

module.exports.declineRSVPShower = function(guestList) {
  return new Promise((resolve, reject) => {
    let guestListHtml = guestList.reduce((totalGuests, guest) => {
      return (
        totalGuests + "<p>" + guest.firstname + " " + guest.lastname + "</p>"
      );
    }, "");

    transporter.sendMail(
      {
        from: "goinggardell@gmail.com",
        to: ["betts109@gmail.com", "alexgardell@yahoo.com"],
        subject: "Someone will not be able to make the Bridal Shower :(",
        html:
          `<p>The following person(s) have declined their RSVP. Please see below:
                    <br/>
                    <br/>` +
          guestListHtml +
          `</p>`
      },
      (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      }
    );
  });
};
