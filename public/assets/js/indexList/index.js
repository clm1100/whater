define(['jquery1', 'Handlebars','tools', 'template','waterfall', 'rebox'

], function($, Handlebars,tools,template) {
    $(function() {
        console.log(tools.getSearch());
        var id = tools.getSearch().id;
        console.log(id);
        $('#container').waterfall({
            itemCls: 'item',
            colWidth: 222,
            gutterWidth: 15,
            gutterHeight: 15,
            checkImagesLoaded: false,
            path: function(page) {
                return '/photo/api/'+id+'?page=' + page;
            },
            callbacks: {
                /*
                 * loading start 
                 * @param {Object} loading $('#waterfall-loading')
                 */
                loadingStart: function($loading) {
                    $loading.show();
                    console.log($loading)
                    console.log("start");
                },
                renderData: function (data, dataType) {
                    console.log(data);
                    // var tpl,
                    //     template;
                    //      console.log(data,dataType);

                    // if ( dataType === 'json' ||  dataType === 'jsonp'  ) { // json or jsonp format
                    //     tpl = $('#waterfall-tpl').html();
                    //     template = Handlebars.compile(tpl);

                    //     return template(data);
                    // } else { // html format
                    //     return data;
                    // }
                    if(data.length<20){
                        $('#container').waterfall('pause');
                        return "<h1>没有了</h1>";

                    }
                    var html = template('waterfall-tpl',{result:data});
                    console.log(html,"====================");
                    return html;

                }
            }
        });
        $('#container').rebox({
            selector: 'a'
        });
    })
});