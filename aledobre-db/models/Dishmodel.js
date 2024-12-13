const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The dish name is required.'],
    },
    ingredients: {
        type: String,
        required: [true, 'Ingredients are required.'],
    },
    allergens: {
        type: [String],
        required: [true, 'Allergens are required.'],
    },
    img: {
        type: String,
        required: false
    },
    category: {
        type: String,
        enum: ['Zuppa', 'Antipasto', 'Primo', 'Secondo', 'Dolce'],
        required: [true, 'The category is required.']
    }
},
{
    timestamps: true,
    strict: true
});

module.exports = mongoose.model('DishModel', DishSchema, 'dishes');
