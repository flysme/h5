import API from '@h5/api/index'
import utils from "@h5/services/utils"
import { APPINFO } from "@h5/sdk/index"

const sdk={
	//初始化结算参数
	initSettleParams(params){
		let originData=(params.cartInfo&&params.cartInfo.length>0)?params.cartInfo:params.detailInfo;
		console.log("xxxx 创建订单初始化传进来的数据",originData);
		//购物车的数据
		let requsetItems=[],coupon='',address='';
		if(originData instanceof Array){
			originData.forEach((item,index)=>{
				let obj={};
				//判断是否存在店铺
				if(item.store) obj['store']=item.store.id;
				obj['products']=[];
				obj['coupon']='forbidden';//暂时不支持优惠券 传入不适用优惠券的参数
				//循环具体商品信息
				item.items.forEach((shopinfo,idx)=>{
					//排除为零的商品
					if(shopinfo.number>0){
						obj.products.push({
							"cart_item" : shopinfo.id,
						    "product": shopinfo.product,
						    "sku_id": shopinfo.sku.sku_id,
						    "number":shopinfo.number
						});
					}
				});
				//放入整体的请求items
				requsetItems.push(obj)
			})
		}else{ //详情页的数据
			let obj={};
			obj['products']=[];
			let tempProductObj={
				"product": originData.id,
				"number":1
			}
			//判断是否具有SKU数据
			if(originData.vant_sku_submit){
			  let sku_obj=originData.vant_sku_submit;
			  tempProductObj['sku_id']=sku_obj.selectedSkuComb.id; 
			  tempProductObj['number']=sku_obj.selectedNum;
			} 
			obj.products.push(tempProductObj);
			obj['coupon']='forbidden';//暂时不支持优惠券 传入不适用优惠券的参数
			//放入整体的请求items
			requsetItems.push(obj)
		}
		//最终请求结算参数
		return {
		    items:requsetItems,
		    coupon,
		    address
		}
	},
	//获得创建订单的信息
	getOrderInfo(params){
		return new Promise((resolve,reject)=>{
			let requestParams=this.initSettleParams(params);
			console.log("xxxx 结算的参数",requestParams);
			API.settleCartInfo({data:requestParams}).then((res)=>{
				let data=res.data.result,resultObj={};
				console.log("xxxx 结算返回的数据",data);
				data['is_virtual'] = true;
				for (let order of data.orders) {
					//处理商品的图片对象和判断是否是虚拟商品
				    for (let product of order.products) {
				        product.indexpic_url = utils.getImgUrl(product.image_url);
				        if(!product.is_virtual) data.is_virtual = false;
				    }
				    //判断是否使用优惠券
				    resultObj['couponCache']={};
				    order.coupons.forEach(coupon =>{
				         resultObj.couponCache[coupon.id] = coupon.name;
				        if(coupon.selected) order.coupon = coupon.id;
				    })
				}
				//最终赋值
				resultObj['shoppingInfo']=data;
				resolve(resultObj);
			});
		})
	},
	//初始化动态参数
	initDynamicData(params){
		let resultObj=APPINFO.getExtraFieldsInfo(params);
		return resultObj;
	},
	//获取默认地址
	getDefaultAddress(){
		return API.getDefaultAddress();
	},
	//创建订单
	createOrderInfo({orderInfo,defaultAddress,dynamicKeyMapping}){
		console.log("xxx 准备创建订单的数据 订单信息",orderInfo);
		console.log("xxx 准备创建订单的数据 地址信息",defaultAddress);
		if(!orderInfo.shoppingInfo) return
		let shopinfo=orderInfo.shoppingInfo,ordersArr=[];
		//判断当前的订单参数
		shopinfo.orders.forEach((store,index)=>{
			let obj={
				"promotions":[],
				"coupon":'forbidden',
			};
			obj['items']=[];
			//循环结算商品参数
			store.products.forEach((item,idx)=>{
				let tempObj={
					"product":item.product,
					"number": item.number,
				};
				//判断是否有sku_id和cart_item
				if(item.sku&&item.sku.sku_id) tempObj['sku_id']=item.sku.sku_id;
				if(item.cart_item) tempObj['cart_item']=item.cart_item;
				obj.items.push(tempObj);
			});
			//判断是否有店铺ID
			if(store.store&&store.store.id) obj['store']=store.store.id;
			//留言
			obj['message']=store.message;
			obj['promotions']=store.promotions;
			//判断是否有使用优惠券的信息
			if(store.coupon) obj['coupon']=store.coupon;
			ordersArr.push(obj);
		});
		//组织请求创建订单的参数
		let  params={ 
			"orders": ordersArr,
		    "promotions": [],      // 跨店铺的活动
		    "to_sms":false,//是否发短信 必填参数(文档上没写)
		    "coupon":'',
		    "extra_fields":dynamicKeyMapping
		}
		//判断当前选中的地址
		if(!shopinfo.is_virtual&&defaultAddress.id) params['address']=defaultAddress.id;
		//判断是否有使用优惠券的信息
		if(shopinfo.coupon) params['coupon']=shopinfo.coupon;
		//判断跨店铺的营销活动
		if(shopinfo.promotions) params['promotions']=shopinfo.promotions;
		console.log("xxx 创建订单请求的参数信息",params);
		return API.createOrder({data:params});
	},
	//有赞支付
	jumpToYouzanPay(payinfo){
		return new Promise((resolve,reject)=>{
			//传入订单号和支付方式
			let params={ 
				order_no:payinfo.order_no,
				channel:'wx' ,
				redirect_url:payinfo.redirect_url
			};
			API.youzanPay({data:params}).then((res)=>{
				let data=res.data;
				if(Number(data.error_code)==0){
					let url=decodeURI(data.result);
						console.log("xxx 支付返回的链接",url)
						resolve(url);
				}else{
					reject('跳转支付链接失败！');
				}
			});
		})
	}
};

export default sdk;