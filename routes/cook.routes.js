const router = require('express').Router();

const Cook = require("../models/Cook.model");


// POST /cooks - create new Cook
router.post("/cooks", (req, res, next) => {
    
    const cookDetails = req.body;

    Cook.create(cookDetails)
        .then((cookFromDB) => {
            console.log("Success, cook created!", cookFromDB);
            res.status(201).json(cookFromDB);
        })
        .catch((error) => {
            console.error("Error creating a new cook...", error);
            res.status(500).json({ error: "Failed to create a new cook" });
        });
})


module.exports = router;