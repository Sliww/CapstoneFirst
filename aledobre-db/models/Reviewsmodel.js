const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    },
    rate: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookingModel"
    }
}, {
    timestamps: true,
    strict: true
});


module.exports = mongoose.model('ReviewModel', ReviewSchema, 'reviews');

