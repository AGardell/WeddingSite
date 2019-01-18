const express = require("express");
const Location = require('../sequelize.js').Location;
var router = express.Router();

router.get("/", (req, res) => {
    res.render("landing");
});

router.get("/home", (req, res) => {
    res.render("index");
});

router.get('/ourstory', (req, res) => {
    res.render('story');
});

router.get('/location', (req, res) => {
    Location.findAll({raw: true}).then(location => {
        res.render('location', {
            locations: location
        });
    })
});

module.exports = router;