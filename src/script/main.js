require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/2.1.0/jquery.min',
        // 'jlazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.8.3/jquery.lazyload.min'
        // 'header': './header'
    },
    shim: {

    }
});

require(['jquery'], function() {
    let $src = $('#current').attr('data-sc');
    require([$src], function(src) {
        src.init()
    });


});