const services = {
	//处理动态url参数对象
	dealDynamicUrlParams(url,params){
		let paramsArr = url.toString().match(/\{[^}]+}/gi) || [],dealUrl=url;
		if(!paramsArr.length) return dealUrl;

		paramsArr.forEach((item,index)=>{
			let key = item.substr(1, (item.indexOf("}") - 1)).trim();
			if(params[key]) dealUrl=dealUrl.replace(item,params[key]);
		});

		return dealUrl;

	}
}
export default services;
