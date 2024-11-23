const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Il nome è obbligatorio.'],
        minLength: [2, 'Il nome deve contenere almeno 2 caratteri.'],
        maxLength: [20, 'Il nome non può superare i 20 caratteri.'],
        trim: true,
        match: [/^[A-Za-z\s]+$/, 'Il nome può contenere solo lettere e spazi.']
    },
    surname: {
        type: String,
        required: [true, 'Il cognome è obbligatorio.'],
        minLength: [2, 'Il cognome deve contenere almeno 2 caratteri.'],
        maxLength: [20, 'Il cognome non può superare i 20 caratteri.'],
        trim: true,
        match: [/^[A-Za-z\s]+$/, 'Il cognome può contenere solo lettere e spazi.']
    },
    email: {
        type: String,
        required: [true, 'L\'email è obbligatoria.'],
        unique: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'L\'email non è valida.']
    },
    telephone: {
        type: String,
        required: [true, 'Il numero di telefono è obbligatorio.'],
        unique: true,
        trim: true,
        match: [/^[0-9]{10}$/, 'Il numero di telefono deve contenere esattamente 10 cifre.']
    },
    password: {
        type: String,
        required: [true, 'La password è obbligatoria.'],
        minLength: [8, 'La password deve contenere almeno 8 caratteri.'],
        match: [
            /^(?=.*[A-Z])(?=.*[0-9])(?=.*[?!-_])[A-Za-z0-9?!-_]{8,}$/,
            'La password deve contenere almeno 8 caratteri, di cui almeno 1 lettera maiuscola, 1 numero e 1 carattere speciale (?!-_).'
        ],
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true,
        required: false,
    },
});

module.exports = mongoose.model('User', UserSchema);