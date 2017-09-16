var express 	= require('express');
var router 		= express.Router();
var path		= require('path');
var qiniuFn 	= require('../modules/qiuniu1.js')
var multer  	= require('multer')
var upload 		= multer({ dest: path.join(__dirname,'..','/public/m') });
var categoryModel = require('../models/category.js').CategoryModel;
var categoryDao   = require('../models/category.js').Dao;
/* GET home page. */

var imgDomain = "http://oqsw5qjf9.bkt.clouddn.com/"
router.get('/', function(req, res, next) {
  res.render('category/list', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('category/add', { title: 'Express' });
  
});


router.post('/add',upload.single('headurl'), function(req, res, next) {
	var obj = req.body;
	console.log(req.file);
	var imgPath = req.file.path;
  	var imgName = req.file.filename+path.extname(req.file.originalname);
	 qiniuFn(imgPath,imgName,function(data){
	 	console.log("===================================");
	 	obj.headurl = imgDomain+data.key;
	 	// res.json(data);
	 	console.log(obj);
	 	categoryDao.create(obj,function(err,user){
	 		if(!err){
	 			res.json(user);
	 		}else{
	 			res.json(err);
	 		}
	 	})
	 });  	
});

module.exports = router;

