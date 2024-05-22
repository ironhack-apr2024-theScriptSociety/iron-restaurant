// require Express so we can use it in our app.
const express = require("express");
const logger = require('morgan');

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



// GET /pizzas
// GET /pizzas?maxPrice=xxx
app.get("/pizzas", (req, res, next) => {

    let {maxPrice} = req.query;
    maxPrice = parseInt(maxPrice); // convert maxPrice to a number

    // if maxPrice not provided, return the whole list
    if( isNaN(maxPrice) ){
        res.json(pizzasArr);
        return;
    }

    // if maxPrice is provided, get the pizzas that are less than or equal to maxPrice
    const filteredPizzas = pizzasArr.filter( element => element.price <= maxPrice );
    res.json(filteredPizzas);
});



// GET /pizzas/xxxx
app.get("/pizzas/:pizzaId", (req, res, next) => {
    
    //console.log(req.params);

    // let pizzaId = req.params.pizzaId;

    let {pizzaId} = req.params;

    pizzaId = parseInt(pizzaId); // convert pizzaId to a number 

    if( isNaN(pizzaId) ){
        res.status(400).json({message: "Invalid pizza id"});
        return; // finish current function
    }

    const result = pizzasArr.find( element => element.id === pizzaId )

    res.json(result);

});





// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`My first app listening on port ${PORT} `));
