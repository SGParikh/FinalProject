var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
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
router.get('/',ensureNotAuthenticated ,function (req, res, next) {
    res.render('register', { title: 'Register'});
  });

  
router.post('/register',ensureNotAuthenticated, urlencodedParser, function (req, res) {
    const{firstName,lastName,email,password,cpassword}=req.body;
    let errors=[];
    //check required fields
    if(!firstName || !lastName || !email || !password || !cpassword)
    {
      errors.push({msg:"Please fill all in fields."})
    }
    if(password !== cpassword)
    {
      errors.push({msg:"Password do not match."})
    }
    if(password < 4)
    {
      errors.push({msg:"Password should be at least 4 characters"})
    }

    if(errors.length > 0)
    {
      res.render('register',{
        errors,firstName,lastName,email,password,cpassword
      });
    }
    else
    {
      //validation passed
      Users.findOne({email:req.body.email})
        .then(user=>{
          if(user)
          {
            errors.push({msg:"Email is already registered"})
            res.render('register',{
              errors,firstName,lastName,email,password,cpassword
            });
          }
          else
          {
            //create user
            let newuser=new Users({
              _id:new mongoose.Types.ObjectId().toHexString(),
              firstName:req.body.firstName,
              lastName:req.body.lastName,
              email: req.body.email,
              password: req.body.password
            });
            //Hash password
            bcrypt.genSalt(10,(err,salt)=>bcrypt.hash(newuser.password,salt,(err,hash)=>{
              if(err) throw err;
              //set password hash
              newuser.password=hash;
              //create user
              newuser.save(function(errors,result) {
                if (errors) 
                {
                  errors.push({msg:errors.errors})
                  res.render('register',{
                    errors,firstName,lastName,email,password,cpassword
                  });
                }
                else
                {
                  req.flash('success_msg','You are now registered and can log in')
                  res.redirect('/login');
                }
              });
            }))
         
          }
      });
    }
});

module.exports = router;