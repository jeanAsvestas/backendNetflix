//not for api
var express = require("express");
var router = express.Router();
var mysql = require("mysql2");
const db = require("../models/index");
const User = db.sequelize.models.User;
var connected = false;
const querystring = require('querystring')

router.get("/", function (req, res) {
  if (connected==  false){
    res.render("login",);
  } else {
    res.redirect('/')
  }
});

router.post("/", async function (req, res) {
  // Capture the input fields
  let email = req.body.email;
  let password = req.body.password;
  let logResult = await checkLoginDet(email,password);
  if (logResult){
    const query = querystring.stringify({
      "id":logResult[1],
      "connected" : logResult[0]
    })
    connected = true;
    res.redirect('/?'+ query)
  } else {
    res.send("Wrong email/password")
  }
 
});

async function checkLoginDet(email,password){
  try {
    let result = await User.findOne({
      where: {
        email: email,
        password : password
      },
    })
    if (result){
     console.log(result.id);
      
      return [true, result.id]
    }
  }
  catch (error) {
    return (false);
  }
  // await User.findOne({
  //   where: {
  //     email: req.body.email,
  //   },
  // }).then((user) => {
  //   if (user == null) {
  //     res.send("Wrong Username and/or Password!");
  //   } else {
  //     if (user.password == password) {
  //       let logIn = true;
  //       res.redirect("/");
        
  //     } else {        
  //       res.redirect("/login");
  //     }
  //   }
  // });
}
module.exports = router;