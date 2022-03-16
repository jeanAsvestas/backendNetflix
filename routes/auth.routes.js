const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
var express = require('express');
var router = express.Router();


router.use(function (req,res,next){
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

//not for api
router.get('/signin', function(req,res){
    res.render('login')
});

//not for api
router.get("/signup", function (req,res){    
    res.render('register')
});

router.post('/signup', 
    verifySignUp.checkDuplicateUserEmail, 
    controller.signup
);
    

router.post("/signin", 
    controller.signin 
);



module.exports = router;