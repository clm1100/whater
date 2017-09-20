var express = require('express');
var router = express.Router();
var _ = require('lodash');
var path  = require('path');
var qiniuFn 	= require('../modules/qiuniu1.js')
var multer  	= require('multer')
var upload 		= multer({ dest: path.join(__dirname,'..','/public/m') });
var UserModel = require('../models/user').UserModel;
var UserDao = require('../models/user').Dao;
var imgDomain = "http://oqsw5qjf9.bkt.clouddn.com/"

router.get('/', function(req, res, next) {

	res.render('user/list',{})
});



router.get('/add', function(req, res, next) {

	res.render('user/add',{})
});

router.get('/api/list',(req, res)=>{
	UserDao.find({}, function(err, result) {
		if (!err) {
			res.json({
				code:200,
				data:result
			});
		} else {
			res.send({
				code:500,
				data:"错误"
			});
		}
	})
})


router.get('/api/delete/:id',(req, res)=>{
	let id = req.params.id;
	UserDao.delete({_id:id},function(err){
		if(!err){
			res.json({code:200,msg:"ok"});
		}else{
			res.json({code:500,msg:"出错了"})
		}
	})
})




router.post('/add',upload.single('headurl'), function(req, res, next) {
	// res.send('respond with a resource');
	var username = _.trim(req.body.username);
    var password = _.trim(req.body.password);
    console.log("========++++++++++++++++")
    if(_.isEmpty(username) || _.isEmpty(password)) { res.json({ status:500, msg:'信息不完整' }); return; };
    let obj = {
    	username:username,
    	password:password,
    	sex:req.body.sex
    }
    var imgPath = req.file.path;
  	var imgName = req.file.filename+path.extname(req.file.originalname);
  	console.log(obj);
	 qiniuFn(imgPath,imgName,function(data){
	 	console.log("===================================");
	 	obj.headurl = imgDomain+data.key;
	 	// res.json(data);
	 	console.log(obj);
	 	UserDao.create(obj,function(err,user){
	 		if(!err){
	 			res.json({
	 				code:"200",
	 				msg:"ok"
	 			});
	 		}else{
	 			res.json(err);
	 		}
	 	})
	 }); 

});

module.exports = router;