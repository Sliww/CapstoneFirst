const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Il nome del piatto è obbligatorio.'],
    },
    ingredients: {
        type: [String],
        required: [true, 'Gli ingredienti sono obbligatori.'],
    },
    allergens: {
        type: [String],
        required: [true, 'Gli allergeni sono obbligatori.'],
    },
    img: {
        type: String,
        required: false,
        default: "https://placehold.co/600x400"
    },
    category: {
        type: String,
        enum: ['Zuppa', 'Antipasto', 'Primo', 'Secondo', 'Dolce'],
        required: [true, 'La categoria è obbligatoria.']
    }
},
{
    timestamps: true,
    strict: true
});

module.exports = mongoose.model('DishModel', DishSchema, 'dishes');
