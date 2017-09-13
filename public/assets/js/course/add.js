define( [ 'tools', 'jquery', 'validate', 'form' ], function ( tools, $ ) {
	
	// 展开对应的菜单
	tools.expandMenu();

	// 添加表单验证
	$( '#addCourseNameId' ).validate();

	// 添加课程创建的点击事件
	$( '#addCourseNameId' ).submit(function () {

		// alert( 1 );

		$( this ).ajaxSubmit({
			url: '/api/course/create',
			type: 'POST',
			success: function ( info ) {
				if ( info.code == 200 ) {
					// 注意, 我们返回的是课程 id, 我们同时要跳转到 add_step1 中
					// 在 step1 中添加课程描述
					// 在 课程描述页面中必须知道我们处理的是哪一个页面. 因此也需要带有课程 id
					// 即, 我们在跳转到 对应页面的时候, 还需要将 id 号传过去.
					// 可以考虑使用 , 所以我们在跳转的时候, 应该使用 
					// /course/add_step1?cs_id=xxx
					console.log( info );
					alert( '课程添加成功' );
					location.href = '/course/add_step1?cs_id=' + info.result.cs_id;
				}
			}
		});


		return false;
	})

});