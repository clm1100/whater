define(['jquery1', 'Handlebars', 'tools', 'template', 'waterfall', 'rebox'

], function($, Handlebars, tools, template) {
    $(function() {
        var id = tools.getSearch().id;
        $('#container').waterfall({
            itemCls: 'item',
            isFadeIn: false,
            colWidth: 222,
            gutterWidth: 15,
            gutterHeight: 15,
            checkImagesLoaded: true,
            path: function(page) {
                return '/photo/api/' + id + '?page=' + page;
            },
            callbacks: {
                /*
                 * loading start 
                 * @param {Object} loading $('#waterfall-loading')
                 */
                loadingStart: function($loading) {
                    $loading.show();
                },
                loadingFinished: function($loading, isBeyondMaxPage) {
                        
                        $loading.fadeOut();
                    
                },
                renderData: function(data, dataType) {

                    var html = template('waterfall-tpl', {
                        result: data
                    });
                    if (data.length <20) {
                        $('#container').waterfall('pause', function(data) {
                            console.log('没有了');
                        });
                    }
                    return html;

                }
            }
        });
        $('#container').rebox({
            selector: 'a'
        });
    })
});