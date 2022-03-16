var express = require('express');
var router = express.Router();
const db = require("../models/index");
const controller = require('../controllers/category.controller');
const authJWT = require('../middlewares/authJWT');

router.post('/add', 
    //authJWT.verifyToken,
    //authJWT.isAdmin,
    controller.addCategory    
);

router.post('/read',
    //authJWT.verifyToken,
    //authJWT.isAdmin,
    controller.readCategories
);

router.post('/update',
    //authJWT.verifyToken,
    //authJWT.isAdmin,
    controller.updateCategory
);

router.post('/delete',
    //authJWT.verifyToken,
    //authJWT.isAdmin,
    controller.deleteCategory
);


module.exports = router;