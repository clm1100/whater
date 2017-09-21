// 讲师列表页面的模块
define([
	'jquery', 
	'template', 
	'moment',
	'bootstrap', 'form'], function($, template,moment) {
moment.locale("zh-cn");
template.defaults.imports.formatTime = function ( time ) {
	return moment(time).fromNow();

}

function getUser(){
	var url = "/users/api/list";
	return $.get(url);
};
function deleteUser(id){
	var url = "/users/api/delete/"+id;
	return $.get(url);
}


getUser().then(function(data){
	console.log(data.data);
	var html = template('userListTpl',{list:data.data});
	$("#userTbody").html(html);
})

$("#userTbody").on("click",".delete",function(){
	var id = $(this).parent().attr("data-id");
	console.log(id);
	deleteUser(id).then(function(data){
		if(data.code == "200"){
			window.location.href="/users"
		}
	})
})

});