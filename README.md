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