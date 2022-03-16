var express = require('express');
const db = require("../models/index");
const User = db.sequelize.models.User;

checkDuplicateUserEmail = (req,res,next) =>{
    User.findOne(
        {where:{
        email: req.body.email
        }
    }).then(user => {
        if(user){
            res.status(400).send({
                message: "Email is already in use!"
            });
            return;
        }
        next();
        return;
    });
}

const verifySignUp = {
    checkDuplicateUserEmail: checkDuplicateUserEmail
}

module.exports = verifySignUp;