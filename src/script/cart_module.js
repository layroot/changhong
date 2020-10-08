define(['jquery', 'cookie'], function() {
    return {
        init: function() {

            //渲染

            let shop = cookie.get('shop')
                //console.log(shop)
            if (shop) {
                shop = JSON.parse(shop)
                let idList = shop.map(elm => elm.id).join();
                //console.log(idList)
                $.ajax({
                    type: "get",
                    url: "http://127.0.0.1/changhong/php/cart.php",
                    data: {
                        idList: idList
                    },
                    dataType: "json",
                    success: function(response) {
                        //console.log(1)
                        let html = ``
                        response.forEach(function(elm, index) {
                            // console.log(elm)
                            let sp = shop.filter(val => val.id == elm.sid)
                                //console.log(sp)
                            html += `<div class="cart-item">
                            <div class="select">
                            
                              <span class="cheack"></span>
                            </div>
                            <div class="images">
                                <img src="${elm.url}" alt=""><span></span>
                            </div>
                            <div class="name">
                                <p>${elm.title}</p>
                            </div>
                            <div class="price">
                                <span>￥${elm.price}</span>
                            </div>
                            <div class="num">
                                <div class="edit">
                                    <a href="javascript:;" class="reduce">-</a>
                                    <input type="text" value="${sp[0].num}" min="1"  readonly class="${elm.price}">
                                    <a href="javascript:;" class="add">+</a>
                                </div>
                            </div>
                            <div class="subtotal">
                                <span>￥${(elm.price*sp[0].num).toFixed(2)}</span>
                            </div>
                            <div class="del">
                            <a href="javascript:;"class="T${elm.id}">X</a>
                            </div>
                        </div>`
                        })
                        $('.shangpin').html(html)


                        ////////////////////////添加功能
                        $('.shangpin').on('click', '.add', function() {
                            let num = parseInt($(this).prev().val())
                            let price = parseInt($(this).parents('.cart-item').find('.price').children().text().slice(1))
                            $(this).prev()[0].value = num + 1
                            $(this).parents('.cart-item').find('.subtotal').children().html('￥' + (num + 1) * price + '.00')
                            allitem()
                            sum()
                            jiesuan()
                            qx()
                            already()
                        })

                        /////////////////全选
                        $('.all').on('click', function(ev) {
                            console.log(1)
                            let qx = $(ev.target).attr('class').slice(5)
                            if (qx) {
                                $(ev.target).removeClass('allc');
                                $('.cheack').removeClass('cheackred')
                            } else {
                                $(ev.target).addClass('allc');
                                $('.cheack').addClass('cheackred')
                            }
                            allitem()
                            sum()
                            jiesuan()

                            already()
                        })

                        $('.shangpin').on('click', '.cheack', function(ev) {
                            allitem()
                            $(ev.target).toggleClass('cheackred')
                            sum()
                            jiesuan()
                            qx()
                            already()
                        })

                        //////////////////////////全部商品数量
                        function allitem() {
                            let all = 0
                            $('.cart-item').each(function(i, elm) {
                                all += parseInt($(elm).find('.edit').find('input').val())
                            })
                            $('.jishu').html(all)
                        }
                        allitem()
                            ////////////////////总价函数////////////////////
                        function sum() {
                            let zj = 0
                            $('.cheackred').each(function(i, elm) {
                                zj += parseInt($(elm).parents('.cart-item').children('.subtotal').children().text().slice(1))
                            })
                            $('.cart-foot').children('.rt').children('.total').text('￥' + zj + '')

                        }
                        //////////////按钮红色函数/////////////////////////
                        function jiesuan() {
                            if ($('.cheackred').length > 0) {
                                $('.btn').addClass('red')
                            } else {
                                $('.btn').removeClass('red')
                            }
                        }
                        //////////////////全选函数////////////////
                        function qx() {
                            let quan = $('.cheackred').length
                            let cooklength = JSON.parse(cookie.get('shop')).length
                            console.log(quan, cooklength)
                            if (quan == cooklength) {
                                $('.all').addClass('allc');

                            } else {
                                $('.all').removeClass('allc');
                            }
                        }

                        /////////////////已选数量//////////////////////
                        function already() {
                            let shu = 0
                            $('.cheackred').each(function(i, elm) {
                                shu += parseInt($(elm).parents('.cart-item').children('.num').children('.edit').children('input').val())
                            })
                            $('.cart-foot').children('.lf').children('.arealy-select').html(shu)
                        }
                        //////////////删除功能///////////////
                        $('.shangpin').on('click', '.del', function(ev) {
                            console.log(1)
                            this.parentNode.parentNode.removeChild(this.parentNode)
                            shop = cookie.get("shop");
                            shop = JSON.parse(shop);
                            let did = $(ev.target).attr('class').slice(1)
                            if (shop.some(elm => elm.id == did)) {
                                shop = shop.filter(elm => elm.id != did);
                                cookie.set('shop', JSON.stringify(shop), 1)
                            }
                            already()
                        })
                    }
                });
            }






        }
    }
});