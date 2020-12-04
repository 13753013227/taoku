class Log{
    constructor(){
        this.init();
    }
    init(){
        $(function(){
            // 1.点击注册，跳转注册页
            $('.register').click(function(){
                location.href = 'register.html';
            })
            //2.普通登录与手机登录切换
            
            let tab = $('.tabs_container .tabs_content');
            let tabs = $('.tabs_container .nc_login_mode');
            $('.tabs_nav li #login_two').click(function(){
                $(this).addClass('tabulous_active');
                $('#login_one').removeClass('tabulous_active');

                //form表切换
                tab.animate({left : -420},300,function(){
                    tabs.animate({left : 0});
                })
            })
            $('.tabs_nav li #login_one').click(function(){
                $(this).addClass('tabulous_active');
                $('#login_two').removeClass('tabulous_active');
                //form表切换
                tabs.animate({left : -420},300,function(){
                    tab.animate({left : 70});
                })
            })

            // 3.点击用户登录，跳转首页
            // $('.submit').click(function(){
            //     location.href = '../index.html';
            // })
        })
    }
}
new Log();