import axios from "axios"
import URL_SERVICE from './url'

const services={
	//返回请求对象 如果返回mock数据需要传入{mock:true}
	backApiPromise(apiConfig,apiKey,params){
		let reqApiConfig=apiConfig[apiKey],currentUrl='',data='';
		if(!reqApiConfig){
			console.log("接口不存在！！！");
			return;
		}
		//处理是否是mock数据
		if(params&&params.mock){
			currentUrl=`/mock/?file=${reqApiConfig.mockfile}`; //读取配置里面配置的file名字
		}else{
			currentUrl=`/api/${URL_SERVICE.dealDynamicUrlParams(reqApiConfig.url,params)}`//预处理地址
		}
		data=params&&params.data?params.data:{};//判断是否携带参数
		data=reqApiConfig.method=='get'?{params:data}:data;//对于get请求数据携带需要包裹一层
		return axios[reqApiConfig.method](currentUrl,data);
	},
	generateApiConfig(API_CONFIG){
		/**
			@params:为参数对象

			对象当中的格式规范为:
				1.需要传入接口的参数直接写在根上以Key:value的形式
				2.请求所需要携带的数据全部写在data对象当中

			ex:{
				key1:xxxxx,
				key2:xxxxx,
				data:{
					key1:xxx,
					key2:xxx
				}
			}
		*/
		let API={
			all(promisArr,cb){
				return new Promise(function (resolve, reject) {
					if(promisArr instanceof Array){
						axios.all(promisArr).then(axios.spread((...params)=>resolve(params)));
					}else{
						reject("传入的参数有误 ！");
					}
				});
			}
		};

		for(let API_KEY in API_CONFIG){
			API[API_KEY]=(params)=>{
				return services.backApiPromise(API_CONFIG,API_KEY,params);
			}
		}

		return API;
	}
}

export default services;
