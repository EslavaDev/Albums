'use strict'

let express = require('express');
const {AlbumController} = require('../controllers/AlbumController');
const albumController = new AlbumController();
const album = express.Router();

album.get('/album/:id', albumController.getAlbum);
album.get('/albums', albumController.getAlbums);
album.post('/album', albumController.saveAlbum);
album.put('/album/:id', albumController.updateAlbum);
album.delete('/album/:id', albumController.removeAlbum);

module.exports = album;
