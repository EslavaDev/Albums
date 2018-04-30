'use strict'

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

// cargar rutas
//let albumRoutes = require('./routes/albums');
const album = require('./src/routes/album');
const imagen = require('./src/routes/imagen');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//configurar cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Authorization, Content-Type, Access-Control-Request-Headers, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas base
app.use('/', album);
app.use('/', imagen);



module.exports = app;
