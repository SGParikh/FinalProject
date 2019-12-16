var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Gallery = require('../models/gallery')
var router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });


/* GET home page. */
router.get('/',function(req, res) {
  Gallery.find({},(err,galleries)=>{
    console.log(galleries);
    res.render('gallery', { title: 'Gallery',heading:"Gallery", Galleries: galleries,user:req.user});
  })
})


module.exports = router;