'use strict';
const categories = require('./categories.json');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Categories',
            categories.categories
            
        )
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
}
