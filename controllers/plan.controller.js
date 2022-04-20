const db = require("../models/index");
const Plan = db.sequelize.models.Plan;
const OrderedPlan = db.sequelize.models.OrderedPlan;
const User = db.sequelize.models.User;

exports.addPlan = (req, res) => {
    Plan.create({
        name: req.body.name,
        duration: req.body.duration,
        price: req.body.price
    }).then(plan => {
        res.status(200).send({ message: "Plan was added successfully" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.buyPlan = (req, res, next) => {
    //needed for expiresAt attribute
    let date = new Date();
    OrderedPlan.create({
        UserId: req.body.user.id,
        PlanId: req.body.plan.id,
        pricePaid: req.body.plan.price,
        // adds duration months to current date in order to set the orderedplan expiration date
        expiresAt: new Date(date.setMonth(date.getMonth() + req.body.plan.duration))
    }).then(orderedPlan => {
        res.status(200).send({ message: "Plan was ordered successfully" });
    }).catch(err => {
        res.send({ message: err.message });
    });
}

exports.readPlan = (req, res, next) => {
    OrderedPlan.findAll({
        limit: 1,
        where: {
            UserId: req.userId
        },
        order: [['createdAt', 'DESC']]
    }).then(ordered => {
        if (new Date() > ordered[0].expiresAt) {
            res.send({ message: "You need to refresh your subscription" })
            return;
        }
        req.body.ordered = ordered[0]
        next();
    }).catch(err => {
        res.status(500).send({ message: err.message })
    });
}

exports.readAllPlans = (req, res) => {
    Plan.findAll().then((plans) => {
        res.status(200).send({plans});
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
}
exports.getUserPlans = (req, res) => {
    OrderedPlan.findAll({
        where: {
            UserId: req.params.id
        }
    }).then((orderedPlans) => {
        res.status(200).json({ orderedPlans });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
// exports.getUserPlans = (req, res) => {
//     User.findAll({
//         where: {
//             id: req.params.id
//         },
//         include: [{ model: Plan }]
//     }).then((orderedPlans) => {
//         res.status(200).json({ orderedPlans });
//     }).catch(err => {
//         res.status(500).send({ message: err.message });
//     });
// }

exports.updatePlan = (req, res) => {
    Plan.findOne({
        where: {
            id: req.body.id
        }
    }).then((plan) => {
        if (plan.id == req.body.id) {
            plan.name = req.body.name;
            plan.duration = req.body.duration;
            plan.price = req.body.price;
            plan.save().then((plan) => {
                res.status(200).send({ message: `Plan with id: ${plan.id} was updated successfully` })
                //return;
            }).catch(err => {
                res.status(500).send({ message: err.message });
                //return;

            })
        } else {
            res.status(500).send({ message: `An unexpected error was occured with updating plab with id ${plan.id}` });
        }

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.deletePlan = (req, res) => {
    Plan.destroy({
        where: {
            id: req.body.id
        }
    }).then((deleted) => {
        if(deleted == 1) {
            res.status(200).send(`The plan with id: ${req.body.id} was deleted succesfully`);
        }
        else {
            res.status(500).send(`There is no plan with id: ${req.body.id}`);
        }

    }
    ).catch(err => {
        res.status(500).send({message: err.message});
    })
}