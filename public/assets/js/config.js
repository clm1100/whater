
// 配置
require.config({
	baseUrl: '/assets',
	paths: {
		// 第三方模块
		less: 			'lib/less.js/less',
		jquery: 		'lib/jquery/jquery-3.2.0',
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

		// 自定义模块
		common: 		'js/common',
		login: 			'js/index/login',
		teacherList:    'js/teacher/list',
		photoAdd:     	'js/photo/add',
		settings:       'js/index/settings',
		tools: 			'js/tools',
		courseAdd:      'js/course/add',
		step1:          'js/course/add_step1',
		step2:          'js/course/add_step2',
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
		uploadify: {
			deps: [ 'jquery' ]
		},
		CKEDITOR: {
			exports: 'CKEDITOR'
		},
		Jcrop: {
			deps: [ 'jquery' ]
		}
	}
});


require( [ 'common', 'less' ] );
