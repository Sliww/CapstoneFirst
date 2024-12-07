const express = require('express');
const dishes = express.Router();
const DishModel = require('../models/Dishmodel');

// GET ALL DISHES
dishes.get("/dishes", async (req, res, next) => {
    try {
        const allDishes = await DishModel.find();
        console.log(allDishes);

        res.status(200).send({
            statusCode: 200,
            message: "Dishes retrieved successfully",
            allDishes
        });
    } catch (error) {
        next(error);
    }
});

// CREATE DISH
dishes.post("/dishes/create", async (req, res, next) => {
    try {
        const newDish = new DishModel(req.body);
        const savedDish = await newDish.save();

        res.status(201).send({
            statusCode: 201,
            message: "Dish created successfully",
            savedDish
        });
    } catch (error) {
        next(error);
    }
});

// DELETE DISH
dishes.delete("/dishes/delete/:id", async (req, res, next) => {
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
        next(error);
    }
});



module.exports = dishes;
