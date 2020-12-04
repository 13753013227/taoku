//吸顶侧边栏 nav_box
window.onload = function(){
    $(window).scroll(function(){
        var scroll_top = document.documentElement.scrollTop;
        // console.log(scroll_top);
        if(scroll_top <= 800){
            $('.nav_box').css({opacity: 0})
            
        }else{
            $('.nav_box').css({opacity: 1});
        }
    })
     //jq实现
        $('.nav_h_1').click(function(){
            $('body,html').animate({
                'scrollTop': '1200px'
              }, 500);
        })

     //原生实现       
        // var nav_h_1 = document.querySelector('.nav_h_1');
        // console.log(scroll_top);
        // nav_h_1.onclick = function (){
        //     // alert(1);
        //     document.documentElement.scrollTop = 1200;
        // }
}