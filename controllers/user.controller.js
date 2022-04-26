const db = require("../models/index");
const Plan = db.sequelize.models.Plan;
const User = db.sequelize.models.User;

// Select all users
exports.getAllUsers = (req, res) => {
    User.findAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

// Select a specific user
exports.getOneUser = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }, include: {
            model: Plan
        }
    }).then(user => {
        res.status(200).json(user);
    })
        .catch(err => {
            res.status(500).json(err);
        });
}





