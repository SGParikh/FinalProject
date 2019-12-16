var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Services = require('../models/service')

/* GET home page. */
router.get('/', function(req, res, next) {
  Services.find({},(err,services)=>{
    let Massages = [];
    let Bodycare= [];
    services.forEach((item) => {
        if (item.type === 'Massage') {
          Massages.push(item);
        }
        else{
          Bodycare.push(item);
        }
    });
    res.render('services', { title: 'Spa Services',heading:"Services",user:req.user, services: Massages,Bodycare:Bodycare});
  })
});

module.exports = router;