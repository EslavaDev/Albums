'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ImageSchema = Schema({
  title: String,
  picture: String,
  album: {type: Schema.ObjectId, ref:'Album'}
});

module.exports= mongoose.model('Image', ImageSchema);
