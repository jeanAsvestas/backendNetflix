//not for rest api

var express = require("express");
var router = express.Router();
const db = require("../models/index");
const User = db.sequelize.models.User;

router.get('/', function (req,res) {
    res.render('register')
});

router.post('/', async function (req,res) {
    try {
        let user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
        if (user) {
            res.send("you have registered")
        }
    } catch {
        if (err) throw err;
    }
    
});

module.exports = router;