var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/home',{ });
});


router.get('/list', function(req, res, next) {
  res.render('index/index',{ });
});

module.exports = router;
