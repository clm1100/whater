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
	// res.send('respond with a resource');
	UserDao.create({
		name: "12345"
	}, function(err, result) {
		if (!err) {
			res.json(result);
		} else {
			res.send("2222");
		}
	})
});



router.post('/add',upload.single('headurl'), function(req, res, next) {
	// res.send('respond with a resource');
	console.log("22222222222222222222222222222222222")
	var username = _.trim(req.body.username);
    var password = _.trim(req.body.password);
    if(_.isEmpty(username) || _.isEmpty(password)) { res.json({ status:500, msg:'信息完整' }); return; };
    let obj = {
    	username:username,
    	password:password
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
	 			res.json(user);
	 		}else{
	 			res.json(err);
	 		}
	 	})
	 }); 

});

module.exports = router;