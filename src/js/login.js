class Log {
    constructor() {
        this.init();
        this.addEvent();
    }
    init() {
        $(function () {
            // 1.点击注册，跳转注册页
            $('.register').click(function () {
                location.href = 'register.html';
            })
            //2.普通登录与手机登录切换

            let tab = $('.tabs_container .tabs_content');
            let tabs = $('.tabs_container .nc_login_mode');
            $('.tabs_nav li #login_two').click(function () {
                $(this).addClass('tabulous_active');
                $('#login_one').removeClass('tabulous_active');

                //form表切换
                tab.animate({ left: -420 }, 300, function () {
                    tabs.animate({ left: 0 });
                })
            })
            $('.tabs_nav li #login_one').click(function () {
                $(this).addClass('tabulous_active');
                $('#login_two').removeClass('tabulous_active');
                //form表切换
                tabs.animate({ left: -420 }, 300, function () {
                    tab.animate({ left: 70 });
                })
            })

            //3.验证码遮罩层
            $('.code_div span').mouseover(function () {
                $('.makecode').css("display", "block");
            })
            $('.code_div span').mouseout(function () {
                $('.makecode').css("display", "none");
            })

            //4. 得焦时 默认文字消失  出现边框   失焦时 默认文字出现  边框消失
            //  普通登录页
            $('.login_form dl dd .text').each(function () {

                $(this).on({
                    'focus': function () {
                        $(this).parent().parent().css({ 'border': '1px solid #7ABD54' });
                        $(this).attr({
                            "placeholder": ''
                        });
                    },
                    'blur': function () {
                        $(this).parent().parent().css({ 'border': 'solid 1px #CCC' });
                    }
                })
            })
            //  手机登录页
            $('.nc_login_mode dl dd .text').each(function () {

                $(this).on({
                    'focus': function () {
                        $(this).parent().parent().css({ 'border': '1px solid #7ABD54' });
                        $(this).attr({
                            "placeholder": ''
                        });
                    },
                    'blur': function () {
                        $(this).parent().parent().css({ 'border': 'solid 1px #CCC' });
                    }
                })
            })
        })
    }
    addEvent() {
        //设置开关  
        let arr = [false, false];
        //1.判断用户名
        $('#user_name').blur(function () {
            // alert(this);
            let uname = $('#user_name').val();
            let reg = /^[\u4e00-\u9fa5\w]{3,15}$/;
            if (reg.test(uname)) {
                arr[0] = true
                // console.log(arr);
            } else {
                alert('请输入正确的用户名格式！');
                arr[0] = false;
            }
        })
        //2.判断密码
        $('#password').blur(function () {
            let upwd = $('#password').val();
            let reg = /^\w{6,20}$/;
            if (reg.test(upwd)) {
                arr[1] = true;
            } else {
                // alert('请输入正确的密码格式！');
                arr[1] = false;
            }
        })
        //3.后端验证
        $('.submit_div .submit').click(function(){
            let uname = $('#user_name').val();
            let upwd = $('#password').val();
            // console.log(uname, upwd);
            //判断是否合法
            if(arr.indexOf(false) === -1){
                let storage = window.localStorage;
                let storage_str = storage.getItem('user');
                let storage_obj = strToObj(storage_str);
                 //判断当前输入的用户名在不在localStorage中
                if(uname in storage_obj){
                    //用户名存在 则判断输入的密码与localStorage中的密码是否一致 一致就登陆成功  否则失败
                    if(upwd === storage_obj[uname]){
                        alert('登录成功！')
                        //登录成功 跳转首页
                        location.href = '../index.html';
                    }else{
                        alert('密码错误！')
                    }
                }else{
                    alert('用户名不存在，请去注册！！！');
                }
            }else{
                alert('请输入正确的用户名或者密码！！！');
            }
        })
    }
}
new Log();
function strToObj(str) {
    if (!str) {
        return {};
    } else {
        return JSON.parse(str);
    }
}