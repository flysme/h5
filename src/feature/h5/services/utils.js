import moment from 'moment'
import globalDataService from '@h5/services/global'
import { ImagePreview } from 'vant';
const areainfo =require('@h5/static/area.json')

const services = {
	//判断当前系统是IOS还是Android
	judgmentTerminal(){
		let u = navigator.userAgent,
			app = navigator.appVersion,
			flag='';
	    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
	    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	    if (isAndroid) flag="android";
	    if (isIOS) flag="ios";
	    return flag
	},
	//获得区域编码 address:"江苏省,南京市,雨花台区||江苏省,南京市,雨花台区"
	getAreaCode(address){
		if(!address) return;
		let startIndex=address.indexOf("市"),
			endIndex=address.indexOf("区")+1;
		//判断是adderss是否带逗号的类型
		if(address.indexOf(",")!=-1&&address.split.length>2) startIndex+=2;;
		//找到区
		let findKey=address.substring(startIndex,endIndex),
			countyObj=areainfo.county_list;
		//找到code
		let findIndex=Object.values(countyObj).indexOf(findKey);
		return Object.keys(countyObj)[findIndex];
	},
	//上传图片
    uploadImage(file,cb){
		if(typeof FileReader==='undefined'){
		  	  cb&&cb('您的浏览器不支持图片上传，请升级您的浏览器');
		}else{
			let reader = new FileReader();
		    reader.readAsDataURL(file);
		    reader.onload = (e)=>{
		     cb&&cb(e.target.result)
		    };
		    reader.onerror=(e)=>{
		   	 cb&&cb('上传图片出错,请重新上传!');
		    }
		}
	},
	//预览图片
	previewImages(imgs,prevIdx){
		if(!imgs) return;
		let nowIdx=prevIdx?prevIdx:0;
		//接收一个图片数组和预览图片起始位置
		ImagePreview(imgs,nowIdx);
	},
	//接收图片object，返回图片地址字符串
	getImgUrl(obj,width,height,mode=1){
		let url = '';
		if(obj && typeof obj !=='string'){
			obj = obj.material ? obj.material : obj;
			obj.source = obj.source || '';
			if( obj.source == 'qiniu' || obj.source == 'upyun' ){
				if( obj.host ){
					url = obj.host + obj.dir + obj.filepath + obj.filename + '?imageView2/' + mode;
				}
				if( width ){
					url += '/w/' + width;
				}
				if( height ){
					url += '/h/' + height;
				}
			}
			if( obj.source == 'youzan' ){
				if( obj.host ){
					url = obj.host + obj.dir + obj.filepath + obj.filename;
				}
			}
			if(obj.source == 'material'){
				obj.dir = obj.dir || '';
				if( width ) {
					url = obj.host + obj.dir + width + 'x' + height + '/' +  obj.filepath + obj.filename;
				} else {
					url = obj.host + obj.dir +  obj.filepath + obj.filename;
				}
			}
			if(!obj.source){
				obj.dir = obj.dir || '';
				url = obj.host + obj.dir +  obj.filepath + obj.filename;
			}

			if(obj.source.indexOf('http://')!=-1) url=obj.source;
		}
		return url==''?obj:url;
	},
	//判断对象是否为空
	isEmptyObj(obj){
		for(let key in obj){
			return false;
		}

		return true;
	},
	/* 拆分格式化的参数 */
	destructionForamt(format) {
	 let input1 = '',
		 input2 = '',
		 currentFunc = '',
		 currentParams = [],
		 paramStr = format;
	 if (format.match(/(\S*)@/)) {
		 input1 = format.match(/(\S*)@/)[1];
	 } else if (format.match(/(\S*)\{\{/)) {
		 input1 = format.match(/(\S*)\{\{/)[1];
	 }
	 if (format.match(/\)(\S*)/)) {
		 input2 = format.match(/\)(\S*)/)[1];
	 } else if (format.match(/\}\}(\S*)/)) {
		 input2 = format.match(/\}\}(\S*)/)[1];
	 }
	 currentFunc = format.match(/@(\S*)\(/) ? format.match(/@(\S*)\(/)[1] : '';   //当前函数名
	 let left = format.indexOf('('),
		 right = format.indexOf(')');
	 if (left > -1 && right > -1) {
		 paramStr = format.substring(left + 1, right);
		 let	paramArr = paramStr.split(',');
		 paramArr.shift();   //第一项是fieldkey,不需要
		 paramArr.forEach(function (str, index) {
			 paramArr[index] = str.substring(1, str.length - 1); //去除''
		 });
		 currentParams = paramArr;
	 }
	 let result = {
		 input1: input1,     //前缀
		 input2: input2,     //后缀
		 paramStr: paramStr.split(',')[0],	//fieldkey
		 currentFunc: currentFunc,   //方法名
		 currentParams: currentParams    //参数
	 };
	 return result;
	},
	formatTime( date, type ){
		type=type?type:'yyyy-MM-dd hh:mm:ss';
		//key为叮当日期格式，value为moment.js格式
		let typeHash = {
			'MM-dd' : 'MM-DD',
			'MM.dd' : 'MM.DD',
			'MM月dd日' : 'MM月DD日',
			'yyyy-MM-dd' : 'YYYY-MM-DD',
			'yyyy-MM-dd hh:mm:ss' : 'YYYY-MM-DD hh:mm:ss',
			'yyyy年MM月dd日' : 'YYYY年MM月DD日',
			'yy-MM-dd' : 'YY-MM-DD',
			'yy年MM月dd日' : 'YY年MM月DD日',
			'yy.MM.dd' : 'YY.MM.DD',
			'MM-dd HH:mm' : 'MM-DD HH:mm',
			'MM月dd日 HH时mm分' : 'MM月DD日 HH时mm分',
			'HH:mm:ss' : 'HH:mm:ss',
			'MM.dd EEEE' : 'MM.DD dddd',
			'EEEE MM.dd' : 'dddd MM.DD',
			'MM月dd日 EEEE' : 'MM月DD日 dddd',
			'EEEE MM月dd日' : 'dddd MM月DD日',
			'yyyy年MM月dd日 EEEE' : 'YYYY年MM月DD日 dddd',
			'EEEE' : 'dddd',
			'EEEE HH:mm' : 'dddd HH:mm',
			'HH:mm EEEE' : 'HH:mm dddd'
		};
		let momentType = typeHash[ type ];
		return momentType ? moment( date ).format( typeHash[ type ] ) : date;
	},
	/* 数据字段格式化 */
	formatDataField( value, format ){
		let result = value;
		if( format && value ){
						var formatResult = this.destructionForamt( format ),
								currentParams = formatResult.currentParams;
						switch (formatResult.currentFunc) {
				case 'LOWER':		//转为小写
					result = value.toLowerCase();
					break;
				case 'UPPER':		//转为大写
					result = value.toUpperCase();
					break;
				case 'DEFAULT':		//默认值
					result = value || currentParams[0];
					break;
				case 'DATEFORMAT':	//日期格式化
					if( typeof value == 'string' ){
						result = this.formatTime( value, currentParams[0] );
					}else{
						result = [this.formatTime( value.start, currentParams[0] ), this.formatTime( value.end, currentParams[0] )].join('~');
					}
					break;
				case 'TIMESINCE':	//已进行时长，now_datetime - datetime
					result = this.timeDiff( +new Date(), moment( result ).unix() * 1000 );
					break;
				case 'TIMEUNTIL':	//剩余时长，datatime - now_datetime
					result = this.timeDiff( moment( result ).unix() * 1000, +new Date() );
					break;
				case 'CONSTELLATION':	//星座计算
					var m = moment(result).month()+1,
						d = moment(result).date();
					result = this.getAstro(m,d);
					break;
				case 'SIMPLE_DATEFORMAT':	//时间友好格式化（1天前，2小时前...
					result = moment( value ).fromNow();
					break;
				// case 'MONEYFORMAT': 	//货币格式化
				// 	break;
				case 'DISTANCE':		//计算设备和传入的位置参数的距离
					if (value instanceof Object) {
						let location = app.getLocation();
						if (location.latitude && location.longitude) {
							let distance = this.getFlatternDistance(value.lat, value.lng, location.latitude, location.longitude);
							if (distance > 1000) {
								result = Math.ceil(distance / 1000) + '公里'
							} else {
								result = Math.ceil(distance) + '米';
							}
						}
					}
					break;
				// case 'TIMEFORMAT':		//时长计算
				// 	break;
				// case 'FILESIZEFORMAT':	//格式化文件大小
				// 	break;
				case 'JOIN':	//拼接字符串数组
					result = value.join( currentParams[0] );
					break;
				// case 'MAX':	 	//最大值
				// 	break;
				// case 'MIN':	 	//最小值
				// 	break;
				case 'FIRST':	 	//第一项
					result = value[0];
					break;
				case 'LAST':	 	//最后一项
					result = value[ result.length-1 ];
					break;
				case 'DAYS':
					let secondTotal = 60 * 60 * 24,
						timmdiff = ( moment( result.end ).unix() - moment( result.start ).unix() ) / secondTotal;
					result = Math.ceil( timmdiff );
					break;
			}
						if( formatResult.input1 || formatResult.input2 ){
								result = [formatResult.input1, result, formatResult.input2].join('');
						}
		}
		return result;
	},
		/**
	 * 从接口数据中获取动态参数的值
	 * @param {Object}
	 *				{string} paramStr 参数字符串，eg: {{user.nickname}}
	 *				{object} pageOption 页面参数
	 *				{Object} targetData 当前点击的某一条数据（如果是列表组件，targetData就是列表项，详情组件该值与detailData应该相等）
	 *				{Object} detailData 详情数据
	 *				{Object} userinfo 用户信息
	 * @return {string} 返回参数值，eg: hogecloud
	 */
	getDynamicParameterValue(arg) {
		let paramStr = arg.paramStr.replace('{{', '').replace('}}', ''),	//'{{user.nickname}}' → 'user.nickname'
			paramArr = paramStr.split('.'),		//'user.nickname' → ['user','nickname']
			result = '',
			targetData = arg.targetData || {},
			detailData = arg.detailData || {};
		try{
			if (paramArr.length > 1) {
				let paramType = paramArr[0],	//'user'
					paramKey = paramArr[1];
				switch (paramType) {
					case 'page':  //说明当前的传出参数 为 之前一个页面的传入参数
						result = arg.pageOption[paramStr];     //从上一个页面的页面参数中，获取传出参数的值
						break;
					case 'data': //参数值为某条数据的字段值
						if( paramArr.length > 2 ){
							result = detailData[paramKey] instanceof Object ? detailData[paramKey][paramArr[2]] : '';
						}else{
							result = detailData[paramKey];
						}
						break;
					case 'user': //会员信息
						let userInfoMapping = {	//key是动态参数，value是接口数据字段名
							'nickname': 'nick_name',
							'avatar': 'avatar'
						};
						result = arg.userinfo ? arg.userinfo[userInfoMapping[paramKey]] : '';
						break;
					case 'create_user':	//投稿人信息
						let createUserInfoMapping = {	//key是动态参数，value是投稿人信息
							'nick_name': 'nick_name',
							'avatar' : 'avatar'
						};
						result = targetData.create_user ? targetData.create_user[ createUserInfoMapping[paramKey] ] : ''
						break;
					case 'app':	//app信息
						let appInfoMapping = {	//key是动态参数，value是app信息字段名
							'version_code': 'wxappVersion',
						};
						result = APPCONFIG.app.appInfo[appInfoMapping[paramKey]];
						break;
					case 'global': //自定义全局参数
						let globalparam = globalDataService.global_params[paramKey];
						let childconfig = ['date_area','address','model_list','model']
						let globalTypesMapping = {	//key是动态参数，value是接口数据字段名
							'start': 'start',
							'end': 'end',
							'latitude':'latitude',
							'longitude':'longitude',
							'address':'address',
							'point':'point'
						};
						//是含有二级字段的并且选了二级
						let value = globalparam ? (globalparam.value || globalparam.default) : '';
						if((!globalparam || childconfig.indexOf(globalparam.data_type) > -1) && paramArr.length > 2){
							if(!value){
									if(globalparam.key){
										let global_keys = paramArr[2];
										result=detailData[global_keys];
									}else{
											result = {}
									}
							}else {
								if (!(value instanceof Object)) typeof value == 'string' ? value : JSON.parse(value);
								result = value[globalTypesMapping[paramArr[2]]] ? value[globalTypesMapping[paramArr[2]]] : value;

							}
						}else {
							result = value;
						}
						globalDataService.mapping[arg.widgetViewId] = paramArr[1];
						break;
					case 'system':
						//全局里的当前时间
						if(paramKey=='current_time'){
							result=moment( new Date().getTime() ).format( 'YYYY-MM-DD hh:mm:ss' );
						}
						break;
					case 'node':	//节点
						result = paramArr[1];
						break;
					default:		//带有二级参数的普通字段，例如视频列表的『视频-索引图』
						result = detailData[paramArr[0]]?detailData[paramArr[0]][paramArr[1]]:'';
						break;
				}
			} else {
				result = targetData[paramStr] || '';
			}
		}catch(e){
			console.error(e);
		}
		try {	//如果值仍然是动态参数
			if( typeof result == 'string' && result.indexOf("{{") > -1 ){
				arg.paramStr = result;
				result = this.getDynamicParameterValue( arg );
			}
		} catch (e) {
			console.log(e);
		}
		return result;
	},
	// 生成不重复的随机数
  uuId(){
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
	}
}
export default services;
