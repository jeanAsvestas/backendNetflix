'use strict';
const movies = require('./movies.json');

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Movies',
            movies.movies
            // [{
            //     id: "1",
            //     title: "No Time to Die",
            //     description: "James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.",
            //     length: "2h 43m",
            //     year: 2021,
            //     prodCountry: "UK",
            //     titleImage: "",
            //     trailerImage: "",
            //     mainImage: "",
            //     trailer: "BIhNsAtPbPI",
            //     movieContent: "BIhNsAtPbPI",
            //     createdAt: "20220404100510",
            //     updatedAt: "20220404100510"
            // }]
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


