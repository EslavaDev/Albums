'use strict';

const Image = require('../models/imagen');
const Album = require('../models/album');
const path = require('path');
const fs = require('fs');

class ImagenController{

  getImagen(req,res){
    let imageId = req.params.id;

    Image.findById(imageId, (err,image) => {
      if(err){
        res.status(500).send({message: 'error en la peticion'});
      }else{
        if(!image){
            res.status(404).send({mesagge: 'No existe imagen'});
        }else{
          Album.populate(image, {path: 'album'}, (err, image) => {
            if(err){
              res.status(500).send({message: 'error en la peticion'});
            }else{
              res.status(200).send({image: image});
            }
          });
        }
      }
    });
  }

  getImages(req,res){
    let albumId = req.params.album;
    if(!albumId){
      //sacar todas las imagenes de base de datos
      var find=Image.find({}).sort('title');
    }else{
      //sacar todas las imagenes asociadas al album
      var find = Image.find({album: albumId}).sort('title');
    }
    find.exec((err, images) =>{
      if(err){
        res.status(500).send({message: 'error en la peticion'});
      }else{
        if(!images){
          res.status(404).send({mesagge: 'No hay imagenes en este album'});
        }else{
          Album.populate(images, {path: 'album'}, (err, images) => {
            if(err){
              res.status(500).send({message: 'error en la peticion'});
            }else{
              res.status(200).send({images});
            }
          });
        }
      }
    });
  }

  saveImagen(req,res){

    let image = new Image();
    let params = req.body;
    image.title = params.title;
    image.picture = null;
    image.album = params.album;

    image.save((err, imageStored) => {
      if(err){
        res.status(500).send({message: 'error en la peticion'});
      }else{
        if(!imageStored){
          res.status(404).send({mesagge: 'La imagen no se guardo!!'});
        }else{
          res.status(200).send({image: imageStored});
        }
      }
    });

  }

  updateImagen(req,res){
    let imageID = req.params.id;
    let update = req.body;

    Image.findByIdAndUpdate(imageID, update, (err, imageUpdate) =>{
      if(err){
        res.status(500).send({message: 'error en la peticion'});
      }else{
        if(!imageUpdate){
          res.status(404).send({mesagge: 'La imagen no se actualizo!!'});
        }else{
          res.status(200).send({image: imageUpdate});
        }
      }
    });
  }

  removeImagen(req,res){
    let imageId = req.params.id;

    Image.findByIdAndRemove(imageId,(err, imageRemove) =>{
      if(err){
        res.status(500).send({message: 'error al eliminar la imagen'});
      }else{
        if(!imageRemove){
          res.status(404).send({message: 'no se ha podido eliminar la imagen!!'});
        }else{
          res.status(200).send({image: imageRemove});
        }
      }
    });
  }

  uploadImagen(req,res){

    let imageId = req.params.id;
    let file_name = 'No subido...';

    if(req.files){
      let file_path = req.files.image.path;
      let file_split = file_path.split('\\');
      let file_name = file_split[2];

      Image.findByIdAndUpdate(imageId, {picture: file_name}, (err, imageUpdate) =>{
        if(err){
          res.status(500).send({message: 'error en la peticion'});
        }else{
          if(!imageUpdate){
            res.status(404).send({mesagge: 'La imagen no se actualizo!!'});
          }else{
            res.status(200).send({image: imageUpdate});
          }
        }
      });
    }else{
      res.status(200).send({message: 'no has subido ninguna imagen'});
    }
  }

  getImagenFile(req,res){
    let imageFile = req.params.imageFile;

    fs.exists('./src/uploads/'+imageFile, (exists)=>{
      if(!exists){
        res.status(200).send({message: 'no existe imagen'});
      }else{
        res.sendFile(path.resolve('./src/uploads/'+imageFile));
      }
    });
  }

}

module.exports.ImagenController = ImagenController;
