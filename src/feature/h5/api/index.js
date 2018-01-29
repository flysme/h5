import axios from "axios"
import API_CONFIG from "./api"
import API_SERVICE from "@/services/api"
import {pageStore} from "@h5/store/index"
import { MINE } from "@h5/sdk/index"
import APPCONFIG from '@h5/static/app_config.js';
import sessionStorage from "@h5/services/sessionStorage";
//临时模仿小程序中的请求加上头信息
/*--临时代码--*/
const ajaxHeaders = require('@static/header.json')
axios.defaults.baseURL = 'http://core-v3d.ddapp.com';
// axios.defaults.headers.post['HTTP_X_H5_VERSION'] = ajaxHeaders.HTTP_X_H5_VERSION;

axios.interceptors.request.use(config => {
    MINE.dealLoginStatus();   //处理当前用户的登录状态
    pageStore.state.loding =false
    config.withCredentials = true
    const pendingHeader = {
      'HTTP-X-H5-VERSION': ajaxHeaders.HTTP_X_H5_VERSION,
      'X-CLIENT-VERSION' : APPCONFIG.app.appInfo.version_number
    }
    console.log('xxxxx',sessionStorage.getObject('userinfo'))
    if(config.url.indexOf('activities/?verb=like')>-1){
      pendingHeader['X-DEVICE-ID'] = sessionStorage.getObject('userinfo').id;
    }
    config.headers = Object.assign({}, pendingHeader, config.headers)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(response =>{
  console.log('response:',pageStore.state)
   //对响应数据做些事
   if(response){
     pageStore.state.loding=true
   }
   return response;
 },
 error =>{
   //请求错误时做些事
   return Promise.reject(error);
 }
)
//通过服务生成API配置
const RESULT=API_SERVICE.generateApiConfig(API_CONFIG);
export default RESULT;
