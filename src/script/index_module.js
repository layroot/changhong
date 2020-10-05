// import $ from './lib/jquery.js'
define(['jquery', 'jlazyload', 'cookie'], function() {
    return {
        init: function() {
            // 渲染

            // $('.bot').style.display = 'block'
            $.ajax({
                type: "post",
                url: "http://127.0.0.1/changhong/php/goods.php",
                dataType: "json",
                success: function(response) {

                    let html = ``
                    response.forEach(function(elm, i) {
                        if (i < 8) {
                            html += ` <div class="contitem">
                        <a href="./detail.html?sid=${elm.sid}">
                            <img class="lazy" data-original="${elm.url}" alt="">
                            <div class="text">
                            <span class="title">${elm.title}</span>
                            <p class="detail">${elm.detail}</p>
                                <p class="p2">￥ <span class="price">${elm.price}</span>0</p>
                            </div>
                        </a>
                    </div>
                    `
                        }
                    });
                    $('.bottom').append(html)
                    $(function() {
                        $("img.lazy").lazyload({ effect: "fadeIn" });
                    });
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
            // $('.bot').hide();
            $.ajax({ //导航下拉二级菜单渲染
                type: "get",
                url: "http://127.0.0.1/changhong/php/goods.php",
                dataType: "json",
                success: function(response) {

                    let html = ` <p class="p1">热门推荐</p>`
                    response.forEach(function(elm, i) {
                        if (i < 4) {
                            html += `
                            <li>
                                <div class="imgbox"> <img src="${elm.url}"></div>
                                <p class="title">${elm.title}</p>
                                <p class="p2">$ <span class="price">${elm.price}</span>.00</p>
                            </li>
                        `
                        }
                    })

                    $('.botbox>ul').html(html)
                        // console.log(html)
                }
            });
            $('.menu>ul').on('mouseover', function() {
                console.log(1)
                $('.bot').stop(true).animate({ // 移动到导航，下拉动画
                    height: '280px',
                    display: 'block'
                })
                $('.menu>ul>li>a').on('mouseover', function() { //进入二级时，保持效果
                    $(this).addClass('active')
                    $(this).parent().siblings().find('a').removeClass('active')
                })

                $('.menu>ul>li').on('mouseover', function() {
                    $('.botbox').eq($(this).index()).show().siblings().hide()
                })
            })

            $('.menu>ul').on('mouseout', function() { //移出导航时，二级消失
                $('.bot').animate({
                    display: 'none',
                    height: '0px'
                })

            })
            $('.bot').hover(function() { //移入二级时，二级出现

                    $('.bot').stop(true).animate({
                        height: '280px',
                    })
                }, function() {
                    $('.bot').stop(true).animate({ //移出二级时，二级消失
                        height: '0px',
                        display: 'none'
                    })

                })
                /////////////// 左侧二级菜单//////////////////////////////////////////
            $('.banner_list>ul>li').on('mouseover', function() {
                $('.leftbox').show()
                $(this).addClass('listactive').siblings().removeClass('listactive')
                $('.leftbox>.listitem').eq($(this).index()).show().siblings().hide()
                let t = $(this)

                $('.leftbox').hover(
                    function() {
                        $('.leftbox').show()
                        t.addClass('listactive').siblings().removeClass('listactive')
                    },
                    function() {
                        $('.leftbox').hide()
                        t.removeClass('listactive')
                    })
            })
            $('.banner_list>ul>li').on('mouseout', function() {
                    $('.leftbox').hide()
                    $('.banner_list>ul>li').removeClass('listactive')
                })
                ////////////////////轮播图/////////////////
            $img = $('.banner_lbt>img');
            $dian = $('.dian>li')
            let index = 0;
            timer = setInterval(function() {
                    time()
                        // console.log(index)
                    dian()
                }, 5000)
                /////////////轮播图函数////
            function time() {
                $img.eq(index).animate({
                        display: 'block',
                        opacity: 1
                    }).siblings()
                    .animate({
                        display: 'none',
                        opacity: 0
                    })
                index++
                if (index == $img.length) {
                    index = 0
                }
            }
            /////////轮播图小圆点函数///////
            function dian() {
                $dian.eq(index).addClass('dianactive').siblings().removeClass('dianactive')

            }
            $dian.on('click', function() {
                    $(this).addClass('dianactive').siblings().removeClass('dianactive')
                    index = $(this).index()
                    time()
                })
                ////////////固定条////////////
            let $lou = $('.louceng')
            let $lffixed = $('.leftfixed')
            let $rtfixedli = $('.rightfixed>.last')
            let $louti = $('.leftfixed>ul>li')
            let hometop = $('.home').offset().top - $('.home').height()
            let top = $(window).scrollTop()
            top > hometop ? $lffixed.show() : $lffixed.hide()
            top > hometop ? $rtfixedli.show() : $rtfixedli.hide()
            $(window).on('scroll', function() {
                    let top = $(window).scrollTop()
                    top > hometop ? $lffixed.show() : $lffixed.hide()
                    top > hometop ? $rtfixedli.show() : $rtfixedli.hide()
                        // console.log(top)
                    $lou.each(function(i, elm) {
                        let lctop = $(elm).offset().top - $(elm).height() / 4
                            // console.log(lctop)
                        if (top > lctop) {
                            $louti.eq(i).addClass('fixedactive').siblings().removeClass('fixedactive')
                        }
                    })

                })
                /////////////左侧固定栏点击效果/////////////
            $louti.on('click', function() {
                    $(this).addClass('fixedactive').siblings().removeClass('fixedactive')
                    let top = $lou.eq($(this).index()).offset().top
                        // console.log(top)
                    $('html,body').stop(true).animate({
                        scrollTop: top
                    }, 1000)
                })
                /////////////右侧固定栏效果////////////
            $rtfixedli.on('click', function() {
                $('html,body').animate({
                    scrollTop: 0
                }), 1000
            })


        }
    }

});