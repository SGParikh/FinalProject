var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var gallerySchema = new Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    imagePath:String,
    title:String
});

module.exports = mongoose.model('galleries',gallerySchema)