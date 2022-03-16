var express = require('express');
var router = express.Router();
const db = require("../models/index");
const Movie = db.sequelize.models.Movie;
const controller = require('../controllers/movie.controller')
const contr = require('../controllers/plan.controller')
const authJWT = require('../middlewares/authJWT')


//not for api use
router.get('/add', function (req, res) {
    res.render('movie', {
        id: req.query.id
    });
});

router.post('/add',
    //authJWT.verifyToken,
    //authJWT.isAdmin, 
    controller.addMovie
);

//not for api use
router.get('/watch', async function (req, res) {
    let movies = await Movie.findAll();
    res.render('watchmovie', {
        list: movies
    })
});
router.post('/watch',
    authJWT.verifyToken,
    contr.readPlan,
    controller.watchedMovie,
    controller.moviePath
);


router.post('/read',
    //authJWT.verifyToken,
    controller.readMovies
);

router.post('/update',
    //authJWT.verifyToken,
    //authJWT.isAdmin,
    controller.updateMovie
);

router.post('/delete',
    //authJWT.verifyToken,
    //authJWT.isAdmin,
    controller.deleteMovie
);




module.exports = router;
