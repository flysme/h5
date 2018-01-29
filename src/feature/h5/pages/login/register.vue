<template>
	<div class="register_wrap">
		<h2 class="register_title">注册</h2>
		<div class="register_form">
			<div class="form_wrap">
				<div class="phone">
					<input type="tel" placeholder="手机号" v-model="phoneinfo"/>
				</div>
				<div class="agree">
					<van-checkbox  v-model="isAgree">
						<p>我已经阅读并同意<span @click.stop="showAgree">《注册协议》</span></p>
					</van-checkbox>
				</div>
				<!--按钮-->
				<button class="register_btn" @click="registerUser">注册</button>
				<!--忘记密码-->
				<div class="forgetPassword" @click="findPassword('phone')">
					<span>忘记密码?</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import "@h5/style/login/register.scss"
import FORM_CHECK from  "@h5/services/formCheck"

export default {
	data(){
		return {
			isAgree:true,
			phoneinfo:''
		}
	},
	methods:{
		findPassword(type){
			this.$router.replace({path:'/findpass',query:{form:type}})
		},
		showAgree(){
			this.$toast({message:'还未编辑文案 ！',duration:1000});
		},
		registerUser(){
			let isRegisterPass=FORM_CHECK.phoneCheck(this.phoneinfo);
			if(isRegisterPass){
				this.$router.replace({path:'/setpass',query:{phone:this.phoneinfo,optiontype:'register'}})	
			}
		}
	}
}
</script>