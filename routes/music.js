const express = require("express");
const Request = require("../models").song_requests;
const authorizeAccount = require("../middleware").authorizeAccount;
const searchForSong = require("../middleware").findSongAndArtist;
let router = express.Router();

router.get("/", (req, res) => {
  Request.findAll()
    .then(requests => {
      res.render("music", { requests: requests });
    })
    .catch(err => {
      next(err);
    });
});

router.post("/", authorizeAccount, searchForSong, (req, res, next) => {
  let foundSong = JSON.parse(res.locals.songFound);
  if (foundSong.tracks.items.length > 0) {
    Request.create({
      song: req.body.song,
      artist: req.body.artist
    })
      .then(() => {
        res.redirect("/music");
      })
      .catch(error => {
        next(error);
      });
  } else {
    next("No matching song found");
  }
});

module.exports = router;
