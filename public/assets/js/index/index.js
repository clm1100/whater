

define( [ 'jquery'
		,'Handlebars'
		,'waterfall'
		,'rebox'

], function ( $, Handlebars ) {
$('#container').waterfall({
    itemCls: 'item',
    colWidth: 222,  
    gutterWidth: 15,
    gutterHeight: 15,
    checkImagesLoaded: false,
    path: function(page) {
        return 'data/data1.json?page=' + page;
    },
    callbacks: {
    /*
     * loading start 
     * @param {Object} loading $('#waterfall-loading')
     */
    // loadingStart: function($loading) {
    //     $loading.show();
    //     console.log($loading)
    //     console.log("start");
    // },
    // renderData: function (data, dataType) {
    //     var tpl,
    //         template;
    //          console.log(data,dataType);

    //     if ( dataType === 'json' ||  dataType === 'jsonp'  ) { // json or jsonp format
    //         tpl = $('#waterfall-tpl').html();
    //         template = Handlebars.compile(tpl);

    //         return template(data);
    //     } else { // html format
    //         return data;
    //     }
       
    // }
    }
});
$('#container').rebox({ selector: 'a' });
});