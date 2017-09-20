// 讲师列表页面的模块
define(['jquery', 'template', 'bootstrap', 'form'], function($, template) {

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