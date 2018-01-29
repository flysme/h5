import Api from '@h5/api/index';


import viewReaderSdk from '@h5/sdk/view_reader';
import components from '@h5/sdk/components';

const sdk = {
  /*获取热词*/
  Searchhottags(cb){
    Api.Searchhottags().then( result => {
        cb&&cb(result.data);
    })
  },
  /*获取搜索数据*/
  getSearchData(data,cb){
    Api.getSearchData({'q':data}).then( result => {
        cb&&cb(result.data);
    })
  },
  /*初始化数据*/
  initData(searchRecord,data){
      let mapping =viewReaderSdk.initModelView(data.components,data.pageData.VIEWS);
      let viewids = [];
      let views = viewReaderSdk.getPageViews(data.pageData.container_view);
      let hook = {};
      Object.assign(hook, {
          views: views,
          widgetList: viewReaderSdk.getWidgetList(data.pageData.currentPageId),
      });
      let fieldBindingMapping = viewReaderSdk.getFieldBindingMapping(data.pageData.VIEWS);
      let datalist = [],viewdata ={},oldModelId=null;
      searchRecord.forEach(compDataItem => {
          this.handleCompDataItem( hook, compDataItem, mapping[compDataItem.model], fieldBindingMapping );
          let currentModelId = mapping[compDataItem.model];
          // 判断后台未配置样式时
          if(typeof currentModelId =='undefined')return;
          //生成不同数据对象
             if(viewdata[currentModelId]){
                viewdata[currentModelId].push(compDataItem);
               }else{
                viewdata[currentModelId] =[];
                viewids.push(currentModelId);
                viewdata[currentModelId].push(compDataItem);
              }
              oldModelId=currentModelId;
            });
      return {
          VIEWS : data.pageData.VIEWS,
          VIEWIdS : this.unique(viewids),
          currentPageId : data.pageData.currentPageId,
          data : viewdata
      }
  },
  //处理每条组件数据
  handleCompDataItem( hook, compDataItem, compViewId, fieldBindingMapping) {
    let _this = this, widgetList = hook.widgetList;
    compDataItem._widget = {};
    Object.assign(compDataItem, components.getWidgetFormat({
      compDataItem: compDataItem,
      viewId: compViewId,
      widgetViewIds: widgetList[compViewId],
      mapping: fieldBindingMapping
    }, this));
  },
  unique (arr) {
      const seen = new Map();
      return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
   }
}

export default sdk
