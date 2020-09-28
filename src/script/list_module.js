define(['jquery'], function() {
    return {
        init: function() {
            $('.bot').hide();
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
            //////////////////////////////
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
                                <p class="p2">￥ <span class="price">${elm.price}</span>0</p>
                            </div>
                        </a>
                    </div>
                    `
                        }
                    });
                    $('.cont').append(html)
                }
            });
            //////////////////////////////
            $('.menu>ul').on('mouseover', function() {
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
                ////////////////////////////////////////////////////////



        }
    }
});