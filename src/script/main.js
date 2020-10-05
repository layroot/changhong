require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.8.3/jquery.min',
        'jlazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.8.3/jquery.lazyload.min',
        // 'pagination': './lib/pagination',
        // 'cookie': './cookie'
    },
    shim: {

    }
});

require(['jquery', 'jlazyload'], function() {
    let $src = $('#current').attr('data-sc');
    require([$src], function(src) {
        src.init()
    });
});