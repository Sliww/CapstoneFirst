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
                .send({
                    statusCode: 404,
                    message: "No users found"
                });
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                users
            });
    } catch (error) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: 'Opss...something went wrong'
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
            .send({
                statusCode: 201,
                message: "User created successfully",
                user
            });
    } catch (error) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: 'Opss...something went wrong'
            });
    }
})



module.exports = users;