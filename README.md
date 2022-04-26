# Getting Started with backend Netflix clone 

git clone the following repository: https://github.com/jeanAsvestas/backendNetflix.git

Execute:
    npm i

Setup a MySQL database and set its details in config/config.json under the development object.

Execute following commands to create the tables in the database:
    npx sequelize db:migrate or
    npx sequelize-cli db:migrate

Execute following commands to seed some starting data in the tables:
    npx sequelize db:seed --seed movie.js
    npx sequelize db:seed --seed categories.js
    npx sequelize db:seed --seed movieCategories.js

Execute following command:
    npm start

Runs the app in the development mode.
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.


(Requires frontend Netflix app to run in order to fetch data)

Download it here: https://github.com/jeanAsvestas/frontendNetflix.git