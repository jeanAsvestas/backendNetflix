var express = require("express");
var router = express.Router();
const db = require("../models/index");
const Plan = db.sequelize.models.Plan;
const OrderedPlan = db.sequelize.models.OrderedPlan;


router.get('/create', function(req,res){
    res.render('plan',{
        id:req.query.id  })
})

router.post('/create', async function(req,res){   
    try {
        let plan = await Plan.create({
            name: req.body.name,
            duration: req.body.duration,
            price: req.body.price
        })
        if (plan) {
            res.send("you have created a new plan")
        }
    } catch {
        if (err) throw err;
    }
})

router.get('/buyplan', async function(req,res){
    let plans = await Plan.findAll();      
    res.render('buyplan',{
        list : plans,
        id : req.query.id
    })
});

router.post('/buyplan', async function(req, res){
    console.log(req.query);
    let ordered = await OrderedPlan.create({
        UserId: req.query.id,
        PlanId: req.query.plan
    })
    res.send("you bought it")
})


module.exports = router;