import APPCONFIG from '@h5/static/app_config.js';
import utilsService from "@h5/services/utils"
import Style from '@h5/gen_css/common';

const viewHeaderSdk={
	//获得头部配置 pageid:20604465
	getNavbarConfig(pageid){
		let allPages=APPCONFIG.pages.pages;
		//拿到全局的顶栏样式配置和页面配置
		let global_config=this.getNavbarStyle(APPCONFIG.pages.global_style,'global');

		let resultObj={};
		//判断是否具有pageid如果没有只返回全局配置
		if(pageid){
			let page_config=this.getNavbarStyle(allPages[pageid].view_id,'page'),
				page_data=allPages[pageid];

			resultObj={ page:page_data, global_config, page_config }
		}else{
			resultObj={ global_config }
		}
		//返回当前页面ID拿到的所有数据
		return resultObj;
	},
	//获得navbar样式信息
	getNavbarStyle(viewid,styletype){
		let moduleViews=APPCONFIG.modules,
			currentModuleView=moduleViews[viewid],//视图下的所有配置
			styleConfig=currentModuleView[viewid],//拿到当前style配置
			resultObj={};
		resultObj['viewid']=viewid;//当前传入进来的页面视图ID
		let currentStyle=null,currentNavbar=null;
		//判断是否是拿全局还是页面
		if(styletype=='global'){
			currentStyle=styleConfig;//获取style配置
			currentNavbar=currentModuleView[currentStyle.navbar];//获取navbar配置
			//追加参数
			resultObj['page_setting']=currentStyle;
			resultObj['navbar_setting']=currentNavbar;
			resultObj['global_back_style']=currentModuleView[currentStyle.global_back_btn];
			resultObj['top_btn_collection']={};//存放所有顶部按钮样式
		}else{
			currentStyle=currentModuleView[styleConfig.style];//获取style配置
			currentNavbar=currentModuleView[currentStyle.navbar];//获取navbar配置
			//追加参数
			resultObj['page_setting']=currentStyle;
			resultObj['navbar_setting']=currentNavbar;
			resultObj['top_btn_collection']={};//存放所有顶部按钮样式
		}
		//追加顶部左侧、中间和右侧的配置样式
		let allTopConfigViewId=[
			{key:"left_menus",data:currentNavbar.left_menus},
			{key:"center_menus",data:currentNavbar.center_menus},
			{key:"right_menus",data:currentNavbar.right_menus}
		];
		allTopConfigViewId.forEach((item,index)=>{
			resultObj['top_btn_collection'][item.key]={};
			//循环里面具体的数据
			item.data.forEach((itemid,itemindex)=>{
				resultObj['top_btn_collection'][item.key][itemid]=currentModuleView[itemid];
			});
		});
		return resultObj;
	},
	//获得导航栏的默认高度
	getNavbarDefaultHeight(){
		let moduleViews=APPCONFIG.modules,
			navbarViewId=APPCONFIG.pages.global_style,
			currentModuleView=moduleViews[navbarViewId],//视图下的所有配置
			globalModuleView=currentModuleView[navbarViewId],
			globalNavbarView=currentModuleView[globalModuleView.navbar];//难道全局的默认顶栏配置
		return parseInt(globalNavbarView.height/2);
	},
	//处理导航栏背景
	dealNavbarBg(navbarDefaultHeight,theme_color){
		return {
			"height":`${navbarDefaultHeight}px`,
			"background":Style.formatColorToRgba(theme_color)
		}
	},
	//主题导航字体颜色和大小
	dealNavbarFont(title_textColor,title_textSize){
		return {
			"color":Style.formatColorToRgba(title_textColor),
			"font-size":`${title_textSize}px`
		}
	},
	//处理返回按钮的方法
	dealSystemBackBtn(backconfig){
		let tempObj={};
		tempObj['arrow_wrap']={
			"margin":Style.margin(backconfig.margin),
			"padding":Style.padding(backconfig.padding)
		};

		tempObj['arrow_img']={
			"width":`${backconfig.icon_width/2}px`,
			"height":`${backconfig.icon_height/2}px`,
			"background":Style.advanceBg(backconfig.icon_slide_nor),
			"border-radius":`${backconfig.icon_radius}px`,
			"margin-right":`${backconfig.space/2}px`,
			"background-size":"cover"
		};
		
		tempObj['arrow_title']={
			"font-weight":Style.isBold(backconfig.title_is_bold),
			"font-size":`${backconfig.title_size}px`,
			"background":Style.formatColorToRgba(backconfig.title_bg),
			"color":Style.formatColorToRgba(backconfig.title_nor_color)
		}

		tempObj['style']=backconfig.style;
		tempObj['title_text']=backconfig.title_text

		return tempObj;
	}
};

export default viewHeaderSdk