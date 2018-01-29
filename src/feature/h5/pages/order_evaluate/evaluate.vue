<template>
	<div class="evaluate_wrap">
	       <div class="evaluate_content" v-for="(item,index) in orderInfo.order_items">
	           <div class="evaluate_header">
	               <!--评论信息展示-->
	               <div class="evaluate_info sys-flex">
	                   <img :src="item.indexpic" alt=""/>
	                   <div class="txt-overflow title">{{item.title}}</div>
	               </div>
	               <!--评论-->
	               <div class="evaluate_mask">
	                   <textarea v-model="item.evaluate" placeholder="请填写评价，1~300字之间"></textarea>
	               </div>
	               <!--图片上传-->
	               <div class="evaluate_upload sys-flex">
	                   <div class="upload_imgs" v-for="(imgval,idx) in item.imgs" @click.stop="previewImages(item.imgs,idx)">
	                       <img class="img" :src="imgval" alt="" />
	                       <div class="close" @click.stop="delUploadImg(index,idx)">X</div>
	                   </div>
	                   <div class="upload_option" v-if="item.imgs.length<5">
	                       <div class="row_line"></div>
	                       <div class="col_line"></div>
	                       <input type="file" class="upload_input" @change="chooseImg($event,index)" multiple id="upload_file" accept="image/*">
	                   </div>
	               </div>
	           </div>
	           <!--评论服务-->
	           <div class="evaluate_footer sys-flex">
	               <div class="service_type" v-for="(serviceitem,idx) in orderInfo.services" @click.stop="selectService(index,idx)" >
	                   <div :class="[item.selctTypeIdx==idx?'active_bg':'normal_bg']"></div>
	                   <div :class="[item.selctTypeIdx==idx?'active':'normal']">{{serviceitem.name}}</div>
	               </div>
	           </div>
	       </div>
	       <!--提交按钮-->
	       <van-button class="evaluate_btn" :loading="isLoading" @click="submitEvaluate">提交</van-button>
	   </div>
</template>

<script>
import "@h5/style/app.css"
import "@h5/style/order_evaluate/evaluate.scss"
import API from "@h5/api/index"
import UTILS from "@h5/services/utils" //调用上传文件的方法


export default {
	name:'orderevaluate',
	data(){
		return {
		    orderInfo:{},
		    isLoading:false,
		    isEvaluate:false
		}
	},
	beforeRouteEnter (to, from, next) {
	  //通过钩子难道订单详情页的数据
	  if(from.name=='orderdetail'){
	  	next(vm=>{
	  		vm.initData(to.query.orderinfo);
	  	})
	  }else{
	  	next(false);	
	  }
	},
	beforeRouteLeave (to, from, next) {
	  //通过钩子将订单的评论状态传送过去
	  if(to.name=='orderdetail'&&this.isEvaluate){
	  	to.query['isEvaluate']=true;
	  }
	  next();
	},
	methods:{
		initData(orderinfo){
			//遍历对象添加属性
			let dealObj={},dealOrderItems=[];
			orderinfo.items.forEach((item,index)=>{
			    //已商品ID作为一个对象
			   let tempObj={};
			    tempObj['indexpic']=item.indexpic_url;
			    tempObj['contentid']=item.id;
			    tempObj['title']=item.subject;
			    tempObj['selctTypeIdx']=-1;
			    //初始化上传图片的数组
			    tempObj['imgs']=[];
			    //初始化评论信息
			    tempObj['evaluate']='';
			    dealOrderItems.push(tempObj);
			});
			//初始化订单号和虚拟商品参数
			dealObj['order_items']=dealOrderItems;
			dealObj['order_no']=orderinfo.order_no;
			dealObj['is_virtual']=orderinfo.is_virtual;
			//存放评论类型
			dealObj['services']=[
			    {name:'好评',score:5},
			    {name:'中评',score:3},
			    {name:'差评',score:0}
			];
			//响应式赋值
			this.orderInfo=dealObj;
		},
		//选评价
		selectService(parentIdx,sonIdx){
			//选中服务
			let parentObj=this.orderInfo.order_items[parentIdx]
			parentObj.selctTypeIdx=sonIdx;
		},
		//删除图片
		delUploadImg(parentIdx,sonIdx){
			let currentImgs=this.orderInfo.order_items[parentIdx];
			currentImgs.imgs.splice(sonIdx,1);
		},
		//预览图片
		previewImages(imgs,previdx){
			UTILS.previewImages(imgs,previdx);
		},
		//上传图片
		chooseImg(e,parentIdx){
			let _this=this,
				files = e.target.files || e.dataTransfer.files;
			//遍历是否多个图片
			for(let file of files){
				UTILS.uploadImage(file,(result)=>{
					if(result.indexOf('浏览器')!=-1){
						this.$toast(result);
					}else{
						let currentImgs=_this.orderInfo.order_items[parentIdx];
						currentImgs.imgs.push(result);
					}
				})
			}
		},
		//提交订单
		submitEvaluate(){
			if(!this.orderInfo.order_no){
				this.$toast.fail('订单不存在!');
			  	return;
			} 
			let _this=this,params=[]
			//组织参数
			for(let item of _this.orderInfo.order_items){
			   let tempObj={};
			   if(!item.evaluate){
			    	_this.$toast(`${item.title}的评价必须填写!`);
			    	return;    
			   }
			   tempObj['content_id']=item.contentid;
			   tempObj['comment']=item.evaluate;
			   tempObj['is_anonymous']=false;
			   //图片和星级评价不是必填参数
			   let score=_this.orderInfo.services[item.selctTypeIdx]?
			            _this.orderInfo.services[item.selctTypeIdx].score:
			            item.selctTypeIdx; //为-1
			   if(score>=0) tempObj['star']=score;
			   if(item.imgs.length) tempObj['imgs']=item.imgs;
			   params.push(tempObj);
			}

			//提交评价
			_this.isLoading=true;
			API.orderEvaluate({
				order_no:_this.orderInfo.order_no,
				data:params
			}).then((res)=>{
				_this.isLoading=false;
				let data=res.data;
				if ( Number(data.error_code) === 0 ) {
		            //修改订单状态
		            _this.isEvaluate=true;
		         	_this.$toast.success('评价成功');
		            //跳转到订单详情页
		            _this.$router.replace({name:'orderdetail',params:{
		            	orderno:_this.orderInfo.order_no
		            }})
	           } else {
	           		_this.isEvaluate=false;
	          		_this.$toast.fail('评价失败!');
	           }
			}).catch((err)=>{
				//还原评价状态
				_this.isLoading=false;
				_this.isEvaluate=false;
				console.error(err);
			})
		}
	}
}
</script>
