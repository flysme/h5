<template>
	<div class="addresslist_wrap" >
		<transition-group name="slider" mode="out-in" >
			<!--显示地址列表-->
			<div v-if="!isShowEditAddress" key="1">
				<van-address-list v-model="currentAddressSelectId" :list="list" @add="onAdd" @edit="onEdit" @select="onSelect"/>	
			</div>
			<!--显示编辑地址-->
			<div v-if="isShowEditAddress" key="2">
				<!--
				  area-list:地区列表参数
				  show-postal:邮政编码
				  show-set-default:设置默认地址
				  show-search-result:展示地址搜索结果
				-->
				<van-address-edit
				  :area-list="areaList" 
				  :address-info="currentAddressSelect"
				  show-postal
				  show-set-default
				  show-search-result 
				  :is-saving="isShowSaveLoading"
				  :is-deleting="isShowDeleteLoading"
				  :search-result="searchResult"
				  @save="onSave"
				  @delete="onDelete" 
				  @change-area="onChangeArea"
				/>
			</div>
		</transition-group>
	</div>
</template>

<script>
const areaList =require('@h5/static/area.json');//获取地区数据

import { mapState } from 'vuex'


export default {
	name:'addresslist',
	data() {
	    return {
	    	isShowEditAddress:false,
	    	currentAddressSelectId:'',
	    	currentAddressSelect:{},
	    	areaList,
	    	searchResult: [],
	    	isShowSaveLoading:false,
	    	isShowDeleteLoading:false,
	    	addressOptionType:'add'
	    }
	},
	created(){
		//获取当前地址列表
		this.$store.dispatch('addressStore/getAddressList');
	},
	computed:{
		...mapState('addressStore',['list','currentAddress'])
	},
	watch:{
		currentAddress:function(newval){
			if(newval)  this.currentAddressSelectId=newval.id
		}
	},
	methods: {
	    onAdd() {
	   		//显示地址编辑
	    	this.isShowEditAddress=true;
	    	this.currentAddressSelect={};
	    	this.addressOptionType='add';
	    },
	    onEdit(item, index) {
	   		//显示地址编辑 触发地址项变动 并且赋值当前地址表单数据
	    	this.isShowEditAddress=true;
	    	this.$store.commit('addressStore/SET_CURRENT_ADDRESS',item);
	    	this.currentAddressSelect=this.currentAddress;
	    	this.addressOptionType='edit';
	    },
	    onSelect(item, index){
	    	//更改当前选中的地址项
	   		this.$store.commit('addressStore/SET_CURRENT_ADDRESS',item);
	   		this.$router.go(-1);
	    },
	    onSave(content) {
	    	//如果用户没有填写邮政编码 默认000000
	    	if(!content.postal_code) content['postal_code']='000000';
	    	//显示loading
	    	this.isShowSaveLoading=true;
	    	//触发保存
	    	let promise=null,_this=this;

	    	console.log("xxx 当前地址编辑类型",_this.addressOptionType);
	    	//判断添加还是编辑	
	    	if(_this.addressOptionType==='add'){
	    		promise=this.$store.dispatch('addressStore/addAddress',content);
	    	}else{
	    		promise=this.$store.dispatch('addressStore/editAddress',content);
	    	}
			//返回并且将地址列表显示出来
	    	promise.then((addinfo)=>{
	    		_this.isShowSaveLoading=false;
	    		_this.isShowEditAddress=false;
	    		this.$toast(addinfo);
	    	}).catch((err)=>{
	    		//错误重置信息
	    		_this.isShowSaveLoading=false;
	    		this.$toast(err);
	    	});
	    },
	    onDelete(content) {
			//显示loading
	    	this.isShowDeleteLoading=true;
	    	let promise=this.$store.dispatch('addressStore/deleteAddress',content),
	    		_this=this;
			//返回并且将地址列表显示出来
	    	promise.then((deleteinfo)=>{
	    		_this.isShowDeleteLoading=false;
	    		_this.isShowEditAddress=false;
	    		this.$toast(deleteinfo);
	    	}).catch((err)=>{
	    		//错误重置信息
	    		_this.isShowDeleteLoading=false;
	    		this.$toast(err);
	    	});
	    },
	    onChangeArea(values){
	    	console.log("xxx 当前赋值父的区域信息",values);
	    	if(values.length<3){
	    		this.$toast('地址选择不正确!');
	    		return;
	    	}
	    	//更改当前地区区域编码
	    	this.$store.commit('addressStore/SET_CURRENTAREA_CODE',values[2].code);
	    }
	}
}
</script>



<style lang='scss'>

$bgAddress:#f9f9f9;

.addresslist_wrap{
	height:100vh;
	background:$bgAddress;
	.van-address-list__group{
		padding-bottom:0;
	}
}
</style>