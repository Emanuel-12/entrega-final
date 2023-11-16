const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// Esquema de la colección / configuración
//db.createCollections('users')
const userShema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('users', userShema);
//db.users.insertOne({nombre: "Pepe", email: "pepe@gmail.com", password: "password"})
//db.users.insertOne({apellido: "Pepe"}) error