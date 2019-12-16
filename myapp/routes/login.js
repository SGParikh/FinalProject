var express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport=require('passport');
var Users = require('../models/users')
var router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

var ensureNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('index', { title: 'Home' ,user:req.user});
  } else {
      next();
  }  
};

/* GET home page. */
router.get('/', ensureNotAuthenticated ,function (req, res, next) {
  res.render('login', { title: 'Login'});
});



router.post('/signin', ensureNotAuthenticated ,urlencodedParser, function (req, res,next) {
  passport.authenticate('local',{
    successRedirect:'/onlineBooking',
    failureRedirect:'/login',
    failureFlash:true
  })(req,res,next);
});

router.post('/logout',(req,res)=>{
  req.logOut();
  res.redirect('/');
})

module.exports = router;