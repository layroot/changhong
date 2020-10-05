define(['jquery', 'pagination', 'jlazyload'], function() {
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
                        // console.log(html)
                }
            });
            //////////////////////////////

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
            $.ajax({
                    type: "get",
                    url: "http://127.0.0.1/changhong/php/goods.php",
                    dataType: "json",
                    success: function(response) {
                        $page = Math.ceil(response.length / 8)
                            // console.log($page)
                    }
                })
                ////////////////////////渲染////////////////////////////////
            $.ajax({
                type: "get",
                url: "http://127.0.0.1/changhong/php/listdata.php",
                dataType: "json",
                success: function(response) {

                    // console.log(response)
                    let html = ``
                    response.forEach(function(elm, i) {

                        html += ` <div class="contitem">
                            <a href="../src/detail.html?sid=${elm.sid}">
                                <img src="${elm.url}" alt="">
                                <div class="text">
                                <span class="title">${elm.title}</span>
                                <p class="detail">${elm.detail}</p>
                                    <p class="p2">￥ <span class="price">${elm.price}</span>0</p>
                                    <p class="p3">月售:<span class="sailnumber">${elm.sailnumber}</span><p>
                                    </div>
                            </a>
                        </div>
                        `

                    });
                    $('.cont').html(html)
                    arr = [];
                    arr_def = [];
                    prev = null;
                    next = [];
                    $('.cont .contitem').each(function(i, elm) {
                            arr[i] = ($(this))
                            arr_def[i] = ($(this))
                        })
                        // arr.forEach(function(elm, i) {
                        //     console.log($(elm).find('.price').html())
                        //     $('.cont').append(elm)
                        // })


                }
            });

            ///////////////////////////分页//////////////
            $('.pagelist').pagination({
                pageCount: 4, //总的页数
                jump: true, //是否开启跳转到指定的页数，布尔值。
                coping: true, //是否开启首页和尾页，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                homePage: '首页',
                endPage: '尾页',
                callback: function(api) {

                    $.ajax({
                        type: "get",
                        url: "http://127.0.0.1/changhong/php/listdata.php",
                        data: {
                            page: api.getCurrent()
                        },
                        dataType: "json",
                        success: function(response) {
                            let html = ``
                            response.forEach(function(elm, i) {

                                html += ` <div class="contitem">
                                    <a href="../src/detail.html?sid=${elm.sid}">
                                        <img src="${elm.url}" alt="">
                                        <div class="text">
                                        <span class="title">${elm.title}</span>
                                        <p class="detail">${elm.detail}</p>
                                            <p class="p2">￥ <span class="price">${elm.price}</span>0</p>
                                            <p class="p3">月售:<span class="sailnumber">${elm.sailnumber}</span><p>
                                        </div>
                                    </a>
                                </div>
                                `

                            });
                            $('.cont').html(html)
                            arr = [];
                            arr_def = [];
                            prev = null;
                            next = [];
                            $('.cont .contitem').each(function(i, elm) {
                                arr[i] = ($(this))
                                arr_def[i]($(this))
                            })


                        }
                    });
                }
            })
            $('.listtop ul li').on('click', function() {
                $(this).css('background-color', '#f12020').siblings().css('background-color', '#efefef')
            })
            $('.defbt').on('click', function() {
                    arr_def.forEach(function(elm, i) {
                        $('.cont').append($(elm))
                    })
                })
                //////////////价格排序/////////////////
            $('.pricebt').on('click', function() {
                    for (i = 0; i < arr.length - 1; i++) {
                        for (j = 0; j < arr.length - i - 1; j++) {
                            prev = parseFloat($(arr[j]).find('.price').html())
                            next = parseFloat($(arr[j + 1]).find('.price').html())
                            if (prev < next) {
                                temp = arr[j]
                                arr[j] = arr[j + 1]
                                arr[j + 1] = temp
                            }
                        }
                    }
                    console.log(arr[2])
                    arr.forEach(function(elm, i) {

                        $('.cont').append(elm)
                    })
                })
                //////////////销量排序/////////////////
            $('.salebt').on('click', function() {
                for (i = 0; i < arr.length - 1; i++) {
                    for (j = 0; j < arr.length - i - 1; j++) {
                        prev = parseFloat($(arr[j]).find('.sailnumber').html())
                        next = parseFloat($(arr[j + 1]).find('.sailnumber').html())
                        if (prev < next) {
                            temp = arr[j]
                            arr[j] = arr[j + 1]
                            arr[j + 1] = temp
                        }
                    }
                }

                arr.forEach(function(elm, i) {
                    $('.cont').append(elm)
                })
            })

        }
    }
});