// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server 
const express = require("express");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
//configure for data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Running Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
//port
const port = 8080;

//create server
const server = app.listen(port, listening);

// listening function
function listening() {
    console.log('server is running good');
    console.log(`run on localhost: ${port}`);
}


// posting data
/*const postingData = (request, response) {
    projectData = request.body;
    response.send(projectData);
    console.log(projectData);
};*/
app.post("/add", function (request, response) {
    projectData = request.body;
    response.send(projectData);
    console.log(projectData);
});


//getting data
/*const gettingData = (request, response) {
    response.send(projectData);
};*/
app.get("/all", function (request, response) {
    response.send(projectData);
});