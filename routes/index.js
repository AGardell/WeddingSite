const express = require("express");
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
    res.render('location');
});

module.exports = router;