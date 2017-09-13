
// 定义 add_step1 模块
define( [ 'jquery', 'template', 'tools', 'CKEDITOR', 'validate', 'form' ], 
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
		url: '/api/course/basic',
		type: 'get',
		data: {
			cs_id: searchObj[ 'cs_id' ]
			// searchObj.cs_id
		},
		success: function ( info ) {
			if ( info.code == 200 ) {
				console.log( info.result );
				// 渲染页面
				var html= template( 'step1Tpl', info.result );

				$( '.steps' ).html( html );


				// 富文本编辑器
				CKEDITOR.replace( 'cs_brief' );
			}
		}
	});



	// 绑定 change 事件以选择顶级 分类, 然后通过请求获得子分类, 更新子分类的 select 标签
	$( '.steps' ).on( 'change', '#cs_cg_pid', function () {
		// alert( this.value );

		// 请求子分类
		$.ajax({
			url: '/api/category/child',
			type: 'get',
			data: {
				cg_id: this.value
			},
			success: function ( info ) {
				if ( info.code == 200 ) {
					// 处理数据
					var ret = info.result.map(function ( item ) {
						return '<option value="' + item.cg_id + '">' + item.cg_name + '</option>';
					});
					ret.unshift( '<option>请选择</option>' );

					// console.log( ret );

					$( '#cs_cg_id' ).html( ret.join( '' ) );
				}
			}
		})

	});


	// 为表单添加 submit 事件
	$( '.steps' ).on( 'submit', '#add_step1_form',  function () {

		// 更新 CKEDITOR
		for ( var k in CKEDITOR.instances ) {
			CKEDITOR.instances[ k ].updateElement();
		}

		$( this ).ajaxSubmit({
			url: '/api/course/update/basic',
			type: 'post',
			success: function ( info ) {
				if ( info.code == 200 ) {
					// console.log( info );
					location.href = '/course/add_step2?cs_id=' + info.result.cs_id;
				} 
			}
		});

		return false;
	});
});