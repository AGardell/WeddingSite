const express = require("express");
const Request = require("../models").song_requests;
const authorizeAccount = require("../middleware").authorizeAccount;
const searchForSong = require("../middleware").findSongAndArtist;
const checkIfExisting = require("../middleware").checkIfExisting;
let router = express.Router({ mergeParams: true });

router.get("/", authorizeAccount, searchForSong, (req, res, next) => {
  if (Object.keys(req.query).length != 0) {
    let foundSong = JSON.parse(res.locals.songFound);
    let songArtist = new Set();

    foundSong.tracks.items.forEach(song => {
      songArtist.add(song.name + " by " + song.artists[0].name);
    });

    if (songArtist.size > 0) {
      const newArr = [...songArtist].map(song => {
        let splitSong = song.split("by");
        let obj = {
          name: splitSong[0].trim(),
          artist: splitSong[1].trim()
        };
        return obj;
      });
      res.send(newArr);
    } else {
      next(
        req.query.song +
          " by " +
          req.query.artist +
          " could not be found. Please verify the song and artist can be found in Spotify!"
      );
    }
  } else {
    Request.findAll({ raw: true })
      .then(requests => {
        res.render("music", { requests: requests });
      })
      .catch(err => {
        next(err);
      });
  }
});

router.post("/", checkIfExisting, (req, res, next) => {
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
});

module.exports = router;
