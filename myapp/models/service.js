var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var serviceSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    imagePath:String,
    type:String,
    subType:String,
    title:String,
    description:String,
    price60:Number,
    price90:Number,
    Length:String,
    Typeofmassage:String,
    Technique:String,
    Benifits:String,
    desc1:String,
    desc2:String,
    popup:String,
});

module.exports = mongoose.model('services',serviceSchema)