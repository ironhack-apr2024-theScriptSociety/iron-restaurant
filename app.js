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



// Example middleware 1
app.use((req, res, next) => {
    console.log("middleware 1");
    next();
})

// Example middleware 2
app.use((req, res, next) => {
    console.log("middleware 2");
    next();
})




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
app.get("/pizzas", (req, res, next) => {
    res.json(pizzasArr);
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
