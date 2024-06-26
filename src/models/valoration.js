'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Valoration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Valoration.init({
    comment: DataTypes.STRING,
    puntuation: DataTypes.INTEGER,
    email_user: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Valoration',
  });
  return Valoration;
};