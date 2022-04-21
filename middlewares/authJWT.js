
const jwt = require("jsonwebtoken");
const config = require('../config/auth.config.js');
const db = require("../models/index");
const User = db.sequelize.models.User;

verifyToken = (req, res, next) => {
    console.log(req);
    //let token = req.headers['x-access-token'];  //setup for our front end
    let token = req.headers.authorization.split(' ')[1]; //setup for postman
    if (!token) {
        return res.status(401).send({
            message: 'No token provided'
        });
    }

    jwt.verify(token,config.secret, (err,decoded) =>{
        if (err){
            return res.status(401).send ({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;// assigns id which was decoded from the jwt. 
        next();
    });
}


//checks if user is an admin, not active at 13/03/22
isAdmin = (req,res,next) => {    
    User.findByPk(req.userId).then(user => {
        if (user.isAdmin === true){
            next();
            return;
        }
        res.status(403).send({
            message: "Require Admin Role"
        });
        return;
    });
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
  };

module.exports = authJwt;
