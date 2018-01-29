import Api from '@h5/api/index'
import utils from "@h5/services/utils"
import MATH from '@/sdk/math'

const SDK = {
    //获取购物车信息
    getShopCartList(){
        return new Promise((resolve,reject)=>{
            Api.getCartInfo().then( response => {
                let cartlist=response.data.result.valid;
                cartlist.forEach(store => {
                    //将图片对象转换成链接
                    store.items.forEach((item,index)=>{
                        if(item.image_url) item['indexpic_url']=utils.getImgUrl(item.image_url);
                    })
                });
                resolve(response);
            });
        });
    },
    //计算总价(显示用)
    calculator(cartlist){
        let totalprice = 0;
        cartlist.forEach( store => {
            store.items.forEach( product => {
                if(product.checked || product.number){
                  let tempMulResult= MATH.mul(product.number,product.discount_price)
                  totalprice=MATH.add(totalprice,tempMulResult);
                } 
            })
        })
        return Number(totalprice);
    },
    //添加购物车商品
    addToCart(shopinfo){
        console.log("xxx 加入购物车传入的初始数据!",shopinfo);
        let _this=this;
        return new Promise((resolve,reject)=>{
            if(!shopinfo){
                reject('没有商品信息!');
                return;
            }
            //保存下添加的数量
            _this.oldAddCount=shopinfo.count==0?0:shopinfo.count-1;
            let data=shopinfo.data,
                count= Number(shopinfo.count-_this.oldAddCount);
            
            //组织参数
            let params={
                product :data.id,
                number : count
            }
            //判断是否具有SKU_ID vantUI生成的对象
            if(data.vant_sku_submit){
              let sku_id=data.vant_sku_submit.selectedSkuComb.id;  
              params['sku_id']=sku_id;
            } 
            //请求接口
            Api.addCartInfo({data:params}).then((res)=>{
                let result=res.data;
                console.log("xxx 加入购物车返回的数据",result);
                if(Number(result.error_code)==0){
                    resolve('加入成功!')
                }else{
                    reject('加入失败!')
                }
            });
        });
    },
    //编辑购物车商品
    editCartInfo(shopinfo){
        return new Promise((resolve,reject)=>{
            if(!shopinfo){
                reject('没有商品信息!');
                return;
            }
            let data=shopinfo.data,
                count=shopinfo.count;
            //组织参数
            let params=[{
                id: data.shopcart_id,
                number: count
            }]
            //请求接口
            Api.editCartInfo({data:params}).then((res)=>{
                let result=res.data;
                console.log("xxx 编辑购物车返回的数据",result);
                if(Number(result.error_code)==0){
                    resolve('编辑成功!')
                }else{
                    reject('编辑失败!')
                }
            });
        });
    },
    //删除购物车商品
    removeCartInfo(ids){
        return Api.removeCartInfo({'data':ids});
    },
    //调整整个SKU面板数据
    initSkuPanel({data, optiontype}){
        console.log("lll 开始执行sku面板的初始化！");
        //获取参数
        let maps=data.skus.maps,
            types=data.skus.types,
            newSkuObj={},newGoods={};
        //组织展示类数据   
        let tree=[],firstTypeKey=[];
        types.forEach((type,parentIdx)=>{
            console.log("llll",type);
            let parentObj={};
            parentObj['k']=type.k;
            parentObj['v']=[];
            //遍历每个种类的值
            type.values.forEach((item,index)=>{
                //区分是否是第一个规格的值 如果是的话需要在遍历map时候加入当前对象
                if(parentIdx==0) firstTypeKey.push(item.vid);

                parentObj['v'].push({
                    id:item.vid,
                    name:item.v
                }); 
            });
            parentObj['k_s']=type.kid;
            tree.push(parentObj);
        });
        //组织规格类数据
        let list=[];
        for(let map of maps){
            let tempObj={
                id:map.sku_id,
                price:map.price*100, //有赞里的SKU面板是分作单位的 划算成元
            }
            //注入第一个规格的图像参数
            if(firstTypeKey.length){
                //tree[0].v 代表第一个规格里的种类数组
                firstTypeKey.forEach((vid,index)=>{
                    if(map.properties_name_list[0].vid==vid){
                        tree[0].v.forEach((item,index)=>{
                           item['imgUrl']=utils.getImgUrl(map.image);
                        });
                    }
                });
            }
            //组织内部规格对应关系
            map.properties_name_list.forEach((item,index)=>{
                tempObj[item.kid]=item.vid
            })
            //每个规格下对应的库存
            tempObj['stock_num']=map.quantity;
            list.push(tempObj)
        }
        newSkuObj['tree']=tree;
        newSkuObj['list']=list;
        newSkuObj['price']=data.unit_price.now;// 默认价格（单位元）
        newSkuObj['stock_num']=data.num;//商品总库存
        newSkuObj['stock_num']=data.num;//商品总库存
        newSkuObj['hide_stock']=false;//是否隐藏剩余库存
        newSkuObj['none_sku']=false;//是否无规格商品
        newSkuObj['collection_id']='';//无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id

        //组织当前商品对象
        newGoods['title']=data.title; // 商品标题
        newGoods['picture']=utils.getImgUrl(data.indexpic);// 默认商品 sku 缩略图
        newGoods['quota']=data.buy_quota;// 商品是否限制购买
        newGoods['quotaUsed']=data.sold_num;// 已经购买的数量
        newGoods['goodsId']=data.id;// 商品的ID
        newGoods['btnMessage']=optiontype;// 商品的ID

        return { newSkuObj,newGoods };
    }
}

export default SDK ;
