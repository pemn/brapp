# brapp
Angular js app using a REST api for managing sport match guesses.  

# Details
Its a custom project and unlikely to be used as is, but should contain some useful structures that may be required by many apps.  
Its indended to be a complete example of a app that solves many common problems using simple yet effective methods.  
Uses unmodified php-crud-api library as a generic backend API for CRUD operations.  

# Features
 - HTML5 client using angular and bootstrap.
 - Extensive use of ngInclude directive and HTML5 routing. The html content is stored as partials, each with its own controller.
 - A API backend using the simple yet powerful library php-cru-api.
 - The apiphp module. A Custom angular $resource class tailored for php-cru-api.
 - Dynamic forms making full use of the RESTful API.
 - Nice charts using the angular module wrapping chart.js
 - Tables using ng-grid.
 - The ng-menu module. A Custom $provider class that generates a automatic navigation menu.
 - Crucial business logics implemented directly on the SQL database. This helps security and saves the neeed of a custom backend.
 
