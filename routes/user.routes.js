const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
var express = require('express');
var router = express();



router.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
router.get("/all", controller.getAllUsers);


// router.get(
//       "/user",
//   authJwt.verifyToken,
//       controller.userBoard
//     );
// router.get(
//       "/admin",
//   authJwt.verifyToken, authJwt.isAdmin,
//       controller.adminBoard
//     );


module.exports = router;