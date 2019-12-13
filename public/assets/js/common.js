// 退出功能
$('#logout').on('click', function() {
    // 确认是否真的退出？
    var isConfirm = confirm(' 您确定要退出吗？')
        // confirm(' 您确定要退出吗？')返回一个布尔值 确定true取消false
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function(res) {
                // console.log(res);
                location.href = 'login.html'

            }
        })
    }
})

// 向服务器发送请求 获取登录用户的信息
$.ajax({
    type: 'get',
    url: '/users/' + userId, //在获取用户登录状态的时候返回值有一个userid 因为每个页面都有这个接口所以可以直接调用它的返回值
    success: function(res) {
        // console.log(res);
        $(".avatar").attr('src', res.avatar) //将图片显示在页面中
        $(".profile .name").html(res.nickName) //将用户名打印在页面中
    }
})