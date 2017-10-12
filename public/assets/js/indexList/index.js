define(['jquery1', 'Handlebars', 'tools', 'template', 'waterfall', 'rebox', 'swipebox'

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
                    // $('.swipe').swipebox();
                    $loading.fadeOut();

                },
                renderData: function(data, dataType) {
                    var html = template('waterfall-tpl', {
                        result: data
                    });
                    if (data.length < 20) {
                        $('#container').waterfall('pause', function(data) {
                            console.log('没有了');
                        });
                    }
                    return html;

                }
            }
        });
        // $('#container').rebox({
        //     speed: 600,
        //     selector: 'a'
        // });
        // $('#container').bind('rebox:goto', function(e, i){
        //     console.log("2222");
        // });
        // $('#container').on('click','.swipe',function(e) {
        //     e.preventDefault();
        //     $(this).swipebox();
        // });
        $('#container').click(function(e) {
            e.preventDefault();
            var arr = $('.swipe').map(function(i,e){
                return {
                    href:$(e).attr('href'),
                    title:$(e).attr('title')
                }
            }).toArray();
            console.log(arr);
            $.swipebox(arr);
        });
    })
});