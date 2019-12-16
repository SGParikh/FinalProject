var express = require('express');
var nodeMailer = require('nodemailer');
var bodyParser = require('body-parser');
var router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('contact', { title: 'Contact US' ,user:req.user});
});

router.post('/submit', urlencodedParser, function (req, res) {

  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: '',
      pass: ''
    }
  });
  let mailOptions = {
    from: req.body.email, // sender address
    to: '<tt701058@gmail.com>', // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.body, // plain text body
    html: '<b>Hi Relish,</b><br/>' + req.body.message + '</br> Regards,<br/>' + req.body.name
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.redirect('/contact')
  });

  res.redirect('/contact')
});

module.exports = router;