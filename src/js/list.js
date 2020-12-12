class List{
  constructor(){
    this.init();
  }
  init(){
    //添加事件
    this.addEvent();
  }
  strToObj(str){
    if(!str){
        return {};
    }else{
        return JSON.parse(str);
    }
  }
  addEvent(){
    // 获取所有商品的 +  -  按钮   输入框   加入购物车按钮
    let red =  $('.red');
    let add = $('.add');
    let inp = $('.inp');
    let btn =  $('.goods-buy span');
    //遍历 + 按钮 给每个按钮添加点击事件 
    add.each(function(i,v){
      $(v).click(function(){
        //取出inp框里的value值 然后 ++ 再赋值回去
        let n = $(inp[i]).attr("value");
        n++;
        $(inp[i]).attr("value",n);
      })
    })
    //遍历 - 按钮 给每个按钮添加点击事件 
    red.each(function(i,v){
      $(v).click(function(){
        //取出inp框里的value值 然后 -- 再赋值回去
        let n = $(inp[i]).attr("value");
        if(n < 2 ){
          $(inp[i]).attr("value",1);
        }else{
          n--;
          $(inp[i]).attr("value",n);
        }        
      })
    })
    //遍历btn按钮 给每个按钮添加点击事件 分别获取商品信息 然后加入购物车
    btn.each(function(i,v){
      $(v).click(function(){
        let n =  $(inp[i]).attr("value");
        //获取商品id
        let x_id = $(this).parents('li').attr("data-goods-id");
        // console.log(x_id);
         //获取商品name
         let x_name = $(this).parents("li").find("a p").text();
        // let g_name = $(this).parent().prev().prev().children().text();
        // console.log(x_name)
        //获取src
        let x_img = $(this).parents("li").find("a img").attr('src');
        // console.log(x_img);
        //获取价格
        let x_price = $(this).parent().prev().text();
        // console.log(x_price);
        /*
        key :  box
        value:
          {      
            "sp1" : {
              "name" : "红酒",
              "price" : 999,
              "src" : "....",
              "num" : 3
            },
            "sp2" : {
              "name" : "干红",
              "price" : 888,
              "src" : "....",
              "num" : 3
            }
          }
          let obj = {};
          obj['gld'] = 'sb';
          console.log(obj);
        */
        //判断当前要购买的商品是否在购物车中，找到之前的商品数量++  添加都购物车中
        //获取本地数据
        let storage = window.localStorage;
        let storage_str = storage.getItem('box');
        let storage_obj = strToObj(storage_str);
        // console.log(storage_obj);
        if(x_id in storage_obj){
          storage_obj[x_id].num = n ;
        }else{
          storage_obj[x_id] = {
            "name" : x_name,
            "price": x_price,
            "src" : x_img,
            "num" : n
          }
        }
        storage.setItem('box',JSON.stringify(storage_obj));
        //加购成功之后  弹出提示框
        $('.go-cart').css("display" , "block")
      })
    })
    //关闭提示框
    $('.close').click(function(){
      $('.go-cart').css("display","none");
    })

  }
}
new List();
function strToObj(str){
  if(!str){
      return {};
  }else{
      return JSON.parse(str);
  }
}
$(function(){
  
  //列表也的分页
    $("#pagination1").pagination({
      currentPage: 1,
      totalPage:12,
    callback: function(current) {
      $("#current1").text(current)
    }
      });
      $("#getPage").on("click", function() {
    var info = $("#pagination3").pagination("getPage");
    alert("当前页数：" + info.current + ",总页数：" + info.total);
    });

    $("#setPage").on("click", function() {
    $("#pagination3").pagination("setPage", 1, 10);
    });
})
