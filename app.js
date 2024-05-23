// require Express so we can use it in our app.
const express = require("express");
const logger = require('morgan');
const mongoose = require('mongoose');


// Create an express server instance named `app`
// `app` is the Express server that will be handling requests and responses
const app = express();


//
// Configure middleware
//
app.use(logger('dev')); // Setup the request logger to run on each request
app.use(express.static('public')); // Make the static files inside of the `public/` folder publicly accessible
app.use(express.json()); // JSON middleware to parse incoming HTTP requests that contain JSON


// 
// Connect to DB
// 
mongoose.connect("mongodb://127.0.0.1:27017/iron-restaurant")
    .then((response) => {
        console.log(`Connected! Database Name: "${response.connections[0].name}"`);
    })
    .catch((err) => console.error("Error connecting to DB", err));



// 
// Mount routes
// 

app.use("/", require("./routes/pizza.routes"));
app.use("/", require("./routes/cook.routes"));



// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`My first app listening on port ${PORT} `));
