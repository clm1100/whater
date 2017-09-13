
// 页面公共代码
// 所有页面都共享该代码
define( [ 
	'jquery', 
	'template', 
	'NProgress', 
	'tools',
	'cookie' ], function ( 
		$, 
		template,
		NProgress,
		tools ) {

$( '.loading' ).hide();



// 二级菜单展开
$( '.aside a + ul' ).prev().click(function () {
	// 展开 ul 标签
	$( this ).next().toggle();
}) ;





// 处理页面加载时的齿轮
$( document ).ajaxStart(function () {
	$( '.loading' ).show();
	NProgress.start();
});

$( document ).ajaxStop( function () {
	
	
	$( '.loading' ).fadeOut( 500 );
	NProgress.done();

});





/*
	第一部分, 验证 用户是否登录
	算法: 判断是否存在 PHPSESSID 
*/

// var php_session_id = $.cookie( 'PHPSESSID' );

// if ( !php_session_id && location.pathname != '/login' ) {
// 	// 不存在跳转到 登录页面
// 	location.pathname = '/login';
// }


/**
	第二部分, 页面加载的时候, 从 cookie 取出 userInfo, 得到用户的头像与用户名
 */




// 退出登录的代码
$( '#btn_logout' ).click( function () {

	$.ajax({
		url: '/api/logout',
		type: 'post',
		success: function ( info ) {
			if ( info.code == 200 ) {
				// console.log( info );
				location.pathname = '/';
			}
		}
	});

});




// 打印当前路径
tools.setMenu();




} );