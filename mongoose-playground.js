const mongoose = require("mongoose");

const Pizza = require("./models/Pizza.model")


mongoose.connect("mongodb://127.0.0.1:27017/iron-restaurant")
    .then((response) => {
        console.log(`Connected! Database Name: "${response.connections[0].name}"`);

        // create a new pizza
        const newPizza = {
            title: "veggie",
            price: 22,
            isVeggie: true,
            ingredients: ["tomato", "mozzarella", "basil"],
            dough: "thin"
        }
        
        return Pizza.create(newPizza)
    })
    .then( pizzaFromDB => {
        console.log("Pizza created!")
        
        // get list of pizzas from DB
        return Pizza.find();
    })
    .then( pizzasArr => {
        // console.log(pizzasArr);
        console.log(`Number of pizzas in our DB: ${pizzasArr.length}`);
    })
    .catch((err) => console.error("Error connecting to DB", err));


