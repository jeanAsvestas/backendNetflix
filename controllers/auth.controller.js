const db = require("../models/index");
const config = require('../config/auth.config');
const User = db.sequelize.models.User;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Create a new user in database 
exports.signup = (req,res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then (user => {
        res.send({ message: "User was registered successfully!" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

// Sign in to authenticate a user and create JWT
exports.signin = (req, res) => {
    User.findOne({
        where:{
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        
        var passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
        if (!passwordIsValid) {               
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!"
            });
        }
        
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 3600 // 24 hours
        });   
        res.status(200).send
         
        ({        
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
            accessToken: token            
        })
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });    
}