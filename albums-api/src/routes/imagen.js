'use strict'

let express = require('express');
const {ImagenController} = require('../controllers/ImagenController');
const imagenController = new ImagenController();
const imagen = express.Router();

let multipart = require('connect-multiparty');
let multipartMiddleware = multipart({uploadDir: './src/uploads'});

imagen.get('/image/:id', imagenController.getImagen);
imagen.get('/images/:id?', imagenController.getImages);
imagen.post('/image', imagenController.saveImagen);
imagen.put('/image/:id', imagenController.updateImagen);
imagen.delete('/image/:id', imagenController.removeImagen);
imagen.post('/upload/:id', multipartMiddleware, imagenController.uploadImagen);
imagen.get('/getImage/:imageFile', multipartMiddleware, imagenController.getImagenFile);


module.exports = imagen;
