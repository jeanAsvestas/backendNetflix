'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CastAndCrew extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      CastAndCrew.belongsToMany(models.Movie, { through: models.Direct });
      CastAndCrew.belongsToMany(models.Movie, { through: models.Play });
    }
  }
  CastAndCrew.init({
    fullName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CastAndCrew',
  });
  return CastAndCrew;
};