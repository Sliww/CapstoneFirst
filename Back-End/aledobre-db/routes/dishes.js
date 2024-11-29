const express = require('express');
const dishes = express.Router();
const manageErrorMessage = require('../utilities/catchErrorsMessage');
const DishModel = require('../models/Dishmodel');

// GET ALL DISHES
dishes.get("/dishes", async (req, res, next) => {
    try {
        const allDishes = await DishModel.find();

        if (allDishes.length === 0) {
            return res
                .status(404)
                .json({
                    statusCode: 404,
                    message: "No dishes found"
                });
        }

        res
            .status(200)
            .json({
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
        res.status(201).json({
            statusCode: 201,
            message: "Dish created successfully",
            dish: savedDish
        });
    } catch (error) {
        next(error);
    }
});

dishes.use(manageErrorMessage);

module.exports = dishes;
