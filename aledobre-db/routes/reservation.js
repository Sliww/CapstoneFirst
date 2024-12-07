const express = require('express');
const reservation = express.Router();
const validateSelection = require('../middleware/validateSelection');
const ReservationModel = require('../models/Reservationmodel');
const UserModel = require('../models/Usersmodel');

reservation.post('/reservation/create', async (req, res) => {
    try {
        const { user, date, location, peopleCount, menuType, selectedDishes, intolerances, specialRequests } = req.body;

        const userData = await UserModel.findById(user);
        if (!userData.isLazioResident) {
            return res.status(403).json({ 
                error: "Solo i residenti nel Lazio possono effettuare prenotazioni online.",
                message: "Per prenotazioni da fuori regione, contattare direttamente: alessandro.dobre@example.com"
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
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = reservation;
