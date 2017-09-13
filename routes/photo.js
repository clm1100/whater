var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('photo/list', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('photo/add', { title: 'Express' });
  
});

module.exports = router;
