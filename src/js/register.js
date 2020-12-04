//初始化功能
class Reg {
    constructor() {
        this.init();
        this.addEvent();
    }
    init() {
        $(function () {
            //1.点击登录，跳转登录页
            $('.register').click(function () {
                location.href = 'login.html';
            })
            //2.手机注册与普通注册 切换
            $('.tabs_nav li #default').click(function () {
                $(this).addClass('tabulous_active');
                $('.tabs_nav li #mobile').removeClass('tabulous_active');
                //form表切换
                $('.tabs_left .nc_login_mode').animate({ left: -600 }, 300, () => {

                    $('.tabs_left .nc_reginster').animate({ left: 0 }, 300);
                });
            })
            $('.tabs_nav li #mobile').click(function () {
                $(this).addClass('tabulous_active');
                $('.tabs_nav li  #default').removeClass('tabulous_active');
                //form表切换
                $('.tabs_left .nc_reginster').animate({ left: -600 }, 300, () => {

                    $('.tabs_left .nc_login_mode').animate({ left: 0 }, 300);
                });
            })

            //3.验证码遮罩层
            $('.code_div span').mouseover(function () {
                //     console.log(this);
                $('.makecode').css({ "display": "block" })
            })
            $('.code_div span').mouseout(function () {
                $('.makecode').css({ "display": " none" })
            })

            //4. 得焦时 默认文字消失  出现边框   失焦时 默认文字出现  边框消失
            //  普通注册页
            $('.reginster_form dl dd .text').each(function () {

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

            // 手机注册页
            $('.nc_login_form dl dd .text').each(function () {
                $(this).on({
                    'focus': function () {
                        $(this).parent().parent().css({ 'border': '1px solid #7ABD54' });
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
        let arr = [false, false, false, false];
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
                alert('请输入正确的密码格式！');
                arr[1] = false;
            }
        })
        //3.确认密码
        $('#password_confirm').blur(function () {
            let upwds = $('#password_confirm').val();
            let upwd = $('#password').val();
            if (upwd === upwds) {
                arr[2] = true;
            } else {
                alert('两次密码不一致！');
                arr[2] = false;
            }
        })
        //4.验证邮箱
        $('#email').blur(function () {
            let email = $('#email').val();
            let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if (reg.test(email)) {
                arr[3] = true;
            } else {
                alert('请输入正确的邮箱格式！');
                arr[4] = false;
            }
        })
        //5.验证 《服务协议》


        //6.排除空表单，判断内容是否合法,确定所有的表单都是正确的格式
        $('.submit_div').on('click', function () {

            // alert(this)
            if (arr.indexOf(false) === -1) {
                // 获取用户名和密码
                let uname = $('#user_name').val();
                let upwd = $('#password').val();
                // console.log(uname, upwd);
                /*
                key ：user
                value {
                    key : value 
                    用户名1：密码
                    ,
                    用户名2：密码
                    ,
                    用户名3：密码
                }
                */
                //获取当前本地数据
                let storage = window.localStorage;
                let storage_str = storage.getItem('user');
                let storage_obj = strToObj(storage_str);
                // console.log(storage_str);
                // console.log(storage_obj);
                //判断当前输入的用户名在不在localStorage中
                if (uname in storage_obj) {
                    alert('该用户名已存在！')
                } else {
                    //将输入的用户名和密码 存入localStorage中
                    storage_obj[uname] = upwd;
                    storage.setItem('user', JSON.stringify(storage_obj));
                    alert('注册成功');
                    //跳转至登录页
                    location.href = 'login.html';
                    $('#user_name').val('');    
                    $('#email').val('');
                }
            } else {
                alert('请完善注册信息！');
            }
        })
    }
}
new Reg()
// 字符串转对象方法
function strToObj(str) {
    if (!str) {
        return {};
    } else {
        return JSON.parse(str);
    }
}