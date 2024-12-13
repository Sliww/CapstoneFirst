const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: ['Full', 'Extended', 'Basic', 'Minimal'],
        required: [true, 'The menu type is required.']
    },
    description: {
        type: String,
        required: [true, 'The menu description is required.']
    },
    priceRanges: [{
        minPeople: { type: Number, required: true },
        maxPeople: { type: Number, required: true },
        pricePerPerson: { type: Number, required: true }
    }],
    selectionRules: {
        soup: { type: Number, default: 0 },
        appetizer: { type: Number, default: 0 },
        firstCourse: { type: Number, default: 0 },
        secondCourse: { type: Number, default: 0 },
        dessert: { type: Number, default: 0 }
    }
}, {
    timestamps: true,
    strict: true
});

const Menu = mongoose.model('Menu', MenuSchema);
module.exports = Menu;
