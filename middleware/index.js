const https = require("https");
const querystring = require("querystring");
const Request = require("../models").song_requests
const Sequelize = require("../models").Sequelize;
const Op = Sequelize.Op;

// require my ENV file to set environment variables
require("dotenv").config();

middlewareObj = {};

middlewareObj.authorizeAccount = function(req, res, next) {
  let postData = querystring.stringify({
    grant_type: "client_credentials"
  });

  let options = {
    host: "accounts.spotify.com",
    path: "/api/token",
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Authorization: process.env.SPOTIFY_AUTHORIZATION_KEY
    }
  };

  let request = https.request(options, response => {
    let result = "";

    response.on("data", chunk => {
      result += chunk;
    });

    response.on("end", () => {
      let err = JSON.parse(result).error;

      if (err === undefined || err === null) {
        res.locals.spotifyAuth = JSON.parse(result).access_token;
        next();
      } else {
        next(err);
      }
    });

    response.on("error", err => {
      next(err);
    });
  });

  request.write(postData);
  request.end();
};

middlewareObj.findSongAndArtist = function(req, res, next) {
  let options = {
    host: "api.spotify.com",
    path: '/v1/search?q=artist%3A%22' + req.body.artist.replace(/ /g, "%20") + '%22%20track%3A' + req.body.song.replace(/ /g, "%20") + '&type=track',
    headers: {
      Authorization: "Bearer " + res.locals.spotifyAuth
    }   
  };

  https.get(options, response => {
    if (response.statusCode !== 200) {
      next(response.statusCode + ' ' + response.statusMessage);
    }

    let result = "";

    response.on("data", chunk => {
      result += chunk;
    });

    response.on("end", () => {
      let err = JSON.parse(result).error;

      if (err === undefined || err === null) {
        res.locals.songFound = result;
        next();
      } else {
        next(err);
      }
    });

    response.on("error", err => {
      next(err);
    });
  });
};

middlewareObj.checkIfExisting = function (req, res, next) {
  Request.findAll({
    where: {
      song: {
        [Op.iLike]: req.body.song
      },
      artist: {
        [Op.iLike]: req.body.artist
      }
    }
  }, {
    raw: true
  })
  .then(requests => {
    if (requests.length !== 0) {
      let err = "Looks like we already have that song requested. Please enter something new!";
      next(err);
    }
    else {
      next();
    }
  })
  .catch(err => {
    next(err);
  })
}

module.exports = middlewareObj;
