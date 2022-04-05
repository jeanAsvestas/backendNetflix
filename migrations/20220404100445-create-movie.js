'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      length: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      prodCountry: {
        type: Sequelize.STRING
      },
      titleImage: {
        type: Sequelize.STRING
      },
      trailerImage: {
        type: Sequelize.STRING
      },
      mainImage: {
        type: Sequelize.STRING
      },
      trailer: {
        type: Sequelize.STRING
      },
      movieContent: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};