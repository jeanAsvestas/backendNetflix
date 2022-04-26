'use strict';
const movieCategories = require('./movieCategories.json');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('MovieCategories',
            movieCategories.movieCategories
            
        )
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete('MovieCategories', null, {});
    }
}
