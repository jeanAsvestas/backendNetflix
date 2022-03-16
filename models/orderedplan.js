'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderedPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderedPlan.init({
    // userId: DataTypes.INTEGER,
    // planId: DataTypes.INTEGER,
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    pricePaid: DataTypes.DOUBLE,
    expiresAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'OrderedPlan',
  });
  return OrderedPlan;
};