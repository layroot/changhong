define(['jquery', 'cookie'], function() {
    return {
        init: function() {
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

                }
            });

            //////////////////////////////
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
                ////////////////////////////////主体js////////////////////////
                ////////////////渲染/////////////////////



            // let sid = location.search.slice(5)
            let sid = location.search.split('=')[1]


            $.ajax({
                type: "get",
                url: "http://127.0.0.1/changhong/php/detail.php",
                data: { sid: sid },
                dataType: "json",
                success: function(response) {

                    response.forEach(
                        function(elm, i) {
                            ///图片区///////////////
                            $('.small img').attr('src', elm.url)
                            let html = ``
                            let arr = elm.piclisturl.split(',')
                            arr.forEach(function(elm, i) {
                                html += `<li><img src="${elm}"></li>`
                            })
                            $('.piclist ul').html(html)
                            $('.big img').attr('src', elm.url)
                            $('.piclist ul').on('click', 'li', function() {
                                    let lisrc = $(this).find('img').attr('src')
                                    $('.big img').attr('src', lisrc)
                                    $('.small img').attr('src', lisrc)
                                })
                                /////////详情区/////////////////
                            $('.title').html(elm.title)
                            $('.detail').html(elm.detail)
                            $('.price').html(elm.price)

                            // $('.shopnum').attr('data-id', elm.number)//无法获取到动态添加的标签值
                            // $('.shopnum')[0].setAttribute('data-id', elm.number)
                        }

                    )



                }
            });
            ////////////放大镜///////////////////////
            let spic = $('.small')
            let bpic = $('.big')
            let sfang = $('.movebox')
            let bfang = $('.big img')
            spic.on('mouseover', function() {

                sfang.show()
                bpic.show()
                sfang.css({
                    height: (spic.height() * bpic.height() / bfang.height()) + 'px',
                    width: (spic.width() * bpic.width() / bfang.width()) + 'px'
                })
                spic.on('mousemove', function(ev) {
                    sfang.show()
                    bpic.show()

                    let left = ev.pageX - spic.offset().left - sfang.width() / 2;
                    let top = ev.pageY - spic.offset().top - sfang.height() / 2;

                    if (left <= 0) {
                        left = 0
                    } else if (left >= spic.width() - sfang.width()) {
                        left = spic.width() - sfang.width()
                    }
                    if (top <= 0) {
                        top = 0
                    } else if (top >= spic.height() - sfang.height()) {
                        top = spic.height() - sfang.height()
                    }
                    let ridio = spic.width() / sfang.width()
                    bfang.css({
                        left: -ridio * left + 'px',
                        top: -ridio * top + 'px'
                    })
                    sfang.css({
                        left: left + 'px',
                        top: top + 'px'
                    })
                })


            })
            spic.on('mouseout', function(ev) {
                    bpic.hide()
                    sfang.hide()
                })
                //////////////////////////////////////////////////
            let leftb = $('.piclistbox .left') //按钮左
            let rightb = $('.piclistbox .right') //按钮右
            let len = 4
            let piclen = $('.piclistbox ul li').length
            let picwd = $('.piclistbox ul li').width() + 12
            let picbox = $('.piclistbox ul')
            hid()

            function hid() {
                if (len <= 4) {
                    leftb.css({ color: '#fff' })
                }

                if (piclen <= len) {
                    rightb.css({ color: '#fff' })
                }
            }

            rightb.on('click', function() {
                if (piclen > len) {
                    len++
                    leftb.css({
                        color: '#000'
                    })
                    if (len == piclen) {
                        rightb.css('color', '#fff')
                    }

                }
                picbox.stop(true).animate({
                    left: -(len - 4) * picwd
                })
            })
            leftb.on('click', function() {
                    if (len > 4) {
                        len--
                        rightb.css({
                            color: '#000'
                        })
                        if (len == 4) {
                            leftb.css('color', '#fff')
                        }

                    }

                    picbox.stop(true).animate({
                        left: -(len - 4) * picwd
                    })
                })
                //////////。。///购物车///////////////
            function addshop(id, num) {
                let shop = cookie.get('shop')
                prop = {
                    id: id,
                    num: num
                }
                if (shop) {
                    shop = JSON.parse(shop)
                    if (shop.some(elm => elm.id == id)) {
                        shop.forEach(function(elm) { elm.id == id ? elm.num = num : null })
                    } else {
                        shop.push(prop)
                    }
                } else {
                    shop = []
                    shop.push(prop)

                }
                cookie.set('shop', JSON.stringify(shop), 1)
            }
            /////add///////
            $('.cart').on('click', function() {
                addshop(sid, $('.shopnum').val(attr))
            })


            // console.log(number)

            $('.add').on('click', function() {
                let num = parseInt($('.shopnum').val())
                if (num < 30) {
                    $('.shopnum')[0].value = num + 1
                } else if (num = 30) {
                    alert('一次选货不能超过30')
                }

            })


            $('.reduce').on('click', function() {
                let num = parseInt($('.shopnum').val())
                if (num > 0) {
                    $('.shopnum')[0].value = num - 1

                }

            })
        }
    }
});