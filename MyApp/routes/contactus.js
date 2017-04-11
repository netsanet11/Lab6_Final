var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var router = express.Router();
var csrf = require('csurf');

var urlEncodedParser = bodyParser.urlencoded();
var csrfProtection = csrf({cookie: true});
/* GET home page. */
router.get('/', csrfProtection, function(req, res, next) {
    console.log("Get token: " + req.csrfToken());
    res.render('contactus', { title: 'Contact Us', _csrf: req.csrfToken() });
});

router.post('/', urlEncodedParser, csrfProtection,  function(req, res, next) {
    console.log(req.body.fullName);
      console.log("Post Token " + req._csrf);       
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
        res.end();
});

module.exports = router;
