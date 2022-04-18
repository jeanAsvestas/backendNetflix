var express = require('express');
var router = express.Router();
const db = require("../models/index");
const controller = require('../controllers/plan.controller')
const authJWT = require('../middlewares/authJWT')

router.post('/add', 
    //authJWT.verifyToken,
    controller.addPlan    
);

router.post('/buy',
    //authJWT.verifyToken,
    controller.buyPlan
);

router.post('/check',
   controller.readPlan,
   (req,res) => {
       res.json(req.body.ordered)
   }
);

router.post('/read',
    //authJWT.verifyToken,
    //authJWT.isAdmin,
    controller.readAllPlans
);

router.post('/update',
    //authJWT.verifyToken,
    //authJWT.isAdmin,
    controller.updatePlan
);

router.post('/delete',
    //authJWT.verifyToken,
    //authJWT.isAdmin,
    controller.deletePlan
);


module.exports = router;