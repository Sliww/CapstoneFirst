const express = require('express');
const session = require('express-session');
const initDB = require('./dbConnection');
const cors = require('cors');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const PORT = process.env.PORT || 4012;

const server = express();

// ROUTES
const usersRoute = require('./routes/users');
const dishesRoute = require('./routes/dishes');
const loginRoute = require('./routes/login');
const reservationRoute = require('./routes/reservation');

//Import MIDDLEWARE
const requestTimeMiddleware = require('./middleware/requestTime');
const manageErrorMessage = require('./utilities/catchErrorsMessage'); 




server.use(express.json());
server.use(cors());

// USE MIDDLEWARE
server.use(requestTimeMiddleware);

server.use('/', usersRoute);
server.use('/', dishesRoute);
server.use('/', loginRoute);
server.use('/', reservationRoute);

server.use(manageErrorMessage);

server.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URI,
        ttl: 24 * 60 * 60
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }
}));

initDB();

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is up and running on PORT: ${PORT}`);
});


