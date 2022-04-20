const db = require("../models/index");
const Plan = db.sequelize.models.Plan;
const User = db.sequelize.models.User;

exports.getAllUsers = (req, res) => {
    User.findAll()
        .then(users => {
            //console.log(users)
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

exports.getOneUser = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }, include: {
            model: Plan
        }
    }).then(user => {
        //console.log(users)
        res.status(200).json(user);
    })
        .catch(err => {
            res.status(500).json(err);
        });
}





// exports.allAccess = (req, res) => {
//     res.status(200).send("Public Content.");
// };

// exports.userBoard = (req, res) => {
//     res.status(200).send("User Content.");
// };

// exports.adminBoard = (req, res) => {
//     res.status(200).send("Admin Content.");
// };