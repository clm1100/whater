var express 	= require('express');
var router 		= express.Router();
var path		= require('path');
var qiniuFn 	= require('../modules/qiuniu1.js')
var multer  	= require('multer')
var upload 		= multer({ dest: path.join(__dirname,'..','/public/m') })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('category/list', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('category/add', { title: 'Express' });
  
});


router.post('/add',upload.single('headurl'), function(req, res, next) {
	console.log(req.body);
	console.log(req.file);
  	res.send("ok");
});

module.exports = router;
