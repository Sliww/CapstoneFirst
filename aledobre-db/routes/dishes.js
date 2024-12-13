const express = require('express');
const dishes = express.Router();
const DishModel = require('../models/Dishmodel');
const cloudStorage = require('../middleware/uploadOnCloudImg/cloudStorage')

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

dishes.post("/dishes/create", cloudStorage.single('img'), async (req, res, next) => {
    try {
        const dishData = req.body;
        if (req.file) {
            dishData.img = req.file.path;
        }

        const newDish = new DishModel(dishData);
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

dishes.put("/dishes/update/:id", cloudStorage.single('img'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        if (req.file) {
            updateData.img = req.file.path;
        }

        if (typeof updateData.allergens === 'string') {
            updateData.allergens = JSON.parse(updateData.allergens);
        }

        const updatedDish = await DishModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedDish) {
            return res.status(404).json({
                statusCode: 404,
                message: "Dish not found"
            });
        }

        res.status(200).json({
            statusCode: 200,
            message: "Dish updated successfully",
            updatedDish
        });
    } catch (error) {
        next(error);
    }
});

module.exports = dishes;
