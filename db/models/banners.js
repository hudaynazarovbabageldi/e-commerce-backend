'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Banners.init(
    {
      link: DataTypes.STRING,
      image_tm: DataTypes.STRING,
      image_ru: DataTypes.STRING,
      image_en: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Banners',
      tableName: 'banners',
    },
  );
  return Banners;
};
