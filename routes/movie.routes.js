var express = require('express');
var router = express.Router();
const db = require("../models/index");
const Movie = db.sequelize.models.Movie;
const controller = require('../controllers/movie.controller')
const contr = require('../controllers/plan.controller')
const authJWT = require('../middlewares/authJWT')

router.post('/add',
    authJWT.verifyToken,
    authJWT.isAdmin, 
    controller.addMovie
);


router.post('/watch/:id',
    authJWT.verifyToken,
    contr.readPlan,
    controller.watchedMovie,
    controller.moviePath
);
router.post('/edit/:id',
    authJWT.verifyToken,
    controller.moviePath
);

// Select all movies
router.post('/read',
    controller.readMovies
);
router.post('/readten',
    controller.getTenLastMovies
);


// Update a movie
router.post('/update',
    authJWT.verifyToken,
    authJWT.isAdmin,
    controller.updateMovie
);

// Delete a movie
router.post('/delete',
    authJWT.verifyToken,
    //authJWT.isAdmin,
    controller.deleteMovie
);

router.get('/list/:userId',
    authJWT.verifyToken,
    controller.listMovies
)




module.exports = router;
