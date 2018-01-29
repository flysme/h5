import utils from "@h5/services/utils"
import API from '@h5/api/index'
import {
	UPDATE_ADDRESSLIST,
	SET_CURRENT_ADDRESS,
	DELETE_ADDRESSLIST,
	SET_CURRENTAREA_CODE
} from '@h5/store/mutation-types';





const state={
	list:[],
	currentAddress:{},
	currentareaCode:null
};

const getters={};

const mutations={
	[UPDATE_ADDRESSLIST](state,listdata){
		if(!listdata.length) return;
		//初始化默认选中地址
		listdata.forEach((item,index)=>{
			//将数据转换成VantUI内部的形式
			let address='',areaArr='',province='',
				city='',county='',areacode='',detai_adress='',
				tel='',postal_code='';

			//需要判断是否是需要转换的item 
			if(Object.keys(item).length > 7){
				address=[item.province,item.city,item.county].join(',');
				province=item.province;
				city=item.city;
				county=item.county;
				areacode=item.area_code;
				detai_adress=item.address_detail;
				tel= item.tel;
				postal_code=item.postal_code;
			}else{
				address=item.district+" "+item.detail;
				areaArr=item.district.split(',');
				province=areaArr[0];
				city=areaArr[1];
				county=areaArr[2];
				areacode=utils.getAreaCode(county);
				detai_adress=item.detail;
				tel= item.phone;
				postal_code=item.district_code;
			}

		
			//模拟接口生成ID item.id
			let test_id=item.id ? item.id:'TEST_'+new Date().getTime();

			let obj={
				"id": test_id,
				"name": item.name,
				"tel":tel,
				"address": address,
				"city": city,
				"county": county,
				"postal_code":postal_code ,
				"province": province,
				"area_code":areacode,
				"address_detail":detai_adress,
				"is_default":item.is_default || false
			}
			//判断是否是默认地址
			if(item.is_default){
				state.currentAddress=obj;
			}
			//执行替换
			listdata[index]=obj;
		});

		state.list=listdata;
	},
	[DELETE_ADDRESSLIST](state,deletelist){
		//删除当前的列表的地址项
		state.list.forEach((item,index)=>{
			if(item.id==deletelist.id){
				state.list.splice(index,1)
			}
		});
	},
	[SET_CURRENT_ADDRESS](state,currentdata){
		//更改选中后的地址信息
		let data={};
		state.list.forEach((item,index)=>{
			if(item.id==currentdata.id) data=item;
		});
		state.currentAddress=data;
	},
	[SET_CURRENTAREA_CODE](state,code){
		state.currentareaCode=code;
	}
};

const actions={
	getAddressList({state,commit},params){
		API.getAddressList().then((result)=>{
			console.log("xxx 地址返回的数据",result.data);
			let data=result.data;
			if(data.result) commit(UPDATE_ADDRESSLIST,data.result);
		});
	},
	addAddress({state,commit},params){
		//加上promise确保数据更新成功后在返回
		return new Promise((resolve,reject)=>{
			//地址采用省市区拼凑起来
			let district=[params.province,params.city,params.county].join(',');
			//重新将数据的状态设置不选中,为新添加的地址作为默认选中地址
			state.list.forEach((item,index)=>{
				if(item.is_default) item.is_default=false;
			});
			//将数据转换成接口所需要的形式
			let obj={
				"name": params.name,
				"phone": params.tel,
				"district": district,
				"district_code": params.postal_code,
				"detail": params.address_detail,
				"is_default": params.is_default
			}
			//添加地址
			API.addAddressInfo({data:obj}).then((res)=>{
				let data=res.data;
				console.log("xxx 添加收货地址返回的信息",data);
				if(Number(data.error_code)==0){
					state.list.push(obj);
					commit(UPDATE_ADDRESSLIST,state.list)
					resolve('添加成功！');	
				}else{
					reject(data.error_message);
				}
			})
		});
	},
	editAddress({state,commit},params){
		return new Promise((resolve,reject)=>{
			//地址采用省市区拼凑起来
			let district=[params.province,params.city,params.county].join(',');
			//将数据转换成接口所需要的形式
			let obj={
				"name": params.name,
				"phone": params.tel,
				"district": district,
				"district_code": params.postal_code,
				"detail": params.address_detail,
				"is_default": params.is_default
			}
			//编辑地址
			API.editAddressInfo({address_id:params.id,data:obj}).then((res)=>{
				let data=res.data;
				console.log("xxx 编辑收货地址返回的信息",data);
				if(Number(data.error_code)==0){
					//修改赋值
					state.list.forEach((item,index)=>{
						if(item.id==params.id){
							let obj={
								"id": item.id,
								"name":item.name,
								"tel": item.tel,
								"address": item.address,
								"is_default": item.is_default,
								"city": item.city,
								"county": item.county,
								"postal_code": item.postal_code,
								"province":item.province,
								"area_code":item.area_code,
								"address_detail":item.address_detail
							};
							//重新插入
							state.list.splice(index,1,obj);
							commit(UPDATE_ADDRESSLIST,state.list);
						}
					});
					resolve('编辑成功！');	
				}else{
					reject(data.error_message);
				}
			});
		});
	},
	deleteAddress({state,commit},params){
		return new Promise((resolve,reject)=>{
			API.deleteAddressInfo({address_id:params.id}).then((result)=>{
				let data=result.data;
				console.log("xxx 删除地址的信息",data);
				if(Number(data.error_code)==0){
					commit(DELETE_ADDRESSLIST,params);
					resolve('删除成功！');	
				}else{
					reject(data.error_message);
				}
			})
		});
	}
};


export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
};