var express = require('express');
var router = express.Router();
var util = require("util");
var formidable = require('formidable');
/* GET home page. */
router.post('/upload', function(req, res, next) {
  console.log("==================upload===========================");
  var form = new formidable.IncomingForm();
  form.uploadDir = "./public/m"
  form.keepExtensions = true;
  form.maxFieldsSize = 2 * 1024 * 1024
  form.parse(req, function(err, fields, files) {
    res.json({
      fields: fields,
      files: files
    })
  });
});

module.exports = router;