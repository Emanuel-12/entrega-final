
//responde a la ruta /

const express = require('express');
const router = express.Router();

//Midelware que controla los datos que ingresan a la database
const { check } = require('express-validator');
const {
    adminIndex,
    userRegister,
    userFomLogin,
    userCreate,
    userLogin,
    userTable,
    irPeliculas,
    irSeries,
    irCategorias,

} = require('../controllers/adminController');

router.get('/', adminIndex);

router.get('/registro', userRegister);

router.get('/login', userFomLogin);

router.get('/usuarios', userTable);

router.get("/peliculas",irPeliculas);

router.get("/series", irSeries);

router.get("/categoria", irCategorias);

// router.get("/perfil", irPerfil );

router.post('/create',
    [
        check('nombre').isLength({min:4}),
        check('email').isEmail(),
        check('password').isLength({min:8})
    ]
    , userCreate);

router.post('/login',
    [
        check('email').isEmail(),
        check('password').isLength({min:8})
    ]
    ,userLogin);

module.exports = router;