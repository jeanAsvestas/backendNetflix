const db = require("../models/index");
const movie = require("../models/movie");
const Movie = db.sequelize.models.Movie;
const WatchedMovie = db.sequelize.models.WatchedMovie

exports.addMovie = (req, res) => {
    Movie.create({
        title: req.body.title,
        year: req.body.year,
        description: req.body.description,
        length: req.body.length,
        prodCountry: req.body.prodCountry,
        path: req.body.path
    }).then(movie => {
        res.send({ message: "Movie was added successfully!" });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.watchedMovie = (req, res, next) => {
    console.log(req.userId);
    WatchedMovie.create({
        UserId: req.userId,
        MovieId: req.body.movieId
    }).then(watchedmovie => {
        next();
    }).catch(err => {
        res.send({ message: err.message });
    });
}

exports.moviePath = (req, res) => {
    Movie.findOne({
        where: {
            id: req.body.movieId
        }
    }).then(movie => {
        res.status(200).send({ path: movie.path })
    }).catch(err => {
        res.status(500).send({ message: err.message })
    });
}

exports.readMovies = (req, res) => {
    Movie.findAll().then(movies => {
        res.status(200).send(movies)
    }).catch(err => {
        res.status(500).send({ message: err.message })
    });
}

exports.updateMovie = (req, res) => {
    Movie.findOne({
        where: {
            id: req.body.id
        }
    }).then(movie => {
        if (movie.id == req.body.id) {
            movie.title = req.body.title;
            movie.year = req.body.year;
            movie.description = req.body.description;
            movie.length = req.body.length;
            movie.prodCountry = req.body.prodCountry;
            movie.path = req.body.path;
            movie.save().then(movie => {
                res.status(200).send({ message: `movie with id: ${movie.id} was updated successfully` });
                return 
            }).catch(err => {
                res.status(500).send({ message: err.message });
                return 
            })
        } else {
            res.status(200).send({ message: `movie with id: ${movie.id} has changed` });
        }
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

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




