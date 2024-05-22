const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// create the Schema (pattern for all documents in this collection)
const pizzaSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        min: 1,
        max: 99
    },
    isVeggie: Boolean,
    ingredients: [String],
    imageFile: {
        type: String,
        default: 'default-image.png'
    },
    dough: {
        type: String,
        enum: ["thin", "extra thin", "with cheese", "with garlic"]
    },
    cook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cook"
    }
});


// create the Model
const Pizza = mongoose.model("Pizza", pizzaSchema);


module.exports = Pizza;
