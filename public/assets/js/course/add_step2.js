
// 定义 add_step1 模块
define( [ 'jquery', 
	'template', 
	'tools', 
	'CKEDITOR', 
	'uploadify', 
	'validate', 
	'form',
	'Jcrop' 
	], 
	function ( $, template, tools, CKEDITOR ) {

	// alert( 1 );

	// 处理菜单
	tools.expandMenu();

	tools.setMenu( '/course/add' );

	// 获得 url 地址
	var searchObj = tools.getSearch();
	// console.log( searchObj );

	// 请求数据, 编写模板, 渲染页面
	$.ajax({
		url: '/api/course/picture',
		type: 'get',
		data: {
			cs_id: searchObj.cs_id
		},
		success: function ( info ) {
			if ( info.code ) {
				console.log( info.result );
				var html = template( 'step2Tpl', info.result );

				$( '.steps' ).html( html );


				// 处理上传图片与剪切图片的按钮
				// 如果是第一次进来, 我们的裁切按钮是不允许点击的. 
				// 上传图片按钮应该允许上传图片
				// 等到图片上传以后, 预览图片. 处于裁切状态, 裁切按钮可以点击裁切
				// 点击完裁切以后, 进入下一个页面

				// 如果不是第一次进来, 那么我们的裁切按钮可以点击
				// 点击是启用裁切, 上传图片按钮是用于再次上传图片
				// 和第一次进来一样, 上传图片后, 还能再裁切
				handleUploadImage( info.result );

				if ( info.result.cs_cover_original ) {
					jcropImage();
				}

			}
		}
	});


	// 处理图片裁切问题
	function handleUploadImage( result ) {

		// 处理图片上传按钮
		$( '#btn_upload' ).uploadify({
			swf: '/assets/lib/uploadify/uploadify.swf',
			uploader: '/api/uploader/cover',
			fileObjName: 'cs_cover_original',
			buttonClass: 'btn btn-success btn-sm',
			onUploadSuccess: function ( _, filename ) {

				$( '.preview' ).html( '' ).append(
					$( '<img />' ).attr( 'src', JSON.parse( filename ).result.path )
				);

				$( '#btn_selectarea' ).prop( 'disabled', false );

				jcropImage();

			},
			itemTemplate: '<span></span>',
			buttonText: '选择图片',
			width: '70',
			height: 'auto',
			formData: {
				cs_id: result.cs_id
			},
			onInit: function () {
				$( '#btn_upload' ).css( {
					overflow: 'hidden'
				}).find( 'div' ).removeClass( 'uploadify-button' );
			}
		});

	}


	function jcropImage() {
		// 开始准备预览
		$( '.preview img' ).Jcrop({
			aspectRatio: 2
		}, function () {
			// 配置预览区域
			// 这里应该也可以实现 setSelect
			var jcrop_api = this;

			// for ( var  k in this ) {
			// 	if ( typeof this[ k ] == 'function' ) {
			// 		console.log( k );
			// 	}
			// }

			// console.log( this );
			// 计算选取的尺寸
			var w = jcrop_api.ui.stage.width,
				h = jcrop_api.ui.stage.width / 2,
				x = 0,
				y = (jcrop_api.ui.stage.height - h) / 2;


			// console.log( jcrop_api.setSelect );
			jcrop_api.newSelection();
			jcrop_api.setSelect( [ x, y, w, h ] );
  			jcrop_api.initComponent('Thumbnailer', { 
  				width: 240, height: 120, 
  				target: '.thumb' });
		});
	}
});