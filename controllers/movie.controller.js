const db = require("../models/index");
const movie = require("../models/movie");
const Movie = db.sequelize.models.Movie;
const User = db.sequelize.models.User;
const Category = db.sequelize.models.Category;
const WatchedMovie = db.sequelize.models.WatchedMovie

exports.addMovie = (req, res) => {
    //console.log(req.body.movie.mainImage)
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
        // title: req.body.title,
        // description: req.body.description,
        // length: `${req.body.length.split(":")[0]}h ${req.body.length.split(":")[1]}m`,
        // year: req.body.year,
        // prodCountry: req.body.prodCountry,
        // titleImage: req.body.titleImage,
        // trailerImage: req.body.trailerImage,
        // //mainImage: req.body.mainImage[0].name,
        // trailer: req.body.trailer,
        // movieContent: req.body.movieContent
    }).then(movie => {
        res.send({ message: "Movie was added successfully!" });
    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: err.message });
    });
}

exports.watchedMovie = (req, res, next) => {
    console.log(req.body);
    WatchedMovie.create({
        UserId: req.body.userId,
        MovieId: req.body.movieId
    }).then(watchedmovie => {
        next();
    }).catch(err => {
        res.send({ message: err.message });
    });
}

exports.moviePath = (req, res) => {
    console.log(req.params.id);
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

exports.updateMovie = (req, res) => {
    console.log(req.body.movie);
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

exports.deleteMovie = (req, res) => {
    // console.log(req.body.id)
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

exports.listMovies = (req, res) => {
    // console.log(req.params)
    findAll({
        include: [{
            model: User,
            where: {
                id: req.params.userId
            }
        },
        { model: Category }
        ],

    }).then((movies) => {
        // console.log(movies)
        res.status(200).send(movies)
        return;
    }).catch(err => {
        res.status(500).send({ message: err.message });
        return;
    })
}




