'use strict';
const movies = require('./movies.json');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Movies',
            movies.movies
            
        )
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete('Movies', null, {});
    }
}


