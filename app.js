// require Express so we can use it in our app.
const express = require("express");
const logger = require('morgan');
const mongoose = require('mongoose');

const Pizza = require("./models/Pizza.model");
const pizzasArr = require("./data/pizzas-data.json");

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



// GET /
app.get("/", (req, res, next) => {
    // res.send()
    // res.json()
    res.sendFile(__dirname + '/views/home-page.html');
})



// GET /contact
app.get("/contact", (req, res, next) => {
    res.sendFile(__dirname + '/views/contact-page.html');
});



// GET /pizzas - get all pizzas
app.get("/pizzas", (req, res, next) => {
    Pizza.find()
        .then( pizzaArr => {
            res.json(pizzaArr);
        })
        .catch((error) => {
            console.error("Error getting pizzas from DB...", error);
            res.status(500).json({ error: "Failed to get list of pizzas" });
        });
});


// GET /pizzas/:pizzaId - get details for one pizza
app.get("/pizzas/:pizzaId", (req, res, next) => {

    const {pizzaId } = req.params;

    Pizza.findById(pizzaId)
        .then( pizzaFromDB => {
            res.json(pizzaFromDB);
        })
        .catch((error) => {
            console.error("Error getting pizzas details from DB...", error);
            res.status(500).json({ error: "Failed to get pizza details" });
        });
});



// POST /pizzas - create new pizza
app.post("/pizzas", (req, res, next) => {

    const pizzaDetails = req.body;
    
    Pizza.create(pizzaDetails)
        .then((pizzaFromDB) => {
            console.log("Success, pizza created!", pizzaFromDB);
            res.status(201).json(pizzaFromDB);
        })
        .catch((error) => {
            console.error("Error creating a new pizza...", error);
            res.status(500).json({ error: "Failed to create a new pizza" });
        });
})



// PUT /pizzas/:pizzaId - update pizza
app.put("/pizzas/:pizzaId", (req, res, next) => {
    
    const {pizzaId} = req.params;
    const newDetails = req.body;

    // Model.findByIdAndUpdate(id, update [, options])

    Pizza.findByIdAndUpdate(pizzaId, newDetails, { new: true })
        .then( pizzaFromDB => {
            console.log("Success, pizza updated!", pizzaFromDB);
            res.json(pizzaFromDB);
        })
        .catch((error) => {
            console.error("Error updating pizza...", error);
            res.status(500).json({ error: "Failed to update a pizza" });
        });
});



// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`My first app listening on port ${PORT} `));
