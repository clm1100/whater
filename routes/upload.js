var express = require('express');
var router = express.Router();
var util = require("util");
var formidable = require('formidable');
var qiniuFn = require('../modules/qiuniu1.js')
/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.query);
  console.log("==================upload===========================");
  var form = new formidable.IncomingForm();
  form.uploadDir = "./public/m"
  form.keepExtensions = true;
  form.maxFieldsSize = 2 * 1024 * 1024
  form.parse(req, function(err, fields, files) {
    // res.json({
    //   fields: fields,
    //   files: files
    // });
     qiniuFn(files.file.path,files.file.name,function(data){
      res.json(data);
     })
  });
});

module.exports = router;