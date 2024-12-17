const express = require('express');
const users = express.Router();
const UserModel = require('../models/Usersmodel');
const bcrypt = require('bcrypt');
const verifyToken = require('../middleware/verifyToken');
const jwt = require('jsonwebtoken');


users.get("/users", async (req, res, next) => {
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
        next(error);
    }
});

users.get('/users/me', verifyToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                message: "Utente non trovato"
            });
        }

        res.status(200).json({
            user: user
        });
    } catch (error) {
        next(error);
    }
});

users.post('/user/create', async (req, res, next) => {
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
        next(error);
    }
});

users.delete('/user/delete/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                statusCode: 404,
                message: "User not found"
            });
        }
        res.status(200).json({
            statusCode: 200,
            message: "User deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});

users.put('/user/update/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, surname, email, telephone, dob, password, isLazioResident } = req.body;

    try {
        
        const updateFields = {};

        if (name) {
            updateFields.name = name;
        }
        if (surname) {
            updateFields.surname = surname;
        }
        if (email) {
            updateFields.email = email;
        }
        if (telephone) {
            updateFields.telephone = telephone;
        }
        if (dob) {
            updateFields.dob = dob;
        }
        if (isLazioResident !== undefined) {
            updateFields.isLazioResident = isLazioResident;
        }
        if (password) {
            
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, updateFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                statusCode: 404,
                message: "User not found"
            });
        }

        res.status(200).json({
            statusCode: 200,
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        next(error);
    }
});

users.patch('/users/update', async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            statusCode: 200,
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        next(error);
    }
});



module.exports = users;