<template>
    <div :style="getStyle(search_bar)['search_view']">
          <!--搜索条-->
           <div :id="search_bar">
               <div class="sys-flex sys-flex-center" :style="getStyle(search_bar)['search_bar']">
                   <div class="sys-flex-one">
                       <input  :style="getStyle(search_bar)['input_box']" @keyup.13="keyword" @blur="keyword" :placeholder="search_bar.input_box_place_hold_text" v-model="keyboardData"/>
                   </div>
                   <div  @click="cancel" :style="getStyle(search_bar)['cancel_btn']">取消</div>
               </div>
               <div  :style="getStyle(search_bar)['divider']"></div>
           </div>
       <!--搜索条 end-->


        <!--历史记录-->
        <div :id="search_record"  v-if="!isSearch&& history && history.length>0">
            <div class="sys-flex sys-flex-center" :style="getStyle(search_record)['search_history']">
                <div class="sys-flex-one" :style="getStyle(search_record)['title']">
                    {{search_record.header_text}}
                </div>
                <div @click="clearHistory" :style="getStyle(search_record)['history_icon']"></div>
            </div>
            <div class="sys-wrap sys-flex" v-if="!isSearch && history && history.length " :style="getStyle(search_record)['keywords']">
                <div v-if='idx<search_record.keywords_max_num' :style="getStyle(search_record)['keywords_item']" hover-class="keywords_item_hover" :key="idx" @click="copyKeyword(item)"  v-for="(item,idx) in searchData.history">{{item}}</div>
            </div>
        </div>
        <!--及时记录 end-->

        <!--搜索占位-->
     <div :id="search_place_holder">
         <div :style="getStyle(search_place_holder)['search_place_holder']" class="sys-flex" v-if="searchData&&searchData.searchRecord&&searchData.searchRecord.length<=0 && isSearch">
             <div class="auto">
                 <div :style="getStyle(search_place_holder)['icon']"  v-if="search_place_holder.icon_enable"></div>
                 <div :style="getStyle(search_place_holder)['text']"  v-if="search_place_holder.text_enable">{{search_place_holder.text}}</div>
             </div>
         </div>
     </div>
     <!--搜索占位 end-->

        <!--热搜-->
     <div :id="search_hot">
         <div  v-if="!isSearch&&searchData.hottags && searchData.hottags.length>0" :style="getStyle(search_hot)['hot_tag']">
             <div :style="getStyle(search_hot)['header']" v-if='searchPageData.search_container.search_hot'>{{search_hot.header_text}}</div>
             <div :style="getStyle(search_hot)['tags_wrap']" class="sys-flex sys-wrap" hover-class="tags_active">
                 <div :style="getStyle(search_hot)['tags']" v-for="(item,idx) in searchData.hottags"  @click="chooseHot(item)">
                     {{item}}
                 </div>
             </div>
         </div>
     </div>
     <!--热搜 end-->

     <!--搜索结果-->
       <div v-if="isSearch && searchRecord&& searchRecord.length>0" v-for="(compViewId,idx) in PAGE&&PAGE.VIEWIdS" class="list-container" :id="compViewId" :view_key="PAGE.VIEWS[compViewId].view">
         <component
           :is="PAGE.VIEWS[compViewId].view"
           :data="{
             VIEWS:PAGE.VIEWS,
             componentView: PAGE.VIEWS[compViewId],
             componentData: PAGE.data[compViewId],
             componentViewId:compViewId,
             currentDetail:currentDetail
           }"></component>
       </div>
    <!--搜索结果 end-->

    </div>
</template>
<script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
  import Style from '@h5/gen_css/common';
  import API from '@h5/api/index'
  import "@h5/style/app.css"
  import pageItem from '@h5/components/page_item';
  /** 组件入口 **/
  //列表组件
  import ListUI1 from '@h5/components/component/listui1';
  import ListUI2 from '@h5/components/component/listui2';
  import ListUI4 from '@h5/components/component/listui4';
  import ListUI14 from '@h5/components/component/listui14';
  import Slider from '@h5/components/component/Slider';
  //栏目栏
  import filter_node from '@h5/components/component/filter_node';
  import left_filter_node from '@h5/components/component/left_filter_node';
  //导航器
  import navigator1 from '@h5/components/component/navigator1';
  import navigator2 from '@h5/components/component/navigator2';
  //详情组件
  import layout_component from '@h5/components/component/layout_component';
  import shoppingcart_toolbar from "@h5/components/component/shoppingcart_toolbar";
  //搜索组件
  import list_search from "@h5/components/component/list_search";
      export default {
         data(){
            return {
              keyboardData:'',  //关键词
              HotData:'', //热词
            }
         },
         created(){
          //初始化数据
           this.init();
         },
         computed: {
           ...mapState('search',['searchData']),
           ...mapState('pageStore',['contentDetail','componentsDatas']),
             currentDetailId(){
               return this.$route.query.content_id;
             },
             currentDetail(){
         			return this.contentDetail[this.currentDetailId] || {};
         		 },
             isSearch(){
               return this.searchData.isSearch;
             },
             history(){
               return this.searchData.history;
             },
             searchRecord(){
               return this.searchData.searchRecord;
             },
             PAGE(){
               return this.searchData.PAGE;
             },
             searchPageData(){
                return this.searchData.pageData;
             },
             search_bar(){
               return this.searchPageData.VIEWS[this.searchPageData.search_container.search_bar];
             },
             search_record(){
               return this.searchPageData.VIEWS[this.searchPageData.search_container.search_record];
             },
             search_place_holder(){
               return this.searchPageData.VIEWS[this.searchPageData.search_container.search_place_holder];
             },
             search_hot(){
               return this.searchPageData.VIEWS[this.searchPageData.search_container.search_hot];
             }
         },
         methods:{
            /*取消*/
           cancel(){
             this.$store.dispatch('search/cancel',false);
           },
           init(){
             this.$store.dispatch('search/initAttr');
             //获取常见搜索热词
             this.$store.dispatch('search/getKeyword');
             console.log('xxxxx-searchData',this.searchData)
           },
           /*搜索*/
           keyword(){
             console.log('searchData',this.keyboardData,'this.$route',this.contentDetail)
             if(!this.keyboardData)return;
             this.$store.dispatch('search/searchData',this.keyboardData);
             console.log('xxxxx-searchData',this.searchData)
           },
          /*复制搜索*/
          copyKeyword(word){
              this.keyboardData =word;
              this.$store.dispatch('search/searchData',this.keyboardData);
          },
           /*历史记录*/
           clearHistory(){
             this.$store.dispatch('search/clearHistory',this.keyboardData);
           },
           /*热搜*/
           chooseHot(){
             if(!this.HotData)return;
             this.$store.dispatch('search/searchData',this.HotData);
           },
           /*样式*/
           getStyle(attr){
             if(!attr)return;
             let styleResult = {};
             switch(attr.view){
               case "search_bar":
                   /*---搜索功能模块样式----*/
                  styleResult.search_view = Style.toString({
                      "background":Style.advanceBg(attr.bg),
                      "background-size":"contain",
                      "height":Style.getConvertValue(attr.height),
                      "line-height":Style.getConvertValue(attr.height),
                      "z-index": "100"
                    });
                  styleResult.search_bar = Style.toString({
                    "background-color":Style.formatColorToRgba(attr.search_textfield_bg_color),
                    "border-radius":attr.search_textfield_cornerRadius+'px',
                    "border-width":attr.search_textfield_border_width+'px',
                    "border-color":Style.formatColorToRgba(attr.search_textfield_border_color),
                    "border-style":"solid",
                    "display":"flex",
                    "align-items": "center",
                  });
                  styleResult.divider = Style.toString({
                    "background": Style.advanceBg(attr.divider_bg),
                    "height":Style.getDivider(attr.divider_is_visible,attr.divider_height),
                  });

                  styleResult.input_box = Style.toString({
                    "background":Style.advanceBg(attr.input_box_bg),
                    "width":Style.searchInputWidth(attr.input_box_padding,attr.input_box_margin),
                    "padding":Style.padding(attr.input_box_padding),
                    "margin":Style.margin(attr.input_box_margin),
                    "height":Style.getConvertValue(attr.input_box_height),
                    "line-height":Style.getConvertValue(attr.input_box_height),
                    "border-radius":Style.getDivider(attr.input_box_corner_enable,attr.input_box_corner_radius),
                    "text-align":attr.input_box_text_alignment,
                    "color":Style.formatColorToRgba(attr.input_box_text_color),
                    "font-size":attr.input_box_text_size+'px',
                    "border":'none',
                  });

                  styleResult.place_hold = Style.toString({
                    "background":Style.advanceBg(attr.input_box_bg),
                    "width":Style.searchInputWidth(attr.input_box_padding,attr.input_box_margin),
                    "padding":Style.padding(attr.input_box_padding),
                    "margin":Style.margin(attr.input_box_margin),
                    "height":Style.getConvertValue(attr.input_box_height),
                    "line-height":Style.getConvertValue(attr.input_box_height),
                    "border-radius":Style.getDivider(attr.input_box_corner_enable,attr.input_box_corner_radius),
                    "text-align":attr.input_box_text_alignment,
                    "color":Style.formatColorToRgba(attr.input_box_place_hold_color),
                    "font-size":attr.input_box_place_hold_size+'px',
                    "border":'none',
                  });
                  styleResult.cancel_btn = Style.toString({
                    "color":Style.formatColorToRgba(attr.cancel_btn_text_color),
                    "font-size":attr.cancel_btn_text_size+'px',
                    "margin":Style.margin(attr.cancel_btn_margin),
                  });
                break;
              case 'search_history_record':

                  styleResult.search_history = Style.toString({
                    "background":Style.advanceBg(attr.header_bg),
                    "line-height":Style.getConvertValue(attr.header_height),
                    "height":Style.getConvertValue(attr.header_height),
                    "margin":Style.margin(attr.header_margin),
                    "border-width":Style.borderWidth(attr.header_border),
                    "border-color":Style.borderColor(attr.header_border),
                    "border-style":"solid",
                  });
                  styleResult.title = Style.toString({
                    "color":Style.formatColorToRgba(attr.header_text_color),
                    "font-size":attr.header_text_size+'px',
                    "margin":Style.margin(attr.header_text_margin),
                  });

                  styleResult.history_icon = Style.toString({
                    "margin":Style.margin(attr.header_icon_margin),
                    "background":Style.getBackground(attr.header_nor_icon),
                    "width":Style.getConvertValue(attr.header_icon_width),
                    "height":Style.getConvertValue(attr.header_icon_height),
                    "background-size":Style.getbackgroundSize(attr.header_icon_width,attr.header_icon_height),
                  });


                  styleResult.keywords = Style.toString({
                    "margin":Style.margin(attr.record_margin),
                  });

                  styleResult.keywords_item = Style.toString({
                     "padding":Style.padding(attr.keywords_padding),
                     "color":Style.formatColorToRgba(attr.keywords_text_color),
                     "font-size":attr.keywords_text_size+'px',
                     "background":Style.formatColorToRgba(attr.keywords_nor_bg),
                     "border-width":Style.borderWidth(attr.keywords_border),
                     "border-color":Style.borderColor(attr.keywords_border),
                     "border-style":"solid",
                     "border-radius":Style.getDivider(attr.keywords_corner_enable,attr.keywords_corner_radius),
                     "margin-right":Style.getConvertValue(attr.keywords_column_space),
                     "margin-bottom": Style.getConvertValue(attr.keywords_row_space),
                     "line-height":'1',
                  });

                  styleResult.keywords_item_hover = Style.toString({
                      "background":Style.formatColorToRgba(attr.keywords_pre_bg),
                  })
                break;
              case 'search_place_holder':
                  styleResult.search_place_holder = Style.toString({
                      "background":Style.advanceBg(attr.bg),
                      "height": 'calc( 100vh - '+ Style.getConvertValue(attr.icon_height)+'  )',
                  });
                  styleResult.icon = Style.toString({
                      "height":Style.getConvertValue(attr.icon_height),
                      "width":Style.getConvertValue(attr.icon_width),
                      "background":Style.getBackground(attr.icon),
                      "background-size":Style.getbackgroundSize(attr.icon_width,attr.icon_height),
                      "margin-bottom":Style.getConvertValue(attr.icon_text_padding),
                  });

                  styleResult.text = Style.toString({
                    "color":Style.formatColorToRgba(attr.text_color),
                    "font-size":attr.text_size+'px',
                    "text-align":"center",
                  })
                break;
              case 'search_hot':
                  styleResult.hot_tag = Style.toString({
                    "background": "#fff",
                    "margin":Style.margin(attr.header_margin),
                  });

                  styleResult.header = Style.toString({
                    "height":Style.getConvertValue(attr.header_height),
                    "line-height":Style.getConvertValue(attr.header_height),
                    "background":Style.advanceBg(attr.header_bg),
                    "border-width":Style.borderWidth(attr.header_border),
                    "border-color":Style.borderColor(attr.header_border),
                    "border-style":"solid",
                    "font-size":attr.header_text_size+'px',
                    "color":Style.formatColorToRgba(attr.header_text_color),
                    "margin":Style.margin(attr.header_text_margin),
                  });

                  styleResult.tags_wrap = Style.toString({
                    "margin":Style.margin(attr.record_margin),
                  });

                  styleResult.tags = Style.toString({
                    "padding":Style.padding(attr.keywords_padding),
                    "color":Style.formatColorToRgba(attr.keywords_text_color),
                    "font-size":attr.keywords_text_size+'px',
                    "background":Style.formatColorToRgba(attr.keywords_nor_bg),
                    "border-width":Style.borderWidth(attr.keywords_border),
                    "border-color":Style.borderColor(attr.keywords_border),
                    "border-style":"solid",
                    "margin-right":Style.getConvertValue(attr.keywords_column_space),
                    "margin-bottom":Style.getConvertValue(attr.keywords_row_space),
                    "border-radius":Style.getDivider(attr.keywords_corner_enable,attr.keywords_corner_radius),
                  });
                  // styleResult.tags_active = Style.toString({
                  //   "bacnground":Style.formatColorToRgba(attr.keywords_pre_bg),
                  // });
                break;
             }

              return styleResult;
           }
         },
         components:{
            ListUI4,
         		ListUI2,
         		ListUI1,
         		filter_node,
         		shoppingcart_toolbar,
         		left_filter_node,
         		navigator2,
         		Slider,
         		navigator1,
         		layout_component,
         		ListUI14,
         		list_search
         }
      }
</script>
<style scoped>
    .auto{
      margin:auto;
    }
</style>
