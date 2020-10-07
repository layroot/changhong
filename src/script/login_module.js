define(['jquery'], function(require, factory) {
    return {
        init: function() {
            $('#btn').on('click', function() {
                $.ajax({
                    type: "get",
                    url: "http://127.0.0.1/changhong/php/login.php",
                    data: {
                        password: $('#password').val(),
                        username: $('#username').val()
                    },
                    dataType: "json",
                    success: function(response) {
                        if (response.cg) {
                            alert("登录成功");
                            location.href = "http://127.0.0.1/changhong/src/index.html"
                        } else {
                            alert("用户名或者密码错误");
                            $('#username').val("")
                            $('#password').val("")
                        }
                    }
                });
            })
        }
    }
});