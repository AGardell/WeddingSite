const express = require("express");
const location = require("../models").location;
var router = express.Router();

router.get("/", (req, res) => {
    // res.render("landing");
    res.redirect('/home');
});

router.get("/home", (req, res) => {
    res.render("index");
});

router.get('/ourstory', (req, res) => {
    res.render('story');
});

router.get('/location', (req, res) => {
    location.findAll({raw: true}).then(location => {
        res.render('location', {
            locations: location
        });
    })
});

module.exports = router;