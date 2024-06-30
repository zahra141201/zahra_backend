'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey:'email_cliente'
      });
      this.belongsTo(models.Ingredient, {
        foreignKey:'id_ingredient'
      });
    }
  }
  ShoppingCart.init({
    email_cliente: DataTypes.STRING,
    id_ingredient: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ShoppingCart',
  });
  return ShoppingCart;
};