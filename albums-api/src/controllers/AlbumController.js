'use strict';
let Album = require('../models/album');


class AlbumController{

  getAlbum(req,res){
    let albumId = req.params.id;
    Album.findById(albumId, (err, album)=>{
      if(err){
        res.status(500).send({message: 'Error en la peticion'});
      }else{
        if(!album){
          res.status(404).send({message: 'El album no existe'});
        }else{
          res.status(200).send({album});
        }
      }
    });
  }

  getAlbums(req,res){
    Album.find({}, (err, albums)=>{
      if(err){
        res.status(500).send({message: 'Error en la peticion'});
      }else{
        if(!albums){
          res.status(404).send({message: 'No hay albums!!'});
        }else{
          res.status(200).send({albums});
        }
      }
    });
  }

  saveAlbum(req, res){
    let album = new Album();
    let params = req.body;
    album.title = params.title;
    album.description = params.description;


    album.save((err, albumStored) =>{
      if(err){
        res.status(500
        ).send({message: 'Error al guardar album'});
      }else{
        if(!albumStored){
          res.status(404).send({message: 'El album ya existe'})
        }else{
          res.status(200).send({album: albumStored});
        }
      }
    });
  }

  updateAlbum(req,res){
    let albumId = req.params.id;
    let params = req.body;

    Album.findByIdAndUpdate(albumId, params, (err, albumUpdate) =>{
      if(err){
        res.status(500).send({message: 'error al actualizar el album'});
      }else{
        if(!albumUpdate){
          res.status(404).send({message: 'no se ha podido actualziar el album!!'});
        }else{
          res.status(200).send({album: albumUpdate});
        }
      }
    });
  }

  removeAlbum(req,res){
    let albumId = req.params.id;

    Album.findByIdAndRemove(albumId,(err, albumRemove) =>{
      if(err){
        res.status(500).send({message: 'error al eliminar el album'});
      }else{
        if(!albumRemove){
          res.status(404).send({message: 'no se ha podido eliminar el album!!'});
        }else{
          res.status(200).send({album: albumRemove});
        }
      }
    });
  }

}

module.exports.AlbumController = AlbumController;
