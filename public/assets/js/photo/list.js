
// 讲师列表页面的模块
define( [ 'jquery', 'template', 'bootstrap', 'form' ], function ( $, template ) {



// 页面一加载就需要请求数据
$.ajax({
	url: '/teacher',
	type: 'get',
	success: function ( info ) {
		if ( info.code == 200 ) {
			// 将数组变成一个表格
			// console.log( info );
			// 利用模板引擎渲染


			// 测试数据
			// info.result[ 1 ].tc_status = 1;

			var html = template( 'tableTeacherInfoListTpl', { list: info.result } );

			$( '#tableTeacherInfoList tbody' ).html( html );
		}
	}
});




// 添加查看信息的点击事件( 要么将代码写到 success 函数中, 在 渲染完成以后再 添加事件 )
// 要么使用委托来增加事件
// $( '.showInfo' ).click( function () {
// 	alert( 123 );
// });


// 对家乡信息进行格式化, 去掉其中的 竖线
var rhometown = /\|/g;
template.defaults.imports.formatHomeTown = function ( hometown ) {
	return hometown.replace( rhometown, ' ' );
}


// 添加查看信息的点击事件
$( '#tableTeacherInfoList' ).on( 'click', '.showInfo', function () {
	
	var tc_id = $( this ).parent( 'td' ).attr( 'data-tc-id' );

	// alert( tc_id );
	// 通过 id 查找用户数据

	$.ajax({
		url: '/teacher/view',
		type: 'get',
		data: { tc_id: tc_id },
		success: function ( info ) {
			console.log(info);
			if ( info.code == 200 ) {

				// console.log( info.result );

				// 渲染模板, 显示 模态框

				// 数据格式化的方案1
				// 
				// info.result.tc_hometown = info.result.tc_hometown.split( '|' ).join( ' ' );

				var html = template( 'teacherInfoTpl', info.result );
				console.log( html );
				$( '#modalTeacherInfo' ).html( html );

				console.log( $( '#modalTeacherInfo' ) );


				$( '#teacherModal' ).modal( 'show' );

			}
		}
	})

});




// 提供讲师状态修改按钮
var statusValues = [ '启 用', '注 销' ];
$( '#tableTeacherInfoList' ).on( 'click', '.status', function () {

	// 发送请求修改状态
	// 1, 获得 id
	// 2, 获得当前状态
	// 3, 发送请求
	// 4, 拿到请求结果
	// 5, 修改页面中的值

	var tc_id = $( this ).parent( 'td' ).attr( 'data-tc-id' ),
		tc_status = $( this ).attr( 'data-tc-status' );
	var that = this;
	$.ajax({
		url: '/teacher/handle',
		type: 'post',
		data: {
			tc_id: tc_id,
			tc_status: tc_status
		},
		success: function ( info ) {
			if ( info.code == 200 ) {
				// console.log( info.result );
				$( that ).attr( 'data-tc-status', info.result.tc_status )
					     .text( statusValues[ info.result.tc_status ] );
			}
		}
	});

	return false;
});




});