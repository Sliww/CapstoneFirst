const express = require('express');
const reservation = express.Router();
const validateSelection = require('../middleware/validateSelection');
const ReservationModel = require('../models/Reservationmodel');
const UserModel = require('../models/Usersmodel');

reservation.post('/reservation/create', async (req, res, next) => {
    try {
        const { user, date, location, peopleCount, menuType, selectedDishes, intolerances, specialRequests } = req.body;

        const userData = await UserModel.findById(user);
        if (!userData.isLazioResident) {
            return res.status(403).json({ 
                error: "Only residents of Lazio can make online reservations.",
                message: "For reservations from outside the region, please contact directly: aledobre@info.com"
            });
        }

        const requestedDate = new Date(date);
        const existingReservation = await ReservationModel.findOne({
            date: {
                $gte: new Date(requestedDate.setHours(0, 0, 0)),
                $lt: new Date(requestedDate.setHours(23, 59, 59))
            }
        });

        if (existingReservation) {
            return res.status(400).json({
                error: "Date not available",
                message: "Reservation already exists for this date. Please choose another date."
            });
        }

        const errors = validateSelection(selectedDishes, menuType);
        if (errors.length > 0) return res.status(400).json({ errors });

        const newReservation = new ReservationModel({
            user,
            date: new Date(date),
            location,
            peopleCount,
            menuType,
            selectedDishes: Object.values(selectedDishes).flat(),
            specialRequests,
            intolerances
        });

        const savedReservation = await newReservation.save();
        
        const populatedReservation = await ReservationModel
            .findById(savedReservation._id)
            .populate('user')
            .populate('selectedDishes');

        res.status(201).json(populatedReservation);
    } catch (error) {
        next(error);
    }
});

reservation.get('/reservations', async (req, res, next) => {
    try {
        const reservations = await ReservationModel
            .find()
            .populate('user', 'name surname email telephone')
            .populate('selectedDishes', 'name category price')
            .sort({ date: -1 });

        res.status(200).json({
            statusCode: 200,
            totalReservations: reservations.length,
            reservations: reservations
        });
    } catch (error) {
        next(error);
    }
});

reservation.get('/reservations/date/:date', async (req, res, next) => {
    try {
        const date = new Date(req.params.date);
        const reservations = await ReservationModel
            .find({
                date: {
                    $gte: new Date(date.setHours(0,0,0)),
                    $lt: new Date(date.setHours(23,59,59))
                }
            })
            .populate('user', 'name surname email')
            .populate('selectedDishes', 'name category price')
            .sort({ date: 1 });

        res.status(200).json({
            statusCode: 200,
            totalReservations: reservations.length,
            reservations: reservations
        });
    } catch (error) {
        next(error);
    }
});

reservation.get('/reservations/user/:userId', async (req, res, next) => {
    try {
        const reservations = await ReservationModel
            .find({ user: req.params.userId })
            .populate('user', 'name surname email')
            .populate('selectedDishes', 'name category price')
            .sort({ date: -1 });

        res.status(200).json({
            statusCode: 200,
            totalReservations: reservations.length,
            reservations: reservations
        });
    } catch (error) {
        next(error);
    }
});

reservation.delete('/reservations/:id', async (req, res, next) => {
    try {
        const deletedReservation = await ReservationModel.findByIdAndDelete(req.params.id);
        
        if (!deletedReservation) {
            return res.status(404).json({
                statusCode: 404,
                message: "Reservation not found"
            });
        }

        res.status(200).json({
            statusCode: 200,
            message: "Reservation deleted successfully",
            deletedReservation
        });
    } catch (error) {
        next(error);
    }
});

module.exports = reservation;
