<template>
	<div v-if="origindata" class="mt20">
		<div v-for="item in origindata" class="dynamic-views">
		    <div class="group-title" v-if="item.group_title">{{item.group_title}}</div>
		    <div v-for="field in item.fields" class="field sys-flex">
		    	<!--显示当前菜单-->
		        <div v-if="field.widget_type !=='mul_field'" class="mr20">{{field.display_text}}</div>
				<!--文本输入器-->
		        <div v-if="field.widget_type == 'text_field' && field.editable"  class="sys-flex-one">
		        	<input class="sys-flex-one" type='text' v-model="tempDataMapping[field.key]" :placeholder="field.default_value"/>	
		        </div>
				<!--文本展示-->
		        <div class="sys-flex-one"  v-if="field.widget_type == 'text_field' && !field.editable">{{field.default_value}}</div>
				<!--多行文本-->
				 <div v-if="field.widget_type == 'mul_field'"  class="sys-flex-one">
		        	<textarea class="textarea sys-flex-one" v-model="tempDataMapping[field.key]" :placeholder="field.default_value"></textarea>
		        </div>
		        <!--选择输入器-->
				<div v-if="field.widget_type == 'bool_switch'" class="sys-flex-one justify-content-right sys-flex">
					<!--开关的UI-->
					<van-switch v-model="tempDataMapping[field.key]" />
				</div>
				<!--单选输入器-->
				<div v-if="field.widget_type == 'single_picker'" class="relative sys-flex sys-flex-center sys-flex-one" @click.stop="showSingPickerMenu">
					<div class="single_picker sys-flex-one">{{tempDataMapping[field.key]||field.options[field.default_option_index]||'请选择'}}</div>
					<div class="arrow"></div>
					<div class="dropdown" :class="{show_dropdown:showOptions}">
					    <div v-for="(item,index) in field.options" class="option" @click.stop="selectSingPickerMenu(field.key,field.options[index])">{{item}}</div>
					</div>
				</div>
				<!--日期选择-->
				<div v-if="field.widget_type == 'date_picker'" @click.stop="showDatePicker('date',field.key)">{{tempDataMapping[field.key]}}</div>
				<!--时间选择-->
				<div v-if="field.widget_type == 'date_time_picker'" @click.stop="showDatePicker('time',field.key)">{{tempDataMapping[field.key]}}</div>
		    </div>
		</div>
		<!--弹出层-->
		<van-actionsheet v-model="isActionShow">
		  <!--时间选择-->
		  <van-datetime-picker v-model="currentDate" :type="currentDateType" @confirm="selectTimeConfirm" @cancel="selectTimeCancel"/>	
		</van-actionsheet>
	</div>

</template>

<script>
import "@h5/style/orderdetail/create.scss"
import "@h5/style/app.css"

export default {
	name:'dynamic_params',
	data(){
		return {
			tempDataMapping:{},
			showOptions:false,
			currentDate:'',
			currentDateType:'datetime',
			isActionShow:false
		}
	},
	props:{
		//原始数据
		origindata:{
			type:Array,
			default:()=>{
				return [];
			}
		},
		//默认数据
		datamapping:{
			type:Object,
			default:()=>{
				return {}
			}
		}
	},
	created(){
		//临时赋值一个对象保存输入的值
		this.initDataMapping();
		// console.log("lll 动态数据获取的属性",this.origindata);
	},
	watch:{
		tempDataMapping:{
			handler(newobj,oldobj){
				if(this.timer) clearTimeout(this.timer);
				this.timer=setTimeout(()=>{
					//触发去设置提交的参数对象
					this.$store.commit('createOrderStore/SET_DYNAMIC_KEYMAPPING',newobj);
				},200);
			},
			deep:true
		}
	},
	methods:{
		initDataMapping(){
			//将需要绑定的值全部设为空
			for(let key in this.datamapping){
				this.$set(this.tempDataMapping,key,this.datamapping[key]);
			}
		},
		showSingPickerMenu(){
			this.showOptions=!this.showOptions;
		},
		selectSingPickerMenu(key,val){
			this.$set(this.tempDataMapping,key,val);
			this.showOptions=false;
		},
		showDatePicker(type,key){
			//获取当前时间对象
			this.currentDate=this.getCurrentTime().currentDate;
			//开始弹层
			this.isActionShow=true;
			//设置当前的选中key和对时间对象的判断
			this.currentSelctKey=key;
			type=='date'?
				this.currentDateType='date':
			    this.currentDateType='datetime';
		},
		getCurrentTime(value){
			let date=new Date(),
				mon=date.getMonth();
			if(value){
				date=new Date(value);
				mon=date.getMonth()+1;
			}
			//拆分下
			let year=date.getFullYear();
			let day=date.getDay();
			let hour=this.addZero(date.getHours());
			let min=this.addZero(date.getMinutes());
			let sec=this.addZero(date.getSeconds());

			let dateObj=[year,mon,day].join('-'),
				timeObj=[hour,min,sec].join(':'),
				datetimeObj=`${dateObj} ${timeObj}`,
				currentDate=new Date(year,mon,day,hour,min,sec);

			return { dateObj,timeObj,datetimeObj,currentDate};
		},
		//添加一个0
		addZero(val){
			return val<10?`0${val}`:val;
		},
		//选择日期的确认和取消操作
		selectTimeConfirm(content){
			let result=this.getCurrentTime(content);

			//开始赋值事件选择器的值
			this.currentDateType=='date'?
				this.$set(this.tempDataMapping,this.currentSelctKey,result.dateObj):
				this.$set(this.tempDataMapping,this.currentSelctKey,result.datetimeObj);
			//隐藏弹层	
			this.isActionShow=false;
		},
		selectTimeCancel(){
			//隐藏弹层
			this.isActionShow=false;
		}
	}
}
</script>