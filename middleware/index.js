const https = require("https");
const querystring = require("querystring");
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
      // console.log(result);
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
    path: '/v1/search?q=' + req.body.song.replace(" ", "%20") + '&type=track',
    headers: {
      Authorization: "Bearer " + res.locals.spotifyAuth
    }
  };
  console.log(options.path);
  https.get(options, response => {
    if (response.statusCode !== 200) {
      next(response.statusCode);
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

module.exports = middlewareObj;
