
// 定义一个模块, 用于个人中心
define( [ 'jquery'
	, 'template'
	, 'CKEDITOR'
	, 'uploadify'
	, 'region'
	, 'validate'
	, 'zhcn'
	, 'form' 
], function ( $, template, CKEDITOR ) {


// 请求数据, 加载页面

$.ajax({
	url: '/teacher/profile',
	type: 'get',
	success: function ( info ) {
		if ( info.code == 200 ) {
			console.log( info );
			// 渲染模板
			var html = template( 'settingsFormTpl', info.result );


			$( '.body .settings' ).html( html );

			// 渲染结束后才会有标签, 才可以使用 上传插件
			$( '#upfile' ).uploadify( { 
				formData:{a:100,b:200},
				swf: '/assets/lib/uploadify/uploadify.swf',
				uploader: '/uploader/avatar',
				fileObjName: 'tc_avatar',
				onUploadSuccess: function ( _, filename ) {


					$( '#upfileView' ).attr( 'src', JSON.parse( filename ).result.path );
				},
				itemTemplate: '<span></span>',
				buttonText: '',
				width: '120px',
				height: '120px'

			});


			// 初始化省市级联
			$( '.hometown' ).region({
				url: '/assets/lib/jquery-region/region.json'
			});


			// 使用 CKEDITOR 处理表单
			CKEDITOR.replace( 'tc_introduce' );
		}
	}
});



// 绑定 submit 事件
$( '.body .settings' ).on( 'submit', '#profileForm', function () {

	// alert( 1 );

	// 手动更新 CKEDITOR
	for ( var k in CKEDITOR.instances ) {
		CKEDITOR.instances[ k ].updateElement();
	}

	// 获得用户选择的城市信息, 用竖线将其连起来
	// 就是获得 select 标签中所有的 含有 selected 属性的 option 标签
	// 1, 在 this 中去寻找 select 标签( 理论上来讲应该先找 hometown 里面的 select )
	// 2, 取它的子元素中选中的元素
	// console.log( $( 'select', this ).find( ':selected' ) );
	// 3, 将 三个 option 中的 text 取出来, 可以考虑使用 map 方法
	var tc_hometown = $( 'select', this ).find( ':selected' ).map( function () {
		// this 在回调函数中, 表示的是 DOM 对象
		return $( this ).text();
	}).toArray().join( '|' );





	$( this ).ajaxSubmit({
		url: './teacher/modify',
		type: 'post',
		data: {
			tc_hometown: tc_hometown
		},
		success: function ( info ) {
			if ( info.code == 200 ) {
				alert( '保存成功' );
			}
		}
	});


	return false;
});


});