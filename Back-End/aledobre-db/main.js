const express = require('express');
const initDB = require('./dbConnection');
require('dotenv').config();

const PORT = 4012;

const server = express();

// ROUTES
const usersRoute = require('./routes/users');
const dishesRoute = require('./routes/dishes');

//Import MIDDLEWARE
const requestTimeMiddleware = require('./middleware/requestTime');
const manageErrorMessage = require('./utilities/catchErrorsMessage'); 




server.use(express.json());

// USE MIDDLEWARE
server.use(requestTimeMiddleware);

server.use('/', usersRoute);
server.use('/', dishesRoute);

server.use(manageErrorMessage);

initDB();

server.listen(PORT, ()=> console.log(`Server is up and running on PORT: ${PORT}`));


