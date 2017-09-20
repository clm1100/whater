// 讲师列表页面的模块
define(['jquery', 'template', 'bootstrap', 'form'], function($, template) {


	function previewFile() {
		var preview = $("#headerImg");
		var file = $('input[type=file]')[0].files[0];
		var reader = new FileReader();
		console.log(reader)
		if (file) {
			reader.readAsDataURL(file);
		} else {
			// preview.src = "";
		}


		reader.onloadend = function() {
			// preview.src = reader.result;
			console.log(reader.result)
			preview.attr({
				src:reader.result
			})
			console.log('123')
		}
	}
	$('input[type=file]').change(function(){
		previewFile()
	});

	$(".categoryForm a").click(function(){
		$( ".categoryForm" ).ajaxSubmit({
			url: '/users/add',
			type: 'POST',
			success: function ( info ) {
				if(info.code=="200"){
					window.location.href = "/users";
				}
			}
		});
	})


});