
// add.js 文件, 也是一个模块, 用于处理用户的添加与修改
define( [ 
	'jquery',
	'template',
	'form',
], function ( $, template,WebUploader ) {
    function getDataList(){
      return  $.get("/category/api/list")
    };
    getDataList().then(function(data){
        console.log(data);
        var html = template('categoryListTpl',{list:data.data});
        $("#listOut").html(html)
    });
});