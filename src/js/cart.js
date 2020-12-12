class Cart{
  constructor(){
    //初始化获取本地数据   然后加载到购物车页面
    this.initCart();
    this.addEvent();
    this.initPrice();
  }
  initCart(){
    //获取table
    let table = $('.buy-goods');
    //获取本地数据
    let storage = window.localStorage;
    let storage_str = storage.getItem('box');
    let storage_obj = strToObj(storage_str);
    // console.log(storage_obj);
    for(let key in storage_obj){
      let g = storage_obj[key];
      //创建商品信息
      table[0].innerHTML += `<tbody data-goods-id="${key}">
      <tr>
        <td class="good-pic">
          <a href="javascript:;">
            <img src="${g.src}" alt="">
          </a>
        </td>
        <td class="good-txt">
          <a href="javascript:;">${g.name}</a>
        </td>
        <td>${g.price}</td>
        <td>
          <div class="good-num">
            <a href="javaScript:;" class="red">-</a>
            <input type="text" value="${g.num}" class="inp">
            <a href="javaScript:;" class="plus">+</a>
          </div>
        </td>
        <td>￥0.00</td>
        <td>999</td>
        <td class="good-total-price">${g.price}</td>
        <td class="operate">
          <a href="javascript:;">删除</a>
        </td>
      </tr>
    </tbody>`;
    }
  }
  addEvent(){
    //获取元素  
    let that = this;
    let plus = $('.plus');
    let red = $('.red');
    let inp = $('.inp');
    //点击+ 商家数量++  价格++   
    plus.each(function(i,v){
      $(v).click(function(){
        //修改storage中的数量 获取商品id
        let id = $(this).parents('tbody').attr('data-goods-id');
        // console.log(id);
        //获取本地数据
        let storage = window.localStorage;
        let storage_str = storage.getItem('box');
        let storage_obj = strToObj(storage_str);

        //点击＋ inp框内值++  storage的num ++
        let n = $(inp[i]).attr('value');
        n ++ ;
        storage_obj[id].num = n ;
        $(inp[i]).attr('value',n);
        //点击＋  积分 和 小计（价格 * num）
        let price = $(this).parents('tbody').find('.good-total-price');
        // console.log(price);
        // console.log(storage_obj[id].price);
        let sum = storage_obj[id].num * storage_obj[id].price.slice(1);
        // console.log(price);
        price.text(sum.toFixed(2));
        storage.setItem('box',JSON.stringify(storage_obj));
        //修改总金额
        that.initPrice();
      })
    })
    //点击- 商品数量--  价格--
    red.each(function(i,v){
      $(v).click(function(){
        //修改storage中的数量 获取商品id
        let id = $(this).parents('tbody').attr('data-goods-id');
        // console.log(id);
        //获取本地数据
        let storage = window.localStorage;
        let storage_str = storage.getItem('box');
        let storage_obj = strToObj(storage_str);

        //点击- inp框内值--  storage的num --
        let n = $(inp[i]).attr('value');
        if(n > 1){
          n--;
          $(inp[i]).attr('value',n);
        }else{
          $(inp[i]).attr('value',1);
        }
        storage_obj[id].num = n ;
        $(inp[i]).attr('value',n);
        //点击＋  积分 和 小计（价格 * num）
        let price = $(this).parents('tbody').find('.good-total-price');
        // console.log(price);
        // console.log(storage_obj[id].price);
        let sum = storage_obj[id].num * storage_obj[id].price.slice(1);
        // console.log(price);
        price.text("￥" + sum.toFixed(2));
        storage.setItem('box',JSON.stringify(storage_obj));
        //修改总金额
        that.initPrice();
      })
    })
    //获取所有的删除键
    let dlt = $('.operate a');
    dlt.each(function(i,v){
      $(v).click(function(){
         //修改storage中的数量 获取商品id
         let id = $(this).parents('tbody').attr('data-goods-id');
         console.log(id);
         //获取本地数据
         let storage = window.localStorage;
         let storage_str = storage.getItem('box');
         let storage_obj = strToObj(storage_str);
        
         delete storage_obj[id];
         storage.setItem('box',JSON.stringify(storage_obj));
         $(this).parents('tbody').remove();
      })
    })
  }
  initPrice(){
    let money = $('.sum_money');
    let sum_money = $('.count em')
    // console.log(money);
    let storage = window.localStorage;
    let storage_str = storage.getItem('box');
    let storage_obj = strToObj(storage_str);
    // 总价
    let sum = 0;
    for(let key in storage_obj){
        sum += storage_obj[key].num * storage_obj[key].price.slice(1);
    }
    // 设置总价
    money.text(`￥${sum.toFixed(2)}`);
    sum_money.text(`￥${sum.toFixed(2)}`);
}
}

new Cart();

function strToObj(str){
  if(!str){
      return {};
  }else{
      return JSON.parse(str);
  }
}