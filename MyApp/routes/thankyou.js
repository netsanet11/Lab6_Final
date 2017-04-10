var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.body.name);
  res.render('thankyou', {title: 'Thank You Page', name: req.query.name});
});

module.exports = router;