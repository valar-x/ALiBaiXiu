// <!-- 实现分类列表的 数据渲染功能 -->
$.ajax({
    type: 'get',
    url: "/categories",
    success: function(res) {
        // console.log(res);
        // 使用模板引擎渲染
        var tpl = `
        {{each data}}
        <li>
          <a href="list.html?categoryId={{$value._id}}">
            <i class="fa {{$value.className}}"></i>{{$value.title}}
          </a>
        </li>
        {{/each}}
        `
        var html = template.render(tpl, { data: res })
        $("#navBox").html(html)
        $('#topnavBox').html(html)
    }
})

// 文章搜索 功能
$('.search form').on('submit', function() {
    // 获取用户在表单中输入的关键字
    var keys = $(this).find('.keys').val()
        // 跳转到搜索结果页面
    location.href = '/search.html?key=' + keys
    return false
})

//  获取随机推荐 功能、在index/list/detail都有写在公共文件中调用
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function(res) {
        // console.log(res);//关于文章的随机数组
        // 使用es6中模板字符串
        var randomTpl = `
                    {{each data}}
                    <li>
                        <a href="detail.html?id={{$value._id}}">
                            <p class="title">{{$value.title}}</p>
                            <p class="reading">阅读({{$value.meta.views}})</p>
                            <div class="pic">
                                <img src="{{$value.thumbnail}}" alt="">
                            </div>
                        </a>
                    </li>
                    {{/each}}
                    `
        var html = template.render(randomTpl, { data: res })
        $('.random').html(html)

    }
})

// 获取最新评论功能 在index/list/detail都有写在公共文件中调用
$.ajax({
        type: 'get',
        url: '/comments/lasted',
        success: function(res) {
            // console.log(res); //有关最新评论数据的shu组
            // 使用es6中模板字符串
            var discuzTpl = `
        {{each data}}
                     <li>
                        <a href="javascript:;">
                            <div class="avatar">
                                <img src="{{$value.author.avatar}}" alt="">
                            </div>
                            <div class="txt">
                                <p>
                                    <span>{{$value.author.nickName}}</span>{{$imports.dateformat($value.createAt)}}评论:
                                </p>
                                <p>{{$value.content}}</p>
                            </div>
                        </a>
                    </li>
           {{/each}}
        `
                // template.render(模板变量名，数据对象格式)
            var html = template.render(discuzTpl, { data: res })
            $('.discuz').html(html)
        }
    })
    // 时间格式的函数封装
function dateformat(str) {
    var date = new Date(str) //Wed Dec 11 2019 08:00:00 GMT+0800 (中国标准时间)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}