var express = require('express');
var router = express.Router();
var util = require("util");
var path = require("path");
var formidable = require('formidable');
var qiniuFn = require('../modules/qiuniu1.js')
var multer  = require('multer')
/*此处的地址相对于app.js,可应用path模块控制路径或者直接用 ./public/m */
var upload = multer({ dest: path.join(__dirname,'..','/public/m') })

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
router.post('/', upload.single('file'), function (req, res, next) {
  // req.file is the name `file` file
  // req.body will hold the text fields, if there were any
  
  var imgPath = req.file.path;
  var imgName = req.body.name;
  qiniuFn(imgPath,imgName,function(data){
      res.json(data);
  })
})
module.exports = router;