const db = require("../models/index");
const movie = require("../models/movie");
const Movie = db.sequelize.models.Movie;
const User = db.sequelize.models.User;
const Category = db.sequelize.models.Category;
const WatchedMovie = db.sequelize.models.WatchedMovie

// Add a movie
exports.addMovie = (req, res) => {
    Movie.create({
        title: req.body.movie.title,
        description: req.body.movie.description,
        length: req.body.movie.length,
        year: req.body.movie.year,
        prodCountry: req.body.movie.prodCountry,
        titleImage: req.body.movie.titleImage,
        trailerImage: req.body.movie.trailerImage,
        mainImage: req.body.movie.mainImage,
        trailer: req.body.movie.trailer,
        movieContent: req.body.movie.movieContent
    }).then(movie => {
        res.send({ message: "Movie was added successfully!" });
    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: err.message });
    });
}

// Create a record into watchedMovie table with a movie that a user has watched 
exports.watchedMovie = (req, res, next) => {
    WatchedMovie.create({
        UserId: req.body.userId,
        MovieId: req.body.movieId
    }).then(watchedmovie => {
        next();
    }).catch(err => {
        res.send({ message: err.message });
    });
}

// Select movie path of a specific movie
exports.moviePath = (req, res) => {
    Movie.findOne({
        where: {
            id: req.params.id
        }
    }).then(movie => {
        res.status(200).send({ movie })
    }).catch(err => {
        res.status(500).send({ message: err.message })
    });
}


// Select movies
exports.readMovies = (req, res) => {
    if (req.body.movie && req.body.movie != "All") {
        Movie.findAll({
            include: {
                model: Category,
                where: {
                    title: req.body.movie
                }
            }
        }).then(movies => {
            res.status(200).send(movies)
        }).catch(err => {
            res.status(500).send({ message: err.message })
        });
    } else {
        Movie.findAll({
            include: {
                model: Category
            }
        }).then(movies => {
            res.status(200).send(movies)
        }).catch(err => {
            res.status(500).send({ message: err.message })
        });
    }
}

// Update a movie
exports.updateMovie = (req, res) => {
    Movie.findOne({
        where: {
            id: req.body.movie.id
        }
    }).then(movie => {
        if (movie.id == req.body.movie.id) {
            movie.title = req.body.movie.title;
            movie.description = req.body.movie.description;
            movie.length = req.body.movie.length;
            movie.year = req.body.movie.year;
            movie.prodCountry = req.body.movie.prodCountry;
            movie.titleImage = req.body.movie.titleImage;
            movie.mainImage = req.body.movie.mainImage;
            movie.trailer = req.body.movie.trailer;
            movie.movieContent = req.body.movie.movieContent;
            movie.save().then(movie => {
                res.status(200).send({ message: `movie with id: ${movie.id} was updated successfully` });
                return 
            }).catch(err => {
                res.status(500).send({ message: err.message });
                return 
            })
        } else {
            res.status(500).send({ message: `An unexpected error was occured with updating movie with  id ${movie.id}` });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

// Delete a movie
exports.deleteMovie = (req, res) => {
    Movie.destroy({
        where: {
            id: req.body.id
        }
    }).then((deleted) => {
        if(deleted == 1) {
            res.status(200).send(`The movie with id: ${req.body.id} was deleted succesfully`);
        }
        else {
            res.status(500).send(`There is no movie with id: ${req.body.id}`);
        }

    }
    ).catch(err => {
        res.status(500).send({message: err.message});
    })
}

// Select user movies
exports.listMovies = (req, res) => {
    Movie.findAll({
        include: [{
            model: User,
            where: {
                id: req.params.userId
            }
        },
        { model: Category }
        ],

    }).then((movies) => {
        res.status(200).send(movies)
        return;
    }).catch(err => {
        res.status(500).send({ message: err.message });
        return;
    })
}


// Select last added movies
exports.getTenLastMovies = (req, res) => {
    Movie.findAll({
        include: [
            { model: Category }
        ],
        limit: 12,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then((movies) => {
        res.status(200).send(movies)
        return;
    }).catch(err => {
        res.status(500).send({ message: err.message });
        return;
    })
}




