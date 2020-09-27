// import $ from './lib/jquery.js'
define(['jquery'], function() {
    return {
        init: function() {
            // 渲染
            $.ajax({
                type: "post",
                url: "http://127.0.0.1/changhong/php/goods.php",
                dataType: "json",
                success: function(response) {
                    let html = ``
                    response.forEach(function(elm, i) {
                        if (i < 8) {
                            html += ` <div class="contitem">
                        <a href="">
                            <img src="${elm.url}" alt="">
                            <div class="text">
                            <span class="title">${elm.title}</span>
                            <p class="detail">${elm.detail}</p>
                                <p class="p2">￥ <span class="price">${elm.price}</span>.00</p>
                            </div>
                        </a>
                    </div>
                    `
                        }

                    });
                    $('.bottom').append(html)

                }
            });
            // 渲染
            $.ajax({
                type: "post",
                url: "http://127.0.0.1/changhong/php/goods.php",
                dataType: "json",
                success: function(response) {
                    let html = ``
                    response.forEach(function(elm, i) {
                        if (i < 4) {
                            html += `  <div class="botcontitem">
                        <a href="">
                            <img src="${elm.url}" alt="">
                            <div class="text">
                                <span class="title">${elm.title}</span>
                                <p class="detail">${elm.detail}</p>
                                <p class="p2">$ <span class="price">${elm.price}</span>.00</p>
                            </div>
                        </a>
                     </div>
                      `
                        }

                    });

                    $('.botbottom').append(html)

                }
            });
            /////////////////// 导航下拉二级菜单/////////////////////
            $('.bot').hide();
            $('.menu>ul').on('mouseover', function() {
                $('.bot').show()
                $('.bot').stop(true).animate({
                    height: '280px',
                })
                $('.menu>ul>li>a').on('mouseover', function() {
                    $(this).addClass('active')
                    $(this).parent().siblings().find('a').removeClass('active')

                })
                $('.menu>ul>li').on('mouseover', function() {

                    //导航下拉二级菜单渲染

                    $('.botbox').eq($(this).index()).show().siblings().hide()
                    $.ajax({
                        type: "get",
                        url: "http://127.0.0.1/changhong/php/goods.php",
                        dataType: "json",
                        success: function(response) {
                            let html = ``
                            response.forEach(function(elm, i) {
                                if (i < 5) {
                                    html += `
                                    
                                    <ul>
                                    <li>
                                        <div class="imgbox"> <img src="${elm.url}"></div>
                                        <p class="title">${elm.title}</p>
                                        <p class="p2">$ <span class="price">${elm.price}</span>.00</p>
                                    </li>
                                </ul> `
                                }
                            })
                            $('.botbox').html(html)
                            console.log(html)
                        }
                    });

                })
            })

            $('.menu>ul').on('mouseout', function() {

                $('.bot').animate({
                    display: 'none',
                    height: '0px'
                })
                $('.bot').hide()
            })


            $('.bot').hover(function() {
                    $(this).show()
                    $('.bot').stop(true).animate({
                        height: '280px',
                    })
                }, function() {
                    $(this).hide()
                    $('.bot').stop(true).animate({
                        height: '0px',
                    })
                })
                /////////////// 左侧二级菜单//////////////////////////////////////////
                // $('.banner_list>ul>li').
        }
    }

});