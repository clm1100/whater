# whater相册管理项目
**采用BS架构**</br>
## 前端用到的插件如下:
+ jquery、
+ webuploader（文件上传插件）
webuploader的多图上传功能本质是连续发送N次请求，请求文件上传接口，但是有一个弊端，如果在上传图片的同时，我想上传一些其他的文本字段，改在哪里设置，通过通读代码发现，每次上传文件webuploader都会new 一个upload的对象，这个对象有一个options属性，这个属性里面还有一个formData的属性，所有文本字段全部保存在这个对象里了，所以只要修改他就可以了，关键是怎么修改，在哪修改，通过通读文档发现，每个文件上传前都会触发一个uploadStart事件，在这个事件内部修改即可；代码如下

~~~
uploader.on('uploadStart',function(){
            uploader.options.formData.title = $(".filelist input").eq(n++).val()
        })
~~~

但是这里还有一个疑问，文件传到后端所有关于文件的信息都保存在file这个字段里，如果这个字段需要修改，修改哪里呢 ？
**fileVal** 这个参数设置，图片信息字段;
+ jquery-rebox（灯箱插件）: http://trentrichardson.com/examples/jQuery-Rebox/
+ Waterfall（瀑布流插件）: http://wlog.cn/waterfall/

## 后端采用express框架:
+ 文件上传模块为 **formidable** https://www.npmjs.com/package/formidable 但是好像nodejs4.0以上版本不兼容，有待改善,配置代码如下：
~~~
router.post('/upload', function(req, res, next) {
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
~~~
+ 图片存储用的七牛云，上传模块为**qiniu**：https://www.npmjs.com/package/qiniu 这个七牛云模块是最优化的其他几个不是版本低就是有bug;配置代码如下：

~~~

const qiniu = require("qiniu");
var fs = require('fs');

var bucket = 'clm2';
var accessKey = "xxxxx";
var secretKey = "xxxxx";
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var options = {
  scope: 'clm2',
  expires: 7200,
  // returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);
var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
module.exports = function(path, name, callback) {
  var localFile = path;
  var readableStream = fs.createReadStream(localFile);
  var key = name;

  formUploader.putStream(uploadToken, key, readableStream, putExtra, function(respErr,
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

}

~~~

步骤：根据ak 和 sk 生成验证token，获取文件流，定义文件名称，还有一个不知道干嘛的putExtra四个参数凑齐,还有别忘了设置机房；
##关于pre与post预处理
一段经典代码：设置数据的初始时间与更改时间

~~~
var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
  director: String,
  title: String,
  language: String,
  country: String,
  summary: String,
  flash: String,
  poster: String,
  year: Number,
  meta: {
    createAt:{
      type:Date,
      default: Date.now()
    },
    updateAt:{
      type:Date,
      default: Date.now()
    }
  }
});

MovieSchema.pre('save', function(next){
  if(this.isNew){
    this.meta.createAt = this.meta.updateAt = Date.now();
  }else{
    this.meta.updateAt = Date.now();
  }

  next();
});

MovieSchema.statics = {
  fetch: function(cb){
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb);
  },
  findById: function(id, cb){
    return this
      .findOne({_id: id})
      .exec(cb);
  }
};

module.exports = MovieSchema;
~~~

将初始时间和修改时间存储在一个对象的两个属性中，通过pre绑定save事件，通过this.isNew判断是否是新生成的数据；从而修改不同的数据;
关于plugins的用法：

~~~
// lastMod.js
module.exports = exports = function lastModifiedPlugin (schema, options) {
  schema.add({ lastMod: Date })
  
  schema.pre('save', function (next) {
    this.lastMod = new Date
    next()
  })
  
  if (options && options.index) {
    schema.path('lastMod').index(options.index)
  }
}
// game-schema.js
var lastMod = require('./lastMod');
var Game = new Schema({ ... });
Game.plugin(lastMod, { index: true });
// player-schema.js
var lastMod = require('./lastMod');
var Player = new Schema({ ... });
Player.plugin(lastMod);
~~~

关于mongoose存储数据的生命周期：

~~~
schema.post('init', function (doc) {
  console.log('%s has been initialized from the db', doc._id);
})
schema.post('validate', function (doc) {
  console.log('%s has been validated (but not saved yet)', doc._id);
})
schema.post('save', function (doc) {
  console.log('%s has been saved', doc._id);
})
schema.post('remove', function (doc) {
  console.log('%s has been removed', doc._id);
})
~~~

pre与post的关系：如下
pre();
save()或者validate();
post();

## 每天看十个npm包这个....
今天看了两个小包：
数组拍平 https://github.com/jonschlinkert/arr-flatten
这个仓库页面的库可以看看https://github.com/parro-it/awesome-micro-npm-packages
知道了一个redis的库 ioredis https://github.com/luin/ioredis
处理图片信息的库 exif：https://www.npmjs.com/package/exif

集成redis数据库,将其安装为服务,并安装测试ioredis；
redis下载地址：https://github.com/MicrosoftArchive/redis/releases
安装成服务：http://blog.csdn.net/u010982856/article/details/51658184
## obj.toObject({virtuals: true})
带有虚拟属性的对象不能直接使用res..json(obj);
必须使用一个转化函数，res.json(result.toObject({virtuals: true}))
## 七牛云的token本地化存储
七牛云的存储需要用到token，这个token可以自定义一个过期时间，是有时间限制的，所以，我用数据库将其存储起来，每次用时去数据库取出来，并判断时间，如果存在和当前时间比对，未过期直接使用，过期的话，刷新一下，不存在的话生成一个新的，设置一个at属性，设置成数字时间戳；

