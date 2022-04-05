'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsToMany(models.User, { through: models.WatchedMovie });
      Movie.belongsToMany(models.Category, { through: models.MovieCategory });
      Movie.belongsToMany(models.CastAndCrew, { through: models.Direct });
      Movie.belongsToMany(models.CastAndCrew, { through: models.Play });
    }
  }
  Movie.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    length: DataTypes.STRING,
    year: DataTypes.INTEGER,
    prodCountry: DataTypes.STRING,
    titleImage: DataTypes.STRING,
    trailerImage: DataTypes.STRING,
    mainImage: DataTypes.STRING,
    trailer: DataTypes.STRING,
    movieContent: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};