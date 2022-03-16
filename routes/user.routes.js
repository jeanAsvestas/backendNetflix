const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
var express = require('express');
var app = express();



    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    app.get("/all", controller.allAccess);
    app.get(
      "/user",
      [authJwt.verifyToken],
      controller.userBoard
    );
    app.get(
      "/admin",
      [authJwt.verifyToken, authJwt.isAdmin],
      controller.adminBoard
    );


  module.exports = app;