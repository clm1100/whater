var express = require('express');
const uuidv1 = require('uuid/v1');
var router = express.Router();
var util = require("util");
var path = require("path");
var formidable = require('formidable');
var qiniuFn = require('../modules/qiuniu1.js');
var ImageModel = require('../models/image.js').ImageModel;
var ImageDao = require('../models/image.js').Dao;
var multer = require('multer')
  /*此处的地址相对于app.js,可应用path模块控制路径或者直接用 ./public/m */
var upload = multer({
  dest: path.join(__dirname, '..', '/public/m')
});


var p1 = function(obj) {
  return new Promise(function(resolve, reject) {
    ImageDao.create(obj, function(err, data) {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    })
  })
};

var p2 = function(imgPath, imgName) {
  return new Promise(function(resolve, reject) {
    qiniuFn(imgPath, imgName, function(data) {
      resolve(data);
    });
  })
}

/* formidable上传图片 */
// router.post('/', function(req, res, next) {
//   console.log(req.query);
//   console.log("==================upload===========================");
//   var form = new formidable.IncomingForm();
//   form.encoding = 'utf-8';
//   form.uploadDir = "./public/m";
//   form.keepExtensions = true;
//   form.maxFieldsSize = 2 * 1024 * 1024
//   form.parse(req, function(err, fields, files) {
//     console.log(files,fields)
//     res.json({
//       fields: fields,
//       files: files
//     });
//      // qiniuFn(files.file.path,files.file.name,function(data){
//      //  res.json(data);
//      // })
//   });
// });
/*multer上传图片*/
router.post('/', upload.single('file'), function(req, res, next) {
  // req.file is the name `file` file
  // req.body will hold the text fields, if there were any;
  var imgObj = uuidv1()
  console.log(imgObj);
  console.log(req.body);
  var objBody = req.body;
  console.log(req.file);
  var imgPath = req.file.path;
  var imgName = imgObj + path.extname(req.file.originalname);

  Promise.resolve(
    p2(imgPath, imgName)
  ).then(function(data) {
    var newObj = {
      url: "http://oqsw5qjf9.bkt.clouddn.com/" + data.key
    };
    var obj = Object.assign(objBody, newObj);
    // res.json(data);
    p1(obj).then(function(data) {
      res.json(data);
    })
  })
});

module.exports = router;