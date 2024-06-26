'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey:'owner'
      });
      this.hasMany(models.Request, {
        foreignKey: 'id_ingrediente'
      });
      this.hasMany(models.ShoppingCart, {
        foreignKey: 'id_ingredient'
      });
    }
  }
  Ingredient.init({
    name: DataTypes.STRING,
    expiration_date: DataTypes.DATE,
    weight: DataTypes.INTEGER,
    bought_date: DataTypes.DATE,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    owner: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ingredient',
  });
  return Ingredient;
};