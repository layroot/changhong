define(['jquery', 'cookie'], function() {
    return {
        init: function() {
            $('#username').on('input', function() {
                let reg = /^[A-z][\w]{5,17}$/
                let res = reg.test($('#username').val())
                if (res) {
                    $('.usernames').text('格式正确')
                    $.ajax({
                        type: "get",
                        url: "http://127.0.0.1/changhong/php/yz.php",
                        data: {
                            username: $('#username').val()
                        },
                        dataType: "json",
                        success: function(response) {

                            if (response.yz) {
                                $('#username').attr('data-pass', true);
                                $('.usernames').text('用户名可以使用')
                            } else {
                                $('#username').attr('data-pass', false);
                                $('.usernames').text('用户名已存在')
                            }
                        }
                    });

                } else {
                    $('#username').attr('data-pass', false);
                    $('.usernames').text('格式错误')

                }
                cheak()
            })
            $('#phone-num').on('input', function() {
                let reg = /^1[3-9]\d{9}$/
                let res = reg.test($('#phone-num').val())
                if (res) {
                    $('.phones').text('格式正确')
                    $(this).attr('data-pass', true);
                } else {
                    $('.phones').text('格式错误')
                    $(this).attr('data-pass', false);
                }
                cheak()

            })
            $('#password').on('input', function() {
                let arr = [
                    /^.{6,16}$/,
                    /\d+/,
                    /[a-z]+/,
                    /[A-Z]+/,
                    /\W+/
                ]
                let res = arr.map(function(val) {
                    return val.test($('#password').val())
                })

                let jishu = res.reduce(function(obj, cur) {
                    cur && obj.count++
                        return obj
                }, { count: 0 })
                if (res[0]) {
                    $(this).attr('data-pass', true);
                    switch (jishu.count) {
                        case 1:
                        case 2:
                            $('.passwords').text('密码太简单');
                            break;
                        case 3:
                            $('.passwords').text('弱');
                            break;
                        case 4:
                            $('.passwords').text('中');
                            break;
                        case 5:
                            $('.passwords').text('强');
                    }
                } else {
                    $(this).attr('data-pass', false);
                }
                cheak()
            })
            $('#repassword').on('input', function() {
                if ($(this).val() == $('#password').val()) {
                    $('.repasswords').text('密码一致')
                    $(this).attr('data-pass', true);
                } else {
                    $('.repasswords').text('密码不一致')
                    $(this).attr('data-pass', false);
                }
                cheak()
            })
            $('.ck').on('click', function() {
                if ($(this).prop('checked')) {
                    $(this).attr('data-pass', true);
                } else {
                    $(this).attr('data-pass', false);
                }
                cheak()
            })

            function cheak() {
                if ($('[data-pass=true]').length == 5) {
                    $('#btn').removeAttr('disabled');
                    $('#btn').css('background-color', '#ed1c24');
                } else {
                    $('#btn').css('background-color', 'gray');
                    $('#btn').attr('disabled', 'disabled');
                }
            }

            $('#btn').on('click', function() {
                console.log(1)
                $.ajax({
                    type: "get",
                    url: "http://127.0.0.1/changhong/php/registry.php",
                    data: {
                        username: $('#username').val(),
                        phone: $('#phone-num').val(),
                        password: $('#password').val()
                    },
                    dataType: "json",
                    success: function(response) {
                        location.href = "http://127.0.0.1/changhong/src/registry.html"

                    }
                });
            })

        }
    }

});