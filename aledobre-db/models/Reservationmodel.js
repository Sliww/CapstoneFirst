const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true
    },
    date: {
        type: Date, required: true
    },
    location: {
        type: String, required: true
    },
    peopleCount: {
        type: Number, required: true
    },
    menuType: {
        type: String,
        required: true,
        enum: ['full', 'extended', 'basic', 'minimal']
    },
    selectedDishes: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'DishModel', required: true }
    ],
    specialRequests: { type: 
        String 
    },
    intolerances: { 
        type: String 
    }
},
    {
        timestamps: true,
        strict: true
    });

module.exports = mongoose.model('Reservation', ReservationSchema, 'reservations');