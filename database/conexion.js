
const mongoose = require('mongoose');
require('dotenv').config();

//1. Creamos una variables para la URL de la conexión
const MONGOLOCAL = process.env.MONGO_URL_LOCAL;
const MONGOATLAS = process.env.MONGO_URL_ATLAS;

//2. Creamos la función de conexión
const conexion = mongoose.connect(MONGOATLAS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Conexión a la base de datos establecida con éxito');
    }).catch(err => console.log(err));


//3. Exportamos la conexión
module.exports = conexion;