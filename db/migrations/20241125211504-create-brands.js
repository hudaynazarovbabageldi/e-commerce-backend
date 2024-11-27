'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('brands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name_tm: {
        type: Sequelize.STRING,
      },
      name_ru: {
        type: Sequelize.STRING,
      },
      name_en: {
        type: Sequelize.STRING,
      },
      image_tm: {
        type: Sequelize.STRING,
      },
      image_ru: {
        type: Sequelize.STRING,
      },
      image_en: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Brands');
  },
};
