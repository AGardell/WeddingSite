const express = require("express");
const Request = require("../models").song_requests;
const authorizeAccount = require("../middleware").authorizeAccount;
const searchForSong = require("../middleware").findSongAndArtist;
const checkIfExisting = require("../middleware").checkIfExisting;
let router = express.Router();

router.get("/", (req, res) => {
  Request.findAll({ raw: true })
    .then(requests => {
      res.render("music", { requests: requests });
    })
    .catch(err => {
      next(err);
    });
});

router.post("/", authorizeAccount, searchForSong, checkIfExisting, (req, res, next) => {
  let foundSong = JSON.parse(res.locals.songFound);
  if (foundSong.tracks.items.length > 0) {
    Request.create(
      {
        song: req.body.song,
        artist: req.body.artist
      },
      {
        validate: true
      }
    )
      .then(() => {
        Request.findAll({ raw: true })
          .then(requests => {
            res.send(requests);
          })
          .catch(err => {
            next(err);
          });
      })
      .catch(err => {
        next(err);
      });
  } else {
    next(req.body.song + " by " + req.body.artist + " could not be found. Please verify the song and artist can be found in Spotify!");
  }
});

module.exports = router;
