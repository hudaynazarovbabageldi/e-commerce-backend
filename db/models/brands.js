'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Brands.init({
    name_tm: DataTypes.STRING,
    name_ru: DataTypes.STRING,
    name_en: DataTypes.STRING,
    image_tm: DataTypes.STRING,
    image_ru: DataTypes.STRING,
    image_en: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Brands',
  });
  return Brands;
};