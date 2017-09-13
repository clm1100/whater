// 定义一个 tools 模块
// 来提供工具方法
define( [ 'jquery' ], function ( $ ) {

	var setMenu = function ( urlpart ) {
		// 先获得当前页面的 pathname
		var pathname = urlpart || location.pathname;

		// console.log( pathname );
		// 在 菜单的 a 标签中找到对应 href 的取值为 pathname 的 a 标签
		$( '.navs li a' ).toArray().filter(function ( dom ) {
			// 只需要判断 dom 元素的 href 是否与 给定的 pathname 一致即可
			// console.log( dom.href );
			return dom.pathname == pathname;
		}).forEach(function ( dom ) {
			$( dom ).addClass( 'active' );
			// console.log( dom );
		});


	};


	var expandMenu = function () {
		$( '.aside a + ul' ).show();
	};


	var getSearch = function () {
		var tmp = {},
			search = location.search; // 系统 给出的 search 是带有问号的
		if ( search.length === 0 ) return tmp;
		// 如果进入到这里说明已经含有参数
		// ?k=v&k=v&kv
		search.slice( 1 ).split( '&' ).forEach(function ( item ) {
			var kv = item.split( '=' );
			tmp[ kv[ 0 ] ] = kv[ 1 ];
		});

		return tmp;
	};


	return {
		setMenu: setMenu,
		expandMenu: expandMenu,
		getSearch: getSearch
	};
} )