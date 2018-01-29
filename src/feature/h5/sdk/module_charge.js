import API from '@h5/api/index'
import UTILS from "@h5/services/utils"
import sessionStorage from "@h5/services/sessionStorage"

const sdk = {
	//获取充值套餐列表
 	getChargeList(){
 		return new Promise((resolve,reject)=>{
 			//获取平台
 			let platform=UTILS.judgmentTerminal(),
 				resultObj={};

 			API.all([API.getUserInfo(),API.getChargeList({platform})]).then((valuesarr)=>{
 				let allArr=valuesarr,
 					userinfoData=allArr[0].data,
 					chargeinfoData=allArr[1].data;

 				//判断是否有用户信息
 				if(Number(userinfoData.error_code)==0){
 					sessionStorage.setObject("userinfo",userinfoData.result);//更新下用户信息
 					resultObj['userinfo']=userinfoData.result;
 				}else{
 					reject({
 						msg:"用户信息获取失败!",
 						api_type:'user'
 					});
 				}
 				//处理套餐列表
 				if(Number(chargeinfoData.error_code)==0){
 					let list=chargeinfoData.result;
 					//分->元
 					for(let item of list){
 					    item.price = item.price/100;
 					}
 					resultObj['chargeList'] = list;
 					//判断是否有数据
 					if(!list.length){
 						resultObj['nodata']=true;
 					}else {
 					    resultObj['nodata']=false;
 					}

 					resolve(resultObj);
 				}else{
 					reject({
 						msg:"套餐获取失败!",
 						api_type:'chargelist'
 					})
 				}
 			})
 		});
 	},
 	//获取充值记录列表
 	getRecordList(){
 		return new Promise((resolve,reject)=>{
 			let resultObj={};
 			API.getChargeRecord().then((res)=>{
 				let data=res.data,
 					listinfo=data.result;
 				//返回参数
 				resultObj['total']=listinfo.total;
 				resultObj['recordList']=listinfo.data;
 				resolve(resultObj);
 			}).catch((err)=>{
 				reject('获取记录失败!')
 			});
 		});
 	},
 	//创建余额订单
 	createChargeOrder(chargeid){
 		return new Promise((resolve,reject)=>{
 			//充值的ID
 			let data={ id:chargeid };
 			//订单->支付
 			API.createChargeOrder({data}).then((res)=>{
 				let data=res.data;
 				if(Number(data.error_code)==0){
 					let order_no=data.result.order_no;
 					resolve({
 						msg:"创建订单成功!",
 						option:'create_balance_success',
 						order_no
 					})
 				}else{
 					reject({
 						msg:'创建订单失败!',
 						option:'create_balance_fail'
 					})
 				}
 			})
 		});
 	},
 	//余额支付
 	blancePay(order_no){
 		return new Promise((resolve,reject)=>{
 			let params={ order_no, channel : 'coin'};
 			// 余额支付
 			API.balancePay({data:params}).then((res)=>{
 				let data=res.data;
 				if (Number(data.error_code) === 0) {
 					resolve({
 						msg:"余额支付成功！",
 						option:'balance_pay_success',
 						order_no
 					})
 				} else {
 					reject({
 						msg:"余额支付失败！",
 						option:'balance_pay_fail'
 					})
 				}
 			})
 		});
 	}
}

export default sdk
