const express = require('express');
const users = express.Router();
const UserModel = require('../models/Usersmodel');


// GET ALL USERS
users.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find();

        if (users.length === 0) {
            return res
                .status(404)
                .json({
                    statusCode: 404,
                    message: "No users found"
                });
        }

        res
            .status(200)
            .json({
                statusCode: 200,
                users
            });
    } catch (error) {
        res
            .status(500)
            .json({
                statusCode: 500,
                message: 'Opss...something went wrong'
            });
    }
});

// GET USER BY ID da definire ancora Bookings
users.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id).populate('bookings');
        
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                message: "Utente non trovato"
            });
        }
        
        res.status(200).json({
            statusCode: 200,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: 'Opss...qualcosa è andato storto'
        });
    }
});

// CREATE USER
users.post('/users/create', async (req, res) => {
    try {
        const newUser = new UserModel(req.body);
        const user = await newUser.save();

        res
            .status(201)
            .json({
                statusCode: 201,
                message: "User created successfully",
                user
            });
    } catch (error) {
        res
            .status(500)
            .json({
                statusCode: 500,
                message: 'Opss...something went wrong'
            });
    }
})



module.exports = users;