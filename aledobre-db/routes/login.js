const express = require('express');
const login = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usersmodel = require('../models/Usersmodel');

login.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await Usersmodel.findOne({ email });
        if (!user) {
            return res
                .status(401)
                .json({
                    statusCode: 401,
                    message: 'Invalid credentials'
                });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({
                statusCode: 401,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({
            id: user._id,
            name: user.name,
            surname: user.surname,
            dob: user.dob,
            role: user.role,
            createdAt: user.createdAt
        }, process.env.JWT_SECRET, {
            expiresIn: "20m"
        });

        res.header("Authorization", token)
            .status(200)
            .json({
                statusCode: 200,
                message: "Logged in successfully",
                token
            });

        

    } catch (error) {
        next(error);
    }
});

module.exports = login;