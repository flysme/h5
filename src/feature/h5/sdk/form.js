import API from "@h5/api/index";

const SDK={
	initFormData(slug){
		// API.getRecordContent().then((res)=>{});
		console.log("xxxx 初始化当前表单数据 ！！",slug);

		API.all([API.getareaInfo({mock:true}),API.getNodesContent({slug}),API.getFormDataContent({slug})],(params)=>{
			console.log("xxxx 请求axios的数据acct",params);
		});

	}
}

export default SDK;