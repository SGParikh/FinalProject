const LocalStrategy=require('passport-local').Strategy;
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Users = require('../models/users')

module.exports=function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done)=>{
            //match user name
            Users.findOne({email:email})
                .then(user=>{
                    if(!user)
                    {
                        return done(null,false,{message:"This email is not register"})
                    }
                    //match password
                    bcrypt.compare(password,user.password,(err,isMatch)=>{
                        if(err) throw err;

                        if(isMatch){
                            return done(null,user);
                        }
                        else
                        {
                            return done(null,false,{message:"Password incorrect"})
                        }
                    });
                })
                .catch(err=>console.log(err));

                
        })
    );

    passport.serializeUser((user, done) =>{
        console.log(user)
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) =>{
        console.log(id)
        
        Users.findById(id, function(err, user) {
          done(err, user);
        });
      });
}