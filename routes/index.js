//not active for api
var express = require('express');
var router = express.Router();
//const auth = require('../middlewaresPassport/authentication');  // passport

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(req) 
    res.render('indexGuest',{title: 'Netflix'})  
});

module.exports = router;
