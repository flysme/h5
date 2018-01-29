import {REPORT} from '@h5/sdk/index'
import { Toast } from 'vant';

const state = {
  items:[
     { name: '垃圾营销', value: '垃圾营销' },
     { name: '淫秽色情', value: '淫秽色情'},
     { name: '信息不实', value: '信息不实' },
     { name: '敏感信息', value: '敏感信息' },
     { name: '骚扰我', value: '骚扰我' },
     { name: '虚假信息', value: '虚假信息' },
     { name: '其他', value: '其他' },
   ]
};


const actions = {
    sendreport({commit}, params){
        console.log(params,'parsms');
        let data = params.params;
        if (data.content == ''){
          Toast('请填写具体举报内容');
          return;
       } else if (data.reason == ''){
         Toast('请填写举报类型');
         return;
       }else{
         REPORT.sendReport(data,res => {
           console.log(res,'res.error_code')
           if(Number(res.error_code) == 0){
              Toast("感谢您的反馈");
              setTimeout(()=>{
                params.route.go(-1);
              },1000);
           }else{
             Toast(res.error_message || '信息有误');
           }
         })
       }
    }
}

const getters = {
  items(){
    return state.items;
  }
};


export default {
  state,
  getters,
  actions
}
