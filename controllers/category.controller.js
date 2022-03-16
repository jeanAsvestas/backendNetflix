const db = require("../models/index");
const category = require("../models/category");
const Category = db.sequelize.models.Category;

exports.addCategory = (req, res) => {
    Category.create({
        title: req.body.title,
    }).then(category => {
        res.status(200).send({ message: `Category with title: ${category.title} was added successfully` });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.readCategories = (req, res) => {
    Category.findAll().then((categories) => {
        res.status(200).send({categories});
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
}

exports.updateCategory = (req, res) => {
    Category.findOne({
        where: {
            id: req.body.id
        }
    }).then((category) => {
        if (category.id == req.body.id) {
            category.title = req.body.title;
            category.save().then((category) => {
                res.status(200).send({ category })
                return;
            }).catch(err => {
                res.status(500).send({ message: err.message });
                return;

            })
        }
        res.status(200).send({ message: `Category with id: ${category.id} was updated successfully` })

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.deleteCategory = (req, res) => {
    Category.destroy({
        where: {
            id: req.body.id
        }
    }).then((deleted) => {
        if(deleted == 1) {
            res.status(200).send(`The category with id: ${req.body.id} was deleted succesfully`);
        }
        else {
            res.status(500).send(`There is no category with id: ${req.body.id}`);
        }

    }
    ).catch(err => {
        res.status(500).send({message: err.message});
    })
}
