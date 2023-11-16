const express = require('express');
//const app = express();
const app = require('express')();

//const dotenv = require('dotenv');
//dotenv.config();
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const hbs = require('hbs');
const userRouter = require('./router/userRouter');
const morgan = require('morgan');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
const adminRouter =require("./router/adminRouter")
//Configuramos el motor de plantillas de Handlebars
app.set('view engine', 'hbs');

//Seteamos el path del directorio de las vistas
app.set('views', path.join(__dirname, '/views'));

//Seteamos el path del directorio de los parciales
hbs.registerPartials(path.join(__dirname, '/views/partials'));

//app.use('/user', require('./routes/userRouter'));
app.use('/user', userRouter);  //esto seria la ruta principal de user
app.use("/admin", adminRouter);

//exportamos la app para que el server.js levante la aplicación
module.exports = app;