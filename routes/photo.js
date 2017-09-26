var express = require('express');
var ImageDao  = require('../models/image.js').Dao;
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('photo/list', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('photo/add', { title: 'Express' });
  
});

router.get('/test', function(req, res, next) {
  ImageDao.create({
  	Imagename:"22222",
  	url:"222222"
  },function(err,result){
  	console.log(result.original,"=================")
  	// http://www.cnblogs.com/jay--zhang/p/6290105.html格式化后获取;这样前端代码就能访问到了;
  	res.send(result.toObject({virtuals: true}))
  })
});



router.get('/test/list', function(req, res, next) {
  ImageDao.find({},function(err,results){
  	res.json(results)
  })
});

module.exports = router;
