<template>
	<div class="chargerecord">
	    <div class="list" v-if="recordinfo.total">
	        <div class="sys-flex sys-flex-center item" v-for="item in recordinfo.recordList">
	            <div class="sys-flex-one">
	                <div>充值成功 {{item.amount}}</div>
	                <div class="tip mt5">{{item.create_time}}</div>
	            </div>
	            <div>+ {{item.value}}</div>
	        </div>
	    </div>
	    <div v-if="!recordinfo.total" class="nodata">暂无记录！</div>
	</div>	
</template>


<script>
import { MODULE_CHARGE } from "@h5/sdk/index"
import "@h5/style/module_charge/record.scss"
import "@h5/style/app.css"

export default {
	name:'module_charge',
	data(){
		return {
			recordinfo:{}
		}
	},
	created(){
		//loading	
		this.$toast.loading({duration: 0,forbidClick: true});
		this.initRecordInfo();//初始化信息
	},
	methods:{
		initRecordInfo(){
			let promise=MODULE_CHARGE.getRecordList();
			//赋值记录信息
			promise.then((data)=>{
				this.recordinfo=data;
				this.$toast.clear();
			}).catch((err)=>{
				this.$toast(err);
			})
		}
	}
}
</script>