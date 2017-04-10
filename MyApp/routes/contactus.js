var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var router = express.Router();

var urlEncodedParser = bodyParser.urlencoded();
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req._csrf);
    console.log(req.csrftoken);
  res.render('contactus', { title: 'Contact Us' });
});

router.post('/', urlEncodedParser,  function(req, res, next) {
    console.log(req.body.fullName);
    req.assert('fullName', 'Name is reqired').notEmpty();
    req.assert('message', 'Message is reqired').notEmpty();

    var errors = req.validationErrors();
    if(!errors){
      return next();
    }
    else{
         res.render('contactus', { title: 'Contact Us' });
    }
}, function(req, res, next){   
    const dataTowrite = `[Name: ` + req.body.fullName + `, Type: ` + req.body.type + `, Message: ` + req.body.message + `, Ip-Address ` + req.ip + `]`;
      fs.writeFileSync(__dirname +'contact.txt', dataTowrite, function(err, data){
            console.log(err);
            console.log('saving data failed');
      } );
        res.redirect('/thankyou?name=' + req.body.fullName);
});

module.exports = router;