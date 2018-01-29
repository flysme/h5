<template>
	<div class="find_wrap">
		<h2 class="find_title">{{title}}</h2>
		<div class="find_form">
			<div class="form_wrap">
				<div class="phone" :class="bgicon">
					<input :type="formtype" :placeholder="tiptext" v-model="accountinfo"/>
				</div>
				<!--按钮-->
				<button class="find_btn" @click="checkAccount">{{btntext}}</button>
			</div>
		</div>
	</div>
</template>

<script>
import "@h5/style/login/findpass.scss"
import FROM_CHECK from "@h5/services/formCheck"
import API from "@h5/api/index"
import sessionStorage from "@h5/services/sessionStorage"

export default {
	data(){
		return {
			isAgree:true,
			accountinfo:''
		}
	},
	props:{
		findType:String
	},
	computed:{
		title(){
			return this.findType=='mail'?'通过邮箱找回':'通过手机找回';
		},
		tiptext(){
			return this.findType=='mail'?'请输入邮箱':'请输入手机号';
		},
		btntext(){
			return this.findType=='mail'?'发送验证邮件':'提交';
		},
		formtype(){
			return this.findType=='mail'?'email':'tel';
		},
		bgicon(){
			return this.findType=='mail'?'emailbg':'phonebg';
		}
	},
	methods:{
		checkAccount(){
			let isPhonePass=false,isMailPass=false;
			//区分邮件还是手机找回
			if(this.findType=='mail'){
				isMailPass=FROM_CHECK.mailCheck(this.accountinfo);
				if(!isMailPass) return;
				API.getPassFromMail({data:{"email":this.accountinfo}}).then((res)=>{
					let code=res.data.error_code,message=res.data.error_message;
					if(code==0){
						this.$toast.success({message:'邮件发送成功~',duration:500});
						sessionStorage.remove('userinfo');
						this.$router.replace({name:'login'});
					}else{
						this.$toast({message,duration:500});
					}
				});
			}else{
				isPhonePass=FROM_CHECK.phoneCheck(this.accountinfo);
				if(!isPhonePass) return;
				this.$router.replace({path:'/setpass',query:{phone:this.accountinfo,optiontype:'resetpassword'}});
			}
		}
	}
}
</script>
