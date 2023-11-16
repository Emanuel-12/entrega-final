
//1. Importamos la coleccion del users
const Users = require('../models/userModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');



const userRegister = (req, res) => {
    res.render('registro');
}

const userFomLogin = (req, res) => {
    res.render('login');
}

const userTable = (req, res) => {
    res.render('usuarios');
}

const userCreate = async (req, res) => {

    //Utilizamos la verificación de express-validator
    const errores = validationResult(req)

    const mensajeError = 'Datos Incorrectos';
    const mensajeErrorData = 'Error en la Database';
    const mensajeErrorUser = 'El Usuario ya Existe';
    
    //Si hay errores
    if(!errores.isEmpty()){
        console.log('Tenemos un error de validación');
        return res.render('error', {
            mensajeError
        });
    }
    
    //Recibimos los datos
    const { nombre, email, password } = req.body;

    //Testeamos los datos
    console.log(`1. Datos recibidos ${nombre} - ${email} - ${password}`);

    //Intentamos la conexión 
    try {
        
        //Verificamos si el usuario existe
        let usuarioNuevo = await Users.findOne({ email });
        console.log(`2. ${usuarioNuevo}`);

        if(usuarioNuevo){
            return res.render('error', {
                mensajeErrorUser
            })
        }

        //Creamos el usuario 
        usuarioNuevo = new Users(req.body);

        //Generamos la encriptación del password del usuario
        const salt = bcrypt.genSaltSync(10);
        console.log(`3. Salt: ${salt}`);

        //password del usuario
        console.log(`4. Password del user: ${usuarioNuevo.password}`);

        //Mezclamos la sal con el password del usuario
        usuarioNuevo.password = bcrypt.hashSync(password, salt);

        //Password con la sal de bcrypt
        console.log(`5. Password del user: ${usuarioNuevo.password}`);

        console.log(`6. Usuario Nuevo: ${usuarioNuevo}`);

        //Guardamos el usuario 
        await usuarioNuevo.save();

        return res.render('index', {
            nombre
        });
    

        
    } catch (error) {
        return res.render('error', {
            mensajeErrorData
        });
    }

    
}

const userLogin = async (req, res) => {


    const { email, password} = req.body;

    console.log(`1. Los datos son: ${email}, ${password}`);

    //Utilizamos la verificación de express-validator
    const errores = validationResult(req);

    const mensajeError = 'Email o Password incorrectos';
    const mensajeErrorData = 'Error en la Database';

        //Si hay errores
    if(!errores.isEmpty()){
        console.log('Tenemos un error de validación');
        return res.render('error', {
            mensajeError
        });
    }

    try{

        const usuarioLogin = await Users.findOne({ email });

        console.log(`2. Usuario Login: ${usuarioLogin}`);

        if(!usuarioLogin){
            return res.render('registro');
        }

        const validacionPass = bcrypt.compareSync(password, usuarioLogin.password);

        console.log(`3. Validación Pass: ${validacionPass}`);

        if(validacionPass){
            return res.render('admin')
        }

    }catch{

        return res.render('error', {
            mensajeErrorData
        });

    }
}
// el router lo que contiene seria por asi decirlo es el link y el controller es la accion que queres que haga esa ruta
const userIndex = (req, res) => {
    res.render('index');
}

const irPeliculas = (req, res) => {
    res.render('peliculas');
}

const irSeries = (req, res) => {
    res.render('series');
}

const irCategorias = (req, res) => {
    res.render('categoria');
}
const irPerfil = (req, res) => {
    res.render("perfil")
}


module.exports = {
    userIndex,
    userRegister,
    userFomLogin,
    userCreate,
    userLogin,
    userTable,
    irPeliculas,
    irCategorias,
    irSeries,
    irPerfil,
}