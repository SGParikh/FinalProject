var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var Gallery = require('../models/gallery')
var router = express.Router();



/* GET home page. */
router.get('/:id',function(req, res) {
    var id=req.params.id;
  Gallery.findById(req.params.id,(err,gallery)=>{
    console.log(gallery);
    if(err){
      res.redirect('/galleryMT');
    }
    //res.render('galleryEdit', { title: 'Edit Gallery',heading:"Edit Gallery", gallery: gallery,user:req.user});
    res.redirect('/galleryMT');
  })
})

module.exports = router;