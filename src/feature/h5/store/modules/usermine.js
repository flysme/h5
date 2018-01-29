import {
PANEL_STATUS,
DEAL_NICKNAME_INFO,
SET_USER_INFO
} from '@h5/store/mutation-types';
import { Toast } from 'vant';
import { MINE } from '@h5/sdk/index';
import Vue from 'vue'
import sessionStorage from "@h5/services/sessionStorage";
import FORM_CHECK from  "@h5/services/formCheck";

let userInfo =sessionStorage.getObject('userinfo')||{},
    avatar ='https://static-public.ddapp.com/weixin/images/people@3x.png',
    nick_name=userInfo['avatar']?userInfo['avatar']:avatar;
    console.log('userInfo',userInfo)
const state = {
    panelStatus:true,
    showStatus:'',
    nick_name:'',
  /*修改选项队列*/
   userItem :{
     'avatar':{name:'头像',value:nick_name,param:'avatar'},
     'nick_name':{name:'昵称',value:userInfo['nick_name']||'',param:'nick_name'},
     'passWord':{name:'密码',value:'*******'},
     'email':{name:'邮箱',value:userInfo['email']||'',param:'email'},
     'signature':{name:'签名',value:userInfo['signature']||'',param:'signature'},
   },
   userInfo:{}  //用户信息
}

const actions = {
    requireMess({ commit },{defaultVal,type}){
      console.log('params',defaultVal,type)
           let isNames = type =='nick_name'||type =='signature',
               isEmail = type =='email',
               isPwd = type =='passWord',
               requestApi = 'dealUserInfo',
               material =state.userItem[type].param,
               data = {},
               user_id = sessionStorage.getObject('userinfo').id || '';
               data[material]=defaultVal;
           // 用户昵称和签名
           if(isNames){
             let isNamesSize =defaultVal.length<=0||defaultVal.length>25;
             if(isNamesSize){Toast("字符限制在1-25之间");return};
           }
           // 邮箱
           if(isEmail){
             let isPEmail= FORM_CHECK.mailCheck(defaultVal),
                 isEmailSize=defaultVal.length<=0;
                 if(isEmailSize){Toast("请输入账户");return};
                 if(!isPEmail)return;
                 requestApi = 'bindEmail';   //请求类型
           }
           // 密码
           if(isPwd){
             let pwdToast = '',
                 pwd0 =defaultVal.password_0,
                 pwd1 =defaultVal.password_1,
                 pwd2 =defaultVal.password_2,
                 oldpwdparm = 'old_password',
                 pwdparm = 'password';
             if(pwd0.length<=0)pwdToast='请输入原密码';
             if(pwd1.length<=0)pwdToast='请输入新密码';
             if(pwd2.length<=0)pwdToast='请输入确认密码';
             if(pwd1!=pwd2)pwdToast='新密码与确认密码不一致';
             if(pwdToast){Toast(pwdToast);return};
             defaultVal=pwd2;
             requestApi = 'dealUserPwd';   //请求类型
             data = {},
             data[oldpwdparm]=pwd0;
             data[pwdparm]=pwd1;
           }
          // 条件成立
          Toast.loading({ duration:2,mask:true});
          MINE[requestApi]({data,user_id},res=>{
                let result = res.data;
                if(result.error_code==0){
                  MINE.getUserInfo(res=>{
                      let userInfo = res.data.error_code==0?res.data.result:'';
                      commit(SET_USER_INFO,userInfo);
                  })
                  commit(DEAL_NICKNAME_INFO,{type,defaultVal})
                }else{
                    Toast(result.error_message);
                }
          })
    }
}
// getUserInfo

const mutations = {
    [PANEL_STATUS](state,params){
        state.panelStatus =!params.panelStatus;
        state.showStatus = params.showStatus;
        console.log(params)
    },
    [DEAL_NICKNAME_INFO](state,params){
      Toast('修改成功');    //提示成功状态
      if(params.type!='passWord')Vue.set(state.userItem[params.type],'value',params.defaultVal);
      state.panelStatus=!state.panelStatus;

    },
    [SET_USER_INFO](state,params){
      state.userInfo = params;
      console.log('state.userInfo',state.userInfo)
      sessionStorage.setObject('userinfo',state.userInfo);
      let userList = ['avatar','nick_name','email','signature'];
      userList.forEach((val,idx)=>{
        Vue.set(state.userItem[val],'value',state.userInfo[val]);
      })
    }
}


const getters = {

}


export default {
   namespaced:true,
   state,
   actions,
   mutations,
   getters
}
