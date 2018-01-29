/* 公用函数 */
var PRIVATE = {
  //十六进制色值转rgb
    toRgb : function(color, flag, alpha){
        var colorstr = "";
        if (color) {
            var str = color.replace('#', ''),
                arr = [];
            arr.push(parseInt(str.substr(0, 2), 16));
            arr.push(parseInt(str.substr(2, 2), 16));
            arr.push(parseInt(str.substr(4, 2), 16));
            if (flag == 'rgba') {
                arr.push(alpha || 1);
                colorstr = 'rgba(' + arr.join(',') + ')';
            } else {
                colorstr = 'rgb(' + arr.join(',') + ')';
            }
        }
        return colorstr;
    },
    // 客户端8位颜色编码 转为为6位＋透明度
    formatColor : function(str){
        var obj = {},
            reg = new RegExp('^#[0-9a-fA-F]{8}$');
        if (reg.test(str)) {
            obj.color = '#' + str.substr(3);
            var alpha = parseInt('0x' + str.substr(1, 2)) / 255;
            obj.alpha = (alpha == 1) ? alpha : alpha.toFixed(2);
        }
        return obj;
    },
    // 客户端8位颜色编码 直接转为rgba格式
    formatColorToRgba : function(color){
        var colorObj = this.formatColor(color),
            colorStr = this.toRgb(colorObj.color, 'rgba', colorObj.alpha);
        return colorStr || 'transparent';
    },
     //幻灯标题
    sliderLocation : function(titlelocation, size) {
        var spacesize = {};
        switch (titlelocation) {
          case 0:
            spacesize.topsize = '0';
            spacesize.bottomsize = '';
            break;
          case 1:
            spacesize.topsize = 'calc( ' + 100 * size / 2 + 'vw )';
            spacesize.bottomsize = '';
            break;
          case 2:
            spacesize.topsize = 'calc( ' + ((100 * size) - 5) + 'vw )';
            spacesize.bottomsize = '';
            break;
        }
        return spacesize;
      },
    //获取设备宽度
    getpexwidth:function() {
      var imageSize=375;

      return imageSize;
    },
    //新边框
    borders:function(flog, width, color) {
      if (flog) {
        return width + 'px solid ' + this.formatColorToRgba(color)
      } else {
        return 'none'
      }
   },
    //屏幕宽度高度转换
    screen: function (configSize) {
      var size;
          if (configSize<=1){
            size = configSize;
          }else{
            var imageSize =375;
               size = configSize /750 * imageSize;
          }

        return size;
      },
    //按屏幕宽度计算尺寸
    resizeWithWidth: function (size) {
        size = this.screen( size );
        if( size < 1 ) {
            size = 0;
        }
        return size + 'px';
    }
}
const SDK ={
    /**
    * 单位的转换
    * @params {number} value
    * @return {string}
    */
    getConvertValue(value){
        let defaultsize = 750, //默认最大尺寸
            result = ((value/defaultsize)*100)+'vw';
        return result;
    },
    /**
    * 对象转换为字符串
    * @params {object}
    * @return {string}
    */
    toString(styleObj){
      var str = '';
      for (var k in styleObj) {
          str += (k + ':' + styleObj[k] + ';')
      }
      return str;
    },
    //盒模型内子元素的伸缩比率
    flexBoxPer(width_type, weight){
        let  result = -1;        //设置一个不合法的值，使该属性不起效
        if( width_type == 'weight' ){//权重
            result = weight;
        }
        return result;
    },
    borderBoxWidth(width_type,width,padding,margin,border){
        let  result = 'auto';
        if( width_type == 'exactly' ){//固定值
            let borderWidth = (border && border.enabled) ? (border.left.width + border.right.width) : 0,
                paddingWidth = padding.left + padding.right,
                total = width+borderWidth+paddingWidth;
            result = this.getConvertValue(total);
        }else if( width_type == 'match_parent' ){ //撑满
            let marginWidth = margin.left + margin.right;
            result = marginWidth ? 'calc( 100% - '+this.getConvertValue(marginWidth)+')' : '100%';
        }
        return result;
    },
    heightType( height_type, height ){
      return this.flexBoxWidth( height_type, height )
    },
    //盒模型内子元素的宽度
    flexBoxWidth(width_type,width,padding,border,margin){
        let result = 'auto';
        if( width_type == 'exactly' ){//固定值
            result = this.getConvertValue(width);
        }else if( width_type == 'match_parent' ){ //撑满
            var border = (border && border.enabled) ? (border.left.width + border.right.width) + 'px' : 0,
                padding = (padding && padding.left && padding.right) ? (padding.left + padding.right) + 'px' : 0,
                margin = (margin  && margin.left && margin.right) ? (margin.left + margin.right) + 'px' : 0,
                pm = (padding+ margin) +'px';
            result = 'calc( 100% - '+pm+' - '+border+' )';
        }
        return result;
    },
    //内边距
    padding( padding ){
        let top = padding.top ? (this.getConvertValue(padding.top)) : 0,
            right = padding.right ? (this.getConvertValue(padding.right)) : 0,
            bottom = padding.bottom ? (this.getConvertValue(padding.bottom)) : 0,
            left = padding.left ? (this.getConvertValue(padding.left)) : 0,
            result = [top,right,bottom,left].join(' ');
        return result;
    },
    // 外边距
    margin( margin ){
        return this.padding( margin );
    },
    advanceBg(background) {
      let result = 'none';
        if( background ){
            if (background.is_image && background.img_url) {
                result = 'url(' + background.img_url + ') '+ (background.repeat ? 'repeat' : 'no-repeat') +' center';
            } else {
                result = this.formatColorToRgba(background.color);
            }
        }
        return result;
    },
    // 客户端8位颜色编码 直接转为rgba格式
    formatColorToRgba(color){
        var colorObj = this.formatColor(color),
            colorStr = this.toRgb(colorObj.color, 'rgba', colorObj.alpha);
        return colorStr || 'transparent';
    },
    // 客户端8位颜色编码 转为为6位＋透明度
     formatColor(str){
         var obj = {},
             reg = new RegExp('^#[0-9a-fA-F]{8}$');
         if (reg.test(str)) {
             obj.color = '#' + str.substr(3);
             var alpha = parseInt('0x' + str.substr(1, 2)) / 255;
             obj.alpha = (alpha == 1) ? alpha : alpha.toFixed(2);
         }
         return obj;
     },
     //十六进制色值转rgb
      toRgb(color, flag, alpha){
          var colorstr = "";
          if (color) {
              var str = color.replace('#', ''),
                  arr = [];
              arr.push(parseInt(str.substr(0, 2), 16));
              arr.push(parseInt(str.substr(2, 2), 16));
              arr.push(parseInt(str.substr(4, 2), 16));
              if (flag == 'rgba') {
                  arr.push(alpha || 1);
                  colorstr = 'rgba(' + arr.join(',') + ')';
              } else {
                  colorstr = 'rgb(' + arr.join(',') + ')';
              }
          }
          return colorstr;
      },
      //边框宽度
      borderWidth(borderObj){
            let result = 0,
                _this = this;
            if( borderObj.enabled ){
                var reset = function( dic ){
                    return (borderObj[dic] && borderObj[dic].width) ? _this.getConvertValue(borderObj[dic].width) : 0;
                }
                result = [ reset('top'), reset('right'), reset('bottom'), reset('left'), ''].join(' ');
            }
            return result;
      },
      //边框颜色
      borderColor(borderObj){
          let result = 'transparent';
          if( borderObj.enabled ){
              result = [
                  this.formatColorToRgba(borderObj.top.color),
                  this.formatColorToRgba(borderObj.right.color),
                  this.formatColorToRgba(borderObj.bottom.color),
                  this.formatColorToRgba(borderObj.left.color)
              ].join(' ');
          }
          return result;
      },
      //圆角
      radius(attr){
            if( attr.enabled ){
                return [attr.left_top, attr.right_top, attr.right_bottom, attr.left_bottom, ''].join('px ');
            }else{
                return 'none';
            }
      },
      //阴影
      shadow(shadowObj) {
            let enabled = shadowObj.enabled,
                direction = shadowObj.direction || 4,
                voffset = shadowObj.offset_x,
                hoffset = shadowObj.offset_y,
                color = shadowObj.color,
                radius = shadowObj.blur_radius;
            let result = 'none';
            if (enabled) {
                if (direction == 0) {
                    voffset = voffset * (-1);
                    hoffset = hoffset * (-1);
                } else if (direction == 1) {
                    hoffset = hoffset * (-1);
                } else if (direction == 2) {
                    voffset = voffset * (-1);
                }
                let shadowcolor = this.formatColorToRgba(color);
                result = voffset + 'px ' + hoffset + 'px ' + radius + 'px ' + shadowcolor;
            }
            return result;
      },
      // 盒模型线性方向
      flexDirection( orientation ){
          return (orientation == 'horizontal') ? 'row' : 'column';
      },
      //高斯模糊
      isBlur(blur_enabled, blur_radius){
          return 'blur('+ (blur_enabled ? blur_radius : 0) +'px)';
      },
      //节点是否显示
      isVisiable(value){
          return value ? 'block' : 'none';
      },
      textHeight(fontSize, lineSpace,lines){
          if( lines ){
              return ((fontSize + lineSpace) * lines)+'px';
          }else{  //0行
              return 'auto';
          }
      },
      // 是否加粗
      isBold( is_bold ){
          return (is_bold) ? 'bold' : 'normal'
      },
      //文字是否换行>1
      isWrap( lines ){
          return (lines > 1 || lines == 0) ? 'normal' : 'nowrap'
      },
      //文字行高计算  参数:行间距，字号
      textLineHeight( space, fontSize ){
          return (space + fontSize) +'px';
      },
      /*------图标式标签 start--------*/
      tag2widgetHeight(icon_height, tag_font_size) {
        return PRIVATE.resizeWithWidth(icon_height) > tag_font_size ? PRIVATE.resizeWithWidth(icon_height) : tag_font_size+'px';
      },
      /*------图标式标签 end--------*/
      //边框是对象的方法
      borders(border, borderdir) {
        if(!borderdir)return 'none';
        var isenable = border.enabled;
        return PRIVATE.borders(isenable, border[borderdir].width, border[borderdir].color);
      },
      /*----- listui2 大图组件相关计算-----*/
      listui2IndexPicWidth( views, attr_key ){
          return 'calc( ' + 100 * views.indexPic_whScale + 'vw - ' + this.getConvertValue(views.strokeWidth * 2 + views.margin.left + views.margin.right + views.itemPadding.left + views.itemPadding.right) + ')';
      },
      /*----- listui2 大图组件相关计算 end-----*/
      /*------等高导航器 start--------*/
      getnavindexpicHeights(views,indexPicwhScale,indexPicfatherScale){
          var  padding=(views.itemPadding.left+views.itemPadding.right) == 0 ? '0px' :this.getConvertValue(views.itemPadding.left+views.itemPadding.right),
               result=(views.style ==4 || views.style == 5 || views.style==6 || views.style == 7) ? 'calc( ' + (100 *indexPicwhScale) * indexPicfatherScale + '% + ' +padding+ ' )' : 'calc( ' + (100 *indexPicwhScale) * indexPicfatherScale + '% )';
          return result;
      },
      getnavindexpicWidth(value){
         var result='calc( ' + 100 *value + '% )';
         return result;
      },
      /*------等高导航器 end--------*/
      /*九宫图----------------*/

      mulitWidth(imagespace,imagesize){
          let result =  this.getConvertValue((imagesize+imagespace) *3 -imagespace);
          return result;
      },
      /*九宫图--------end--------*/
      /*多行文本输入器控件 ----start-----*/
      multitextWidth(width){
          let result = width == 0 ? 0 : this.getConvertValue(width)
          return result;
      },
      /*多行文本输入器控件 ----end-----*/
      /*------富文本 start--------*/
      richtextOverflow(value) {
        var result = value ? 'hidden' : 'auto';
        return result;
      },

      richtextConHeight(isColls, minheight) {
        return isColls ? this.getConvertValue(minheight):'auto';
      },
      /*------富文本 end--------*/
      //文字对齐方式
      textAlign(value){
          var align = ['left', 'center', 'right'];
          return align[ +value ] + '';
      },
      shadow_old( enabled, direction, voffset, hoffset, color, radius){
          var result = 'none';
          if (enabled) {
              if (direction == 0 || direction == 2){
                  voffset = voffset * (-1);
              }
              if( direction == 0 || direction == 1){
                  hoffset = hoffset * (-1);
              }
              var shadowcolor = PRIVATE.formatColorToRgba(color);
              result = voffset + 'px ' + hoffset + 'px ' + radius + 'px ' + shadowcolor;
          }
          return result;
      },
      /*----- Slider 幻灯组件相关计算 -----*/
      swiperHeight(value){
         return 'calc( '+100 * value + 'vw )';
      },

      swipermainHeight(height,srcollheight, padding, isVisiable){
         return 'calc('+100 * height + 'vw + ' + (isVisiable ? srcollheight+(padding.top+padding.bottom)/2 : 0)+'px)';
      },
      swiper2height(height,textSize, titlepadding, slidersize, sliderpadding){
         return 'calc('+100 * height + 'vw + ' + ((textSize+slidersize)+(titlepadding.top+titlepadding.bottom)/2+(sliderpadding.top+sliderpadding.bottom)/2)+'px)';
      },

      swiperbottom(textSize,padding, visable){
         let result = visable ? (textSize+(padding.top+padding.bottom)/2) : 0;
         return result+'px';
      },

      swiperincurrentbottom(textSize,padding, isvisable, margin){
         let total = isvisable == true ?  (textSize+(padding.top+padding.bottom)/2) +'px' : this.getConvertValue(margin.bottom);
         return total;
      },


      sliderSize(value){
        var result = value/ 1.75 + 'px';
        return result;
      },

      slidertitlebold(value) {
        var result = value ? '700' : 'normal';
        return result;
      },

      sliderminheight(value) {
        var result = (value+2)+'px';
        return result;
      },

      slidertitleLocation(isEffect,titleLocation, whScale){
           let result = isEffect ? PRIVATE.sliderLocation(titleLocation, whScale).topsize : '15px';
          return result;
      },

      slidercurrentWidth(margin,padding, sliderpadding){
          let marginval=(margin.left+margin.right+padding.left+padding.right+sliderpadding.left+sliderpadding.right) == 0 ? "0px" : this.getConvertValue(margin.left+margin.right+padding.left+padding.right+sliderpadding.left+sliderpadding.right);
         return 'calc( 100% - ' +marginval+' )';
      },

      sliderposrspace(value){
           var space =value.right;
           return this.getConvertValue(space);
      },

      sliderbottom(value){
           var space =value.bottom;
           return this.getConvertValue(space);
      },
      /*----- Slider 幻灯组件相关计算 end-----*/
      justContent(value) {
        var content = ['flex-start', 'center', 'flex-end'];
        return content[+value] + '';
      },
      itempadding(value){
          return this.getConvertValue(value/2);
      },
      isDisplay(bool, flag){
            if (bool) {
                if (flag) {
                    return flag;
                } else {
                    return "block";
                }
            } else {
                return "none";
            }
      },
      /*----- listui4 等高组件相关计算 -----*/
      navwidth(value) {
        var result = (value ==0 || value ==1) ? 0 : this.getConvertValue(value);
        return result;
      },
      listui4itemwidth(views){
       var driverwidth = (views.vertical_divider_width == 1 || views.vertical_divider_width == 0) ? 0 : views.vertical_divider_width,
           dividerTotal = driverwidth,
           dividerMarginTotle = ( views.vertical_divider_margin.left + views.vertical_divider_margin.right ),
           total =(dividerTotal+dividerMarginTotle) == 0 ? '0px' :  this.getConvertValue(dividerTotal+dividerMarginTotle);
      return 'calc( ( 100% + '+ total +' ) / '+ views.eachLineCount +' )'
      },
            //4 5 6 7 百分比放在外围
      listui4IndexPicWidthOut(style,indexPic_fatherScale){
          if( style == 4 || style == 5 || style == 6 || style == 7 ){
              return (100*indexPic_fatherScale) + '%';
          }else{
              return '100%';
          }
      },
      listui4IndexPicHeight(views){
          var result = 'calc( ' + 100 *  views.indexPic_whScale / views.eachLineCount + 'vw - ' + (views.strokeWidth * 2  + views.itemPadding.left + views.itemPadding.right) + 'px)';
          return result;
      },
      listui4EachLineCount( views ){
          var margin = views.margin.left + views.margin.right,
              dividerTotal = views.vertical_divider_width * (views.eachLineCount - 1),
              dividerMarginTotle = ( views.vertical_divider_margin.left + views.vertical_divider_margin.right ) * (views.eachLineCount - 1),
              total = this.getConvertValue(margin+dividerTotal+dividerMarginTotle);
          return 'calc( ( 100vw - '+ total +' ) / '+ views.eachLineCount +' )'
      },
      listui4itemwidthdel(views){
          var driverwidth = (views.vertical_divider_width == 1 || views.vertical_divider_width == 0) ? 0 : views.vertical_divider_width,
                 dividerTotal = driverwidth * (views.eachLineCount-1),
                 dividerMarginTotle = ( views.vertical_divider_margin.left + views.vertical_divider_margin.right ) * (views.eachLineCount),
                 total =(dividerTotal+dividerMarginTotle) == 0 ? '0px' :  this.getConvertValue(dividerTotal+dividerMarginTotle);
          return 'calc( ( 100% - '+ total +' ) / '+ views.eachLineCount +' )'
      },

      listui4width(views,dividermargin){
          let total = views.margin.left+views.margin.right == 0 ? '0px' :this.getConvertValue(views.margin.left+views.margin.right);
          return 'calc(100% - '+ ( total )+' )'
      },

      listdevwidth(views){
        var dividerTotal = views.vertical_divider_width,
            dividerMarginTotle = ( views.vertical_divider_margin.left + views.vertical_divider_margin.right ),
            total = (dividerTotal+dividerMarginTotle) == 0 ? '0px' : this.getConvertValue(dividerTotal+dividerMarginTotle);
         return 'calc(  100% - '+ total +' )'
      },


      listui4horizonwidth( value ){
          var margin = value.left + value.right;
          return 'calc( 100% - '+ this.getConvertValue(margin) +' )'
      },
      listui4IndexPicWidth(style, indexPic_fatherScale){
        if( style == 0 || style == 1 || style == 2 || style == 3 || style == 4 || style == 5 || style == 6 || style == 7 ){
            return '100%';
        }else{
            return (100*indexPic_fatherScale) + '%';
        }
      },

      verticallineheights(views){
         var itempadding=(views.itemPadding.top+views.itemPadding.bottom),
             titlemargin=(views.title_margin.top+views.title_margin.bottom),
             dividermargin=(views.divider_margin.top+views.divider_margin.bottom),
             itemborder=(views.item_border.top.width+views.item_border.bottom.width),
             width = views.vertical_divider_width == 0 ? 0 : this.getConvertValue(views.vertical_divider_width),
              total=((views.title_textSize+views.divider_height+itempadding+titlemargin+dividermargin+itemborder)-(views.strokeWidth * 2  + views.itemPadding.left + this.getConvertValue(views.itemPadding.right)));
         var result = 'calc( ' + '('+100  + 'vh +'+ total  +') /'+views.eachLineCount +' - '+ width + ' )';
       return result;
      },
      /*----- listui4 等高组件相关计算 end-----*/
      /*------等高导航器 start--------*/
      navigawidth(margin,verticalwidth, verticalmargin, eachLineCount){
          var result=(PRIVATE.getpexwidth() - (PRIVATE.screen(margin.left) + PRIVATE.screen(margin.right) + (PRIVATE.screen(verticalwidth) * (eachLineCount - 1)) + ((PRIVATE.screen(verticalmargin.left) + PRIVATE.screen(verticalmargin.right)) * (eachLineCount - 1)))) / eachLineCount +'px';
          return result;
       },


      //边框
      navigaborder(width,color) {
          var border='';
          if (color){
            border = PRIVATE.screen(width) + 'px solid ' + PRIVATE.formatColorToRgba(color);
          }else{
              border='none';
          }
          return border;

      },
      navminheight(textSize, lineNum) {
        var result = ((textSize+2)*lineNum)+'px';
        return result;
      },
      getnavindexpicWidth(value){
          let result='calc( ' + 100 *value + '% )';
          return result;
      },
      getnavindexpicHeight(indexPicwhScale,eachLineCount,itemPadding){
          var result= 'calc( ' + 100 * indexPicwhScale / eachLineCount + 'vw - ' + (itemPadding.left + itemPadding.right) + 'px)';
          return result;
      },
      getnavindexpicHeights(views,indexPicwhScale,indexPicfatherScale){
          var padding=(views.itemPadding.left+views.itemPadding.right) == 0 ? '0px' :this.getConvertValue(views.itemPadding.left+views.itemPadding.right),
               result=(views.style ==4 || views.style == 5 || views.style==6 || views.style == 7) ? 'calc( ' + (100 *indexPicwhScale) * indexPicfatherScale + '% + ' +padding+ ' )' : 'calc( ' + (100 *indexPicwhScale) * indexPicfatherScale + '% )';
          return result;
      },
      desbottom(value){
        let result=value == 10 ? '0' :'aaa';
        return result;
      },
      /*------等高导航器 end--------*/
      /*------标准列表导航器 start--------*/
      listnav1Height(titlelineSpace,titlelineNum,titletextSize){
          let  result=(titlelineSpace == '0.0' || titlelineNum ? 1 : titlelineSpace) * titletextSize + 'px';
          return result;
      },

      navgetsizes(value){
          let result=PRIVATE.resizeWithWidth(value);
          return result;
      },
      /*------标准列表导航器 end--------*/
      //在父元素中对齐方式
      alignSelf( value ){
          var hash = {
              top : 'flex-start',
              left : 'flex-start',
              'center_vertical' : 'center',
              'center_horizontal' : 'center',
              bottom : 'flex-end',
              right : 'flex-end'
          };
          return hash[ value ];
      },
      /*标准列表组件的索引图默认边距*/
      listui1DefaultMargin(value){
          var result=null;
          if(value.top||value.right||value.left||value.bottom){
              result=0;
          }else{
              result=this.getConvertValue(16)
          }
          return result;
      },
      /*列表搜索组件 -----start----*/
      listSearchIconMR(style,padding){
          return [4,5,6,7].indexOf(style)!=-1?'0':padding;
      },
      /*列表搜索组件 -----end----*/
      /* ----- 搜索功能模块 start ----- */
      getDivider( enabled, height ){
          return enabled ? this.getConvertValue(height)  : "0px";
      },
      searchInputWidth(padding,margin){
        let p_left  = padding.left ? padding.left : 0,
            p_right = padding.right ? padding.right : 0,
            m_left = margin.left ? margin.left : 0,
            m_right = margin.right ? margin.right : 0,
            total = (p_left+p_right+m_left+m_right)>=0 ? this.getConvertValue(p_left+p_right+m_left+m_right):'0px';
        return 'calc( 100% - '+(total)+' )';
      },
      getBackground(attrObj) {
          let result = 'none';
        return attrObj.img_url ? 'url(' + attrObj.img_url + ') '+ 'no-repeat' +' center' : result;
      },
      getbackgroundSize(width,height){
        return this.getConvertValue(width) +' '+this.getConvertValue(height);
      },

      /* ----- 搜索功能模块 end ----- */
      slidewidth(width,margin){
          let result = this.getConvertValue(width-(margin.left+margin.right));
          return result;
      },

      sideSlipListItemWidth( indexPic_width,indexPic_margin ){
          return this.getConvertValue(indexPic_width + indexPic_margin.left + indexPic_margin.right);
      },
      /*横滑组件 ----end-----*/
      /*------多图幻灯 start--------*/
      sliderwidgetWidth(slider_pic_width, pic_border, padding) {
        return this.getConvertValue(slider_pic_width + pic_border.left.width * 2 + padding.left + padding.right);
      },
      isfontLarge(isTextEnlarged,textEnlargedSize,textSize ){

            return (isTextEnlarged ? textEnlargedSize : textSize) + 'px';
      },
      isbgcolor(style,color ){
            return style == 2 ? this.formatColorToRgba( color ) : 'none';
      },
      iswrapesVisiable( value ){
          return value ? 'ellipsis' : 'clip';
      },
      isWrapspace( lines ){
          return lines ? 'nowrap' : 'normal'
      },
      isScroll( lines ){
          return lines ? 'hidden' : 'scroll'
      },
      isSpace( style ){
          return style == 0 ? 'relative' : 'fixed'
      },
      /*栏目栏组合页模板*/
      subWidth(imageWHScale,columnheight,columnimagePadding){
        return this.getConvertValue(imageWHScale*(columnheight - (columnimagePadding.bottom + columnimagePadding.top)));
      },
      submodulesHeight(columnheight,columnimagePadding){
        return this.getConvertValue((columnheight - (columnimagePadding.bottom + columnimagePadding.top)));
      },
      /*------多图幻灯 end--------*/
      /*---------------图集列表组件配置--------*/
      listUI16CompHeight(margin,item_border,itemPadding,indexPic_whScale,typeval){
        var cwidth = (750 - margin.left - margin.right - item_border.left.width - item_border.right.width - itemPadding.left - itemPadding.right) * 2 / 3;
        var result="";
         if(typeval == 'height' ){
           result=this.getConvertValue(cwidth * indexPic_whScale);
         }else if(typeval=='width'){
           result=this.getConvertValue(cwidth);
         }else if(typeval=="otherpicheight"){
           result=this.getConvertValue(Math.floor(((cwidth * indexPic_whScale)-10)/2));
         }

        return result;
      },
      //通过条件比较返回参数
      compareParmas(status, param1, param2,a,b) {

        var methodname='',condition='';
        if (arguments.length > 3) { methodname = Object.keys(a)}
        if (arguments.length > 4) { condition = Object.keys(b) }

        if(methodname&&condition){
          return status == condition ? methodname(param1) : param2;
        } else if (methodname){
          return status? methodname(param1) : param2;
        }else{
          return status ? this.getConvertValue(param1): param2;
        }
      },
}

export default SDK;
