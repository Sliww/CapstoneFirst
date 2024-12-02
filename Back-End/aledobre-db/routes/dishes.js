const express = require('express');
const dishes = express.Router();
//const manageErrorMessage = require('../utilities/catchErrorsMessage');
const DishModel = require('../models/Dishmodel');


dishes.get("/dishes/test", (req, res) => {
    console.log("Richiesta GET ricevuta per /dishes/test");
    res.status(200).json({ message: "Test di risposta funzionante" });
});
// GET ALL DISHES
dishes.get("/dishes", async (req, res) => {
    try {
        const allDishes = await DishModel.find();

        if (allDishes.length === 0) {
            return res.status(404).json({
                statusCode: 404,
                message: "No dishes found"
            });
        }

        res.status(200).json({
            statusCode: 200,
            message: "Dishes retrieved successfully",
            allDishes
        });
    } catch (error) {
        console.error("Error retrieving dishes:", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Something went wrong"
        });
    }
});

// CREATE DISH
dishes.post("/dishes/create", async (req, res) => {
    try {
        const newDish = new DishModel();
        const savedDish = await newDish.save();

        res.status(201).send({
            statusCode: 201,
            message: "Dish created successfully",
            savedDish
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            statusCode: 500,
            message: 'Opss...something went wrong'
        });
    }
});

// DELETE DISH
dishes.delete("/dishes/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDish = await DishModel.findByIdAndDelete(id);

        if (!deletedDish) {
            return res.status(404).json({
                statusCode: 404,
                message: "Dish not found"
            });
        }

        return res.status(200).json({
            statusCode: 200,
            message: "Dish deleted successfully",
            dish: deletedDish
        });
    } catch (error) {
        console.error("Error deleting dish:", error);
        return res.status(500).json({
            statusCode: 500,
            message: "Qualcosa è andato storto."
        });
    }
});

//dishes.use(manageErrorMessage);

module.exports = dishes;
