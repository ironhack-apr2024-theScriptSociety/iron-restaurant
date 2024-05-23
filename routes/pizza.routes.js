const router = require('express').Router();

const Pizza = require("../models/Pizza.model");


// GET /pizzas - get all pizzas
router.get("/pizzas", (req, res, next) => {
    Pizza.find()
        .populate("cook")
        .then( pizzaArr => {
            res.json(pizzaArr);
        })
        .catch((error) => {
            console.error("Error getting pizzas from DB...", error);
            res.status(500).json({ error: "Failed to get list of pizzas" });
        });
});


// GET /pizzas/:pizzaId - get details for one pizza
router.get("/pizzas/:pizzaId", (req, res, next) => {

    const {pizzaId } = req.params;

    Pizza.findById(pizzaId)
        .populate("cook")
        .then( pizzaFromDB => {
            res.json(pizzaFromDB);
        })
        .catch((error) => {
            console.error("Error getting pizzas details from DB...", error);
            res.status(500).json({ error: "Failed to get pizza details" });
        });
});


// POST /pizzas - create new pizza
router.post("/pizzas", (req, res, next) => {

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
router.put("/pizzas/:pizzaId", (req, res, next) => {
    
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


// DELETE /pizzas/:pizzaId - delete pizza
router.delete("/pizzas/:pizzaId", (req, res, next) => {
    
    const {pizzaId} = req.params;

    Pizza.findByIdAndDelete(pizzaId)
        .then( response => {
            console.log("Success, pizza deleted!", response);
            res.json(response);
        })
        .catch((error) => {
            console.error("Error deleting pizza...", error);
            res.status(500).json({ error: "Failed to delete a pizza" });
        });
});



module.exports = router;