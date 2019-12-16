var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();

var ensureAuthenticated = (req, res, next) => {

  if (req.isAuthenticated()) {
      res.render('onlineBooking', { title: 'Online Booking',user:req.user });
  } else {
      next();
  }  
 
};

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res) {
 res.redirect('/login')
});



module.exports = router;