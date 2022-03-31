const db = require("../models/index");
const moviecategory = require("../models/moviecategory");
const MovieCategory = db.sequelize.models.MovieCategory;


// Add movie in a specific category
exports.addMovieCategory = (req, res) => {
    MovieCategory.create({
        MovieId: req.body.movieId,
        CategoryId: req.body.categoryId
    }).then(categorizedmovie =>{
        res.status(200).send({ message: `Movie with id: ${req.body.movieId} was categorized succesfully` });
        return;
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
}

// Select and see the categorization of movies
exports.readMovieCategory = (req, res) => {
    MovieCategory.findAll().then((moviecategories) => {
        res.status(200).send({moviecategories});
    }).catch(err => {
        res.status(500).send({message: err.message});
    });
}

// Update the categorization of a movie
exports.updateMovieCategory = (req, res) => {
    MovieCategory.findOne({
        where: {
            id: req.body.id
        }
    }).then(moviecategory => {
        console.log(moviecategory.id);
        if (moviecategory.id == req.body.id) {
            moviecategory.MovieId = req.body.movieId;
            moviecategory.CategoryId = req.body.categoryId;
            moviecategory.save().then(moviecategory => {
                res.status(200).send({ message: `The movie categorization with id: ${moviecategory.id} was updated successfully` });
                return;
            }).catch(err => {
                res.status(500).send({ message: err.message });
                return;
            })
        } else {
            res.status(500).send({ message: `An unexpected error was occured with updating movie categorization with  id ${moviecategory.id}` });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

// Delete the categorization of a movie
exports.deleteMovieCategory = (req, res) => {
    MovieCategory.destroy({
        where: {
            id: req.body.id
        }
    }).then((deleted) => {
        if(deleted == 1) {
            res.status(200).send(`The categorization of the movie was deleted succesfully`);
        }
        else {
            res.status(500).send(`There is no categorization of movie with id: ${req.body.id}`);
        }

    }
    ).catch(err => {
        res.status(500).send({message: err.message});
    })
}
