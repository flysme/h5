<template>
	<div class="sys_back_wrap" :style="config.arrow_wrap" @click.stop="goBack" v-if="!isFuncPage">
		<!--只有一个元素的情况-->
		<div v-if="config.style==0" :style="config.arrow_img"></div>
		<div v-if="config.style==1" :style="config.arrow_title">{{config.title_text}}</div>
		<!--多个元素的情况-->
		<div :class="[`'sys_back_content_${config.style}'`]" v-if="[0,1].indexOf(config.style)<0">
			<div :style="config.arrow_img"></div>
			<div :style="config.arrow_title">{{config.title_text}}</div>
		</div>
	</div>
</template>
<script>
export default {
	name:"system_back_btn",
	data(){
		return {}
	},
	props:{
		data:{
			type:Object,
			default:()=>({})
		}
	},
	computed:{
		config(){
			return this.data.config;
		},
		isFuncPage(){
			return this.data.isFuncPage;
		}
	},
	methods:{
		goBack(){
			this.$router.go(-1);
		}
	}
}
</script>

<style lang="scss" scoped>
.sys_back_wrap{
	.sys_back_content_3{
		display: flex;
		flex-direction:column-reverse;
	},
	.sys_back_content_4{
		display: flex;
	}
	.sys_back_content_5{
		display: flex;
		flex-direction:row-reverse;
	}
}
</style>