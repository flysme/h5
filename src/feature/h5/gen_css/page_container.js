
import Style from '@h5/gen_css/common';

const style = attr=>{
  if(!attr)return;
  let styleResult = {};
  switch(attr.view){
    case 'submodules_tabbar':
        styleResult.submodules_tabbar = Style.toString({
            'display':'flex',
            'width':'100%',
            'height':`${Style.getConvertValue(attr.tab_height)}!important`,
            'background':Style.advanceBg(attr.bg),
        });
        styleResult.icon = Style.toString({
            'width':Style.getConvertValue(attr.icon_size),
            'height':Style.getConvertValue(attr.icon_size),
        })
        styleResult.text = Style.toString({
              'color':Style.formatColorToRgba(attr.text_nor_bg),
              'font-size':`${attr.text_size}px!important`,
        })
        styleResult.selectText = Style.toString({
              'color':Style.formatColorToRgba(attr.text_pre_bg),
              "background-color":attr.tabed_type != 0 ?  Style.formatColorToRgba(attr.tabed_bg):'',
              'font-size':`${attr.text_size}px!important`,
        })
        styleResult.divider = Style.toString({
            'width':'100%',
            'height':`${attr.divider_space}px`,
            "background-color":Style.formatColorToRgba(attr.divider_bg),
          })
        break;
      case 'submodules2':
      styleResult.submodulestab = Style.toString({
          'position':Style.isSpace(attr.column_style),
          'bottom':0,
          'z-index':20,
          'background':Style.advanceBg(attr.column_bg),
      });
        styleResult.submodules2 = Style.toString({
            'height':Style.getConvertValue(attr.column_height),
            'line-height':Style.getConvertValue(attr.column_height),
            "text-align":"center",
            "width":"100%",
            "white-space":"nowrap",
            "overflow":Style.isScroll(attr.column_isSplit),
        });
        styleResult.divider = Style.toString({
          "width":"100%",
          "height":"3px",
          "background":Style.formatColorToRgba(attr.column_cursorColor),
          "position":"absolute",
          "bottom":"0",

        });

        styleResult.image = Style.toString({
          "width":Style.subWidth(attr.column_imageWHScale,attr.column_height,attr.column_imagePadding),
          "padding":Style.padding(attr.column_imagePadding),
          "overflow":Style.richtextOverflow(attr.column_isSplit),
          "text-overflow":Style.iswrapesVisiable(attr.column_isSplit),
          "white-space":Style.isWrapspace(attr.column_isSplit),
          "line-height":Style.getConvertValue(attr.column_height),
          "height":Style.submodulesHeight(attr.column_height,attr.column_imagePadding),

        });

        styleResult.item = Style.toString({
          "color": Style.formatColorToRgba(attr.column_textNorColor),
          "font-size":attr.column_textSize+'px',
          "padding-right":Style.getConvertValue(attr.column_space),
          "padding-left":Style.getConvertValue(attr.column_space),
          "width":'100%',
          "overflow":Style.richtextOverflow(attr.column_isSplit),
          "text-overflow":Style.iswrapesVisiable(attr.column_isSplit),
          "white-space":Style.isWrapspace(attr.column_isSplit),
        });
        styleResult.itemActive = Style.toString({
          "color": Style.formatColorToRgba(attr.column_textCurColor),
          "font-size":attr.column_textSize+'px',
          "font-size":Style.isfontLarge(attr.column_isTextEnlarged,attr.column_textEnlargedSize,attr.column_textSize),
          "background-color":Style.isbgcolor(attr.column_cursorType,attr.column_cursorColor),
          "padding-right":Style.getConvertValue(attr.column_space),
          "padding-left":Style.getConvertValue(attr.column_space),
          "width":'100%',
          "overflow":Style.richtextOverflow(attr.column_isSplit),
          "text-overflow":Style.iswrapesVisiable(attr.column_isSplit),
          "white-space":Style.isWrapspace(attr.column_isSplit),
        });
        styleResult.item2Active = Style.toString({
          "color": Style.formatColorToRgba(attr.column_textCurColor),
          "font-size":attr.column_textSize+'px',
          "font-size":Style.isfontLarge(attr.column_isTextEnlarged,attr.column_textEnlargedSize,attr.column_textSize),
          "background-color":Style.isbgcolor(attr.column_cursorType,attr.column_cursorColor),
          "margin":"3px",
          "border-radius":"3px",
          "width":"calc( 100% - 6px )",
          "height":'calc('+Style.getConvertValue(attr.column_height) +' -  8px )',
          "line-height":'calc('+Style.getConvertValue(attr.column_height) +' -  8px )',
          "padding-right":Style.getConvertValue(attr.column_space),
          "padding-left":Style.getConvertValue(attr.column_space),
          "overflow":Style.richtextOverflow(attr.column_isSplit),
          "text-overflow":Style.iswrapesVisiable(attr.column_isSplit),
          "white-space":Style.isWrapspace(attr.column_isSplit),
        });
       break;
  }

    return styleResult;
}

export default style;
