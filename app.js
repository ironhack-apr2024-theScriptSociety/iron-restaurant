// require Express so we can use it in our app.
const express = require("express");
const logger = require('morgan');


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

    const pizzasArr = [
        {
          title: 'Pizza Margarita',
          price: 12,
          imageFile: 'pizza-margarita.jpg',
        },
        {
            title: "Veggie Pizza",
            price: 15,
            imageFile: "pizza-veggie.jpg"
        }, 
        {
            title: "Seafood Pizza",
            imageFile: "pizza-seafood.jpg"
        }
    ];

    res.json(pizzasArr);

});



// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`My first app listening on port ${PORT} `));
