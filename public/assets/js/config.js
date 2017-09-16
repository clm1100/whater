
// 配置
require.config({
	baseUrl: '/assets',
	paths: {
		// 第三方模块
		less: 			'lib/less.js/less',
		jquery: 		'lib/jquery/jquery-3.2.0',
		jquery1: 		'lib/jquery/jquery-1.11.1',
		cookie: 		'lib/jquery.cookie/jquery.cookie',
		template: 		'lib/art-template/template-web',
		bootstrap: 		'lib/bootstrap/dist/js/bootstrap',
		NProgress:      'lib/nprogress/nprogress', 
		form:           'lib/form-master/src/jquery.form',
		datepicker:     'lib/bootstrap-datepicker-master/dist/js/bootstrap-datepicker',
		zhcn: 			'lib/bootstrap-datepicker-master/dist/locales/bootstrap-datepicker.zh-CN.min',
		validate: 		'lib/validate-master/jquery-validate',
		uploadify:      'lib/uploadify/jquery.uploadify',
		region: 		'lib/jquery-region/jquery.region',
		CKEDITOR:       'lib/ckeditor/ckeditor',
		Jcrop:          'lib/Jcrop-WIP-2.x/js/Jcrop',
		WebUploader:    'lib/webuploader/dist/webuploader',
		Handlebars:     'lib/handlebars/handlebars',
		waterfall:      'lib/waterfall/waterfall',
		rebox:       	'lib/rebox/jquery-rebox',

		// 自定义模块
		common: 		'js/common',
		login: 			'js/index/login',
		photoList:    	'js/photo/list',
		photoAdd:     	'js/photo/add',
		photoIndex:     'js/index/index',
		categoryAdd:    'js/category/categoryAdd',



		settings:       'js/index/settings',
		tools: 			'js/tools',
	},
	shim: {
		bootstrap: {
			deps: [ 'jquery' ]
		},
		zhcn: {
			deps: [ 'datepicker' ]
		},
		validate: {
			deps: [ 'jquery' ]
		},
		rebox: {
			deps: [ 'jquery1' ]
		},
		waterfall: {
			deps: [ 'jquery1' ]
		},
		uploadify: {
			deps: [ 'jquery' ]
		},
		CKEDITOR: {
			exports: 'CKEDITOR'
		},
		Handlebars: {
			exports: 'Handlebars'
		},
		Jcrop: {
			deps: [ 'jquery' ]
		}
	}
});


require( [ 'common', 'less' ] );
