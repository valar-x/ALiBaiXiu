// 获取热门推荐数据 实现模板拼接
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function(res) {
        // console.log(res);
        commendTpl = `
                    {{each data}}
                    <li>
                    <a href="detail.html?id={{$value._id}}">
                        <img src="{{$value.thumbnail}}" alt="">
                        <span>{{$value.title}}</span>
                    </a>
                    </li>
                    {{/each}}
                    `
        var html = template.render(commendTpl, { data: res })
        $("#recommendBox").html(html)

    }
})