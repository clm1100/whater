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


router.get('/api/list', function(req, res, next) {
  // res.render('category/list', { title: 'Express' });
  categoryModel.find({}).populate({path: 'user', select: { _id: 1 ,username:1}}).exec(function(err,result){
  	if(!err){
  		res.json({
  			code:"200",
  			data:result
  		})
  	}else{
  		res.json({
  			code:"500",
  			msg:"错了"
  		})
  	}
  })
});



router.get('/api/delete/:id',(req, res)=>{
	let id = req.params.id;
	categoryDao.delete({_id:id},function(err){
		if(!err){
			res.json({code:200,msg:"ok"});
		}else{
			res.json({code:500,msg:"出错了"})
		}
	})
})










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

