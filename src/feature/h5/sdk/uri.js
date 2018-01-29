import { support_url } from '@h5/config/url';
import services from '@h5/services/uri';
import router from '@/router'
import { Toast } from 'vant';
//SDK处理引入
import { CART } from "@h5/sdk/index"

//store引入处理
import { pageStore } from "@h5/store/index"
import { vm } from "@/main"



const sdk = {
    /*
    *组件点击uri
    * params  {object}  {data,option}
    *
    */
    listuijump(params){
        console.log('listuijump',params);
        this.openUrl(params,'listuijump');
    },
    /*
    *控件点击uri
    * params  {object}  {data,option}
    *
    */
    widgetJump(params){
        console.log('widgetJump',params);
        this.openUrl(params);
    },
    /*
    *区分不同uri处理
    * params {object} eg {data:xxxx,option:xxxxx}
    *
    */
    openUrl(params,flog){
      let uri  =  services.getUri(params,flog),
          data =  services.parse(uri);
          console.log('控件或组件处理完成后返回的url',uri)
          console.log('控件或组件解析的url参数',data)
      if(!data || !support_url[data.key]) return;
      support_url[data.key]=='jumpPage'?
      this.regularURL[support_url[data.key]](data) :
      /*用来兼容如何方法没有声明报错*/
      (this.specicalURL[support_url[data.key]] ? this.specicalURL[support_url[data.key]](data) :this.specicalURL['emptyFuc']());
    },
    /**
    *普通uri
    */
    regularURL:{
        //执行页面跳转
         jumpPage(data){
            let params = data.params;
            console.log('regularURL----params',params);
            router.push({path:`/page`,query:  params });
            // router.push({path:`/${params.module_id}`,query:  params });
        }
      },
    /**
    *特殊uri
    */
    specicalURL:{
      emptyFuc(data){
        console.log('--------你还没有在-specicalURL--中声明你的方法');
      },
      //添加购物车
      addShoppingCart(data){
        //拿到当前详情页数据
        let detailInfo=pageStore.state.contentDetail[pageStore.state.currentDetailContentID];
        //判断是否需要显示SKU信息
        if(detailInfo.skus&&detailInfo.skus.maps&&detailInfo.skus.types){
            vm.$store.dispatch('skuStore/initSkuPanel',{data:detailInfo,optiontype:'加入购物车'})
        }else{
          //传入当前商品信息
          CART.addToCart({
            data:detailInfo,
            count:1
          }).then((tip)=>{
            Toast.success(tip);
          }).catch((err)=>{
            Toast.fail(err);
          });
        }
      },
      //立即购买
      toBuyShopping(data){
        let detailInfo=pageStore.state.contentDetail[pageStore.state.currentDetailContentID];
        if(detailInfo.skus&&detailInfo.skus.maps&&detailInfo.skus.types){
          vm.$store.dispatch('skuStore/initSkuPanel',{data:detailInfo,optiontype:'立即购买'})
        }else{
          //直接跳转详情页创建订单
          router.push({path:'/createorder',query:{
            clicktype:'detail'
          }});
        }
      },
      //我的购物车
      cart(data){
        console.log("xxx 我的购物车跳转 !",data);
        router.push({path:'/shopcart'});
      },
      // 搜索
      search(data){
        console.log('我是搜索',data)
        /*用来判断是否开启搜索功能*/
        let hasSearch = pageStore.state.initFitstDataCollection.hasSearch;
        if(!hasSearch)return;
        router.push({path:'/search'});
      },
      //我的订单
      orderlist(data){
        console.log("xxxxx 我的订单页跳转！",data);
        router.push({path:'/orderlist'});
      },
      //个人信息--我的购物车
      mine(data){
        router.push({path:'/mine'});
      },
      commenturl(data){
        console.log("评论列表:",data)
        router.push({path:'/comment'});
      },
      //关于我们
      aboutus(data){
        router.push({path:'/about'});
      },
      //显示地图和位置
      map(data){
          let obj = JSON.parse(data.params.destination);
        console.log('obj',obj)
        router.push({path:'/map',query:obj});
      },
      // 评论样式
      editor(data){
        let componentName = `comment_${data.originparams}`,
        contentIds = data.params.content_id;
        router.push({path:'/comment_style',query:{componentName:componentName,content_id:contentIds}});
      }
    }
}

export default sdk
