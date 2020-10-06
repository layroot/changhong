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
                                <input type="checkbox" class="ck">
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
                                <a href="">X</a>
                            </div>
                        </div>`
                        })
                        $('.shangpin').html(html)

                        //全选
                        let $all = $('.all')

                        $all.click(function() {
                            $('.shangpin').find('.ck').prop('checked', $(this).prop('checked'));
                        });
                        $('.shangpin').on('click', '.ck', function() {
                                if ($('input:checked').not('.all').length == $('.shangpin').find('.ck').length) {
                                    $all.prop('checked', true)
                                } else {
                                    $all.prop('checked', false)
                                }
                            })
                            //添加功能
                        $('.shangpin').on('click', '.add', function() {

                            let num = parseInt($(this).prev().val())
                            let price = parseInt($(this).parents('.cart-item').find('.price').children().text().slice(1))

                            $(this).prev()[0].value = num + 1
                            $(this).parents('.cart-item').find('.subtotal').children().html('￥' + (num + 1) * price + '00')
                        })

                    }
                });
            }






        }
    }
});