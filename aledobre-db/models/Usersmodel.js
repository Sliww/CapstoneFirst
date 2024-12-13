const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        minLength: [2, 'The name must contain at least 2 characters.'],
        maxLength: [20, 'The name cannot exceed 20 characters.'],
        trim: true,
        match: [/^[A-Za-z\s]+$/, 'The name can only contain letters and spaces.']
    },

    surname: {
        type: String,
        required: [true, 'Surname is required.'],
        minLength: [2, 'The surname must contain at least 2 characters.'],
        maxLength: [20, 'The surname cannot exceed 20 characters.'],
        trim: true,
        match: [/^[A-Za-z\s]+$/, 'The surname can only contain letters and spaces.']
    },

    dob: {
        type: Date,
        required: true,
    },

    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'The email is not valid.']
    },

    telephone: {
        type: String,
        required: [true, 'Telephone is required.'],
        unique: true,
        trim: true,
        match: [/^[0-9]{10}$/, 'The telephone number must contain exactly 10 digits.']
    },

    password: {
        type: String,
        required: [true, 'Password is required.'],
        minLength: [8, 'The password must contain at least 8 characters.'],
        match: [
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[?!-_])[A-Za-z0-9?!-_]{8,}$/,
            'The password must contain at least 8 characters, including at least 1 uppercase letter, 1 number, and 1 special character (?!-_).'
        ],
        trim: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    isLazioResident: {
        type: Boolean,
        required: true
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
},
    {
        timestamps: true,
        strict: true
    });

UserSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('UserModel', UserSchema, 'users');