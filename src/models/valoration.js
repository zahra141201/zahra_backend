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
      this.belongsTo(models.User, {
        foreignKey:'email_user'
      });
      this.belongsTo(models.User, {
        foreignKey:'made_by'
      });
    }
  }
  Valoration.init({
    comment: DataTypes.STRING,
    puntuation: DataTypes.INTEGER,
    email_user: DataTypes.STRING,
    made_by: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Valoration',
  });
  return Valoration;
};