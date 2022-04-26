var express = require('express');
var router = express.Router();
const db = require("../models/index");
const controller = require('../controllers/moviecategory.controller');
const authJWT = require('../middlewares/authJWT');

router.post('/add',
    authJWT.verifyToken,
    authJWT.isAdmin,
    controller.addMovieCategory
);

router.post('/read',
    authJWT.verifyToken,
    authJWT.isAdmin,
    controller.readMovieCategory
);

router.post('/update',
    authJWT.verifyToken,
    authJWT.isAdmin,
    controller.updateMovieCategory
);

router.post('/delete',
    authJWT.verifyToken,
    authJWT.isAdmin,
    controller.deleteMovieCategory
);

module.exports = router;