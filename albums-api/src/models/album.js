'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AlbumSchema = Schema({
  title: String,
  description: String
});

module.exports= mongoose.model('Album', AlbumSchema);
