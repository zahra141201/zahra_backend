'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Ingredient, {
        foreignKey: 'owner'
      });
      this.hasMany(models.Request, {
        foreignKey: 'made_by'
      });
      this.hasMany(models.Valoration, {
        foreignKey: 'email_user'
      });
      this.hasMany(models.ShoppingCart, {
        foreignKey: 'email_cliente'
      })
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    telephone: DataTypes.INTEGER,
    member_since: DataTypes.DATE,
    address: DataTypes.STRING,
    description: DataTypes.STRING,
    is_admin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};