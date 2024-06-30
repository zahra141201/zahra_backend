'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey:'made_by'
      });
      this.belongsTo(models.Ingredient, {
        foreignKey:'id_ingrediente'
      });
    }
  }
  Request.init({
    pick_up_date: DataTypes.DATE,
    comment: DataTypes.STRING,
    state: DataTypes.STRING,
    made_by: DataTypes.STRING,
    id_ingrediente: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};