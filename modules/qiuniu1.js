var qiniu = require("qiniu");
var fs = require('fs');
var qnToken = require('../models/qnToken.js').QiniuModel;
var qnTokenDao = require('../models/qnToken.js').Dao;


var bucket = 'clm2';
var accessKey = "AJHcEkPuEP_-HlltHZai1LhWNkOXqCXHfxz5uFZR";
var secretKey = "pgqx4F8WTcUpUBzJdzcr4tlfTMjrbXwcyyG9FZb-";
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);



var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;



var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();

// 文件上传
// formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
//   respBody, respInfo) {
//   if (respErr) {
//     throw respErr;
//   }
//   if (respInfo.statusCode == 200) {
//     console.log(respBody);
//   } else {
//     console.log(respInfo.statusCode);
//     console.log(respBody);
//   }
// });
// 
/*
path:"图片地址",
name:"图片名称",
callback:'处理回调结果'
 */


module.exports = function(path, name, callback) {
  var localFile = path;
  var readableStream = fs.createReadStream(localFile);
  var key = name;

  getToken('clm2', function(data, err) {

    formUploader.putStream(data.token, key, readableStream, putExtra, function(respErr,
      respBody, respInfo) {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode == 200) {
        console.log(respBody);
        callback(respBody)
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }

    });

  })

}



function getToken(appid, cb) {
  qnToken.findOne({
    appid: appid
  }, function(err, token) {
    if (token) {
      var difference = parseInt(new Date().getTime() / 1000) - token.at;
      if (difference > 7100) refreshToken(appid, function(data, err) {
        cb(data, err);
      });
      else cb(token, null);
    } else createToken(appid, function(data, err) {
      cb(data, err);
    });
  });
}

function createToken(appid, cb) {
  var options = {
    scope: 'clm2',
    expires: 7200,
    // returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);
  qnTokenDao.create({
    appid: 'clm2',
    token: uploadToken
  }, function(err, data) {
    cb(data, err)
  })

}

function refreshToken(appid, cb) {
  var options = {
    scope: 'clm2',
    expires: 7200,
    // returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken = putPolicy.uploadToken(mac);
  qnTokenDao.update({
    appid: 'clm2',
  }, {
    token: uploadToken,
    at: parseInt(new Date().getTime() / 1000)
  }, function(err, data) {
    cb(data, err)
  })

}