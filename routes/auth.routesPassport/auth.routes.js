const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require("../../models/index");
const User = db.sequelize.models.User;
const auth = require('../../middlewares/authentication');
const bcrypt = require('bcryptjs');

router.get('/signin', auth.isAuthenticated, function(req, res) {
	res.render('login')
});

router.post('/validate', passport.authenticate('local', { failureRedirect: '/' }),
	function(req, res) {
		//console.log(req)
		res.redirect('/');
	}
);

router.get('/signup', auth.isAuthenticated,  function(req,res){
    res.render('register');
})

router.post('/signup',function(req,res, next){   

    //var key = crypto.randomBytes(16);
    //crypto.pbkdf2(req.body.password, key, 310000, 32, 'sha256', function (err,      hashedPassword) {if (err) { return next(err); }
    User.create({       
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        res.redirect('/')
    }).catch(err =>{
        return err
    });
    

    }
);


router.get('/logout', function (req,res,next){
    req.logout();
    res.redirect('/');
})
module.exports = router;