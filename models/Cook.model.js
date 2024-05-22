const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// create the Schema (pattern for all documents in this collection)
const cookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location: String,
    bio: String,
});


// create the Model
const Cook = mongoose.model("Cook", cookSchema);


module.exports = Cook;

