import API from "@h5/api/index"

const sdk={
	initFilterNodeSelect(origin_data){
		let data=origin_data;
		if(!data) return;
		data.forEach((item, index)=>{
			item.options.forEach((val, index)=>{
			  	if(index==item.default_index){
					val['_active'] = true;
			  	}else{
			  		val['_active'] = false;
			  	}
			});
		});

		return data;
	},
	filterNodeChange(data,selectIdx){
		let options=data[0].options;
		options.forEach((item,index)=>{
			item._active=(index===selectIdx)
		});
		return data;
	}
};

export default sdk;