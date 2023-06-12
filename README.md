Project was bootstrapped with Create Node App.

Available Scripts
In the project directory, you can run:

npm start (compier call npx tsx && node src/server.js)
Runs the app in the development mode.


Crawlimg Data from F1 https://www.formula1.com.
===============================================
Call function crawData() in file server.ts.

Application has 2 api.

GET('/search/:year/:type') 
=> This is a REST API that allows searching for contents by year, driver, team, race, etc., using the results of the crawling

ex: search driver.
    http://localhost:3000/search/2022/drivers;
    search teams;
    http://localhost:3000/search/2011/teams;
    search races;
    http://localhost:3000/search/2023/races;
=================================================================
GET('/seach/:year/:type/:detail) => API to allow searching using various conditions
ex: search result follow race.
    http://localhost:3000/search/2023/races/Bahrain
    yearly ranking of specific driver
    http://localhost:3000/search/2022/drivers/max-verstappen
     yearly ranking of specific team
    http://localhost:3000/search/2023/teams/alfa-romeo-ferrari


To learn React, check out the React documentation.