import API from '@h5/api/index'
import utils from '@h5/services/utils'
import moment from 'moment'

const SDK={
	//订单状态
	orderstatus:{
		unpaid: '待付款',
		paid: '待发货',
		delivery: '已发货',
		closed: '交易关闭',
		success: '交易成功',
		unconfirmed:'待确认',
	},
	//初始化订单信息
	initOrderDetail(order_no){
		return new Promise((resolve,reject)=>{
			let _this=this,
				resultObj={};

			API.getOrderDetail({order_no}).then((result)=>{
				let detailresult=result.data,newresult=detailresult.result;
				console.log("xxxx 获取的订单详情信息",newresult);
				resultObj['is_virtual']=true;
				//判断商品是否是虚拟商品并且将图片做一次处理
				for(let product of newresult.items){
				    product.indexpic_url = utils.getImgUrl(product.image_url);
				    if(!product.is_virtual) resultObj.is_virtual = false;
				}
				newresult.create_time = moment( newresult.create_time ).format('YYYY-MM-DD hh:mm:ss');
				//查看下当前订单是否评论过
				if(newresult.status_detail==="after_comment") resultObj['is_evaluate']=true;
				//赋值下里面的对象 去除result的包装
				for(let key in newresult){
					resultObj[key] = newresult[key];
				}
				resultObj['status'] = _this.orderstatus[newresult.status];
				console.log("xxx 准备传入订单详情页的数据",resultObj);
				resolve(resultObj)
			});

		});
	},
	//取消订单
	cancelOrder(order_no){
		return new Promise((resolve,reject)=>{
			API.cancelOrder({order_no}).then((result)=>{
				let data = result.data;
				if (Number(data.error_code) == 0) resolve(true);
				else reject(false)
			});
		})
	},
	//确认收货
	confirmOrder(order_no){
		return new Promise((resolve,reject)=>{
			API.confirmOrder({order_no}).then((result)=>{
				let data = result.data;
				if (Number(data.error_code) == 0) resolve(true);
				else reject(false)
			});
		})
	},
	//获取订单信息
	getOrderList(){
		return new Promise((resolve,reject)=>{
			API.getOrderList().then((res)=>{
				let data=res.data,
					result=data.result,
					resultObj=[];
				if ( Number(data.error_code) === 0 ) {
				  //循环数据处理每个订单商品里的图片
				  for(let item of result.data){
				      for(let product of item.items){
				          product.indexpic_url = utils.getImgUrl(product.image_url);
				      }
				      item.statusname =this.orderstatus[item.status];
				  }
				  //赋值处理过的列表数据
				  resultObj= result.data;
				  console.log("xxx 当前返回的订单列表数据",resultObj);
				  resolve(resultObj)
				} else {
				    reject("获取订单失败！")
				}
			}).catch((err)=>{
				 reject("获取订单失败！")
			});
		});
	}
}

export default SDK;
