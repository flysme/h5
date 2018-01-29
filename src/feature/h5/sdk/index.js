/**存放暴露出来的SDK根目录
*import DEMOSDK from "./DEMOSDK/index" //引用模块下的SDK暴露出来所有的方法
*export default { DEMOSDK } //暴露出相应的对象
*import { DEMOSDK } from "./index" //使用解构直接引用  DEMOSDK.fetchData();
*/

import COMMENTS from "./comments"
import CART from "./shopcart"
import FORM from "./form"
import REPORT from "./report"
import ABOUT from "./about"
import FILTER_NODE from "./filter_node"
import COMMENTSTYLE from "./commentStyle"
import ORDERDETAIL from './orderdetail'
import CREATEORDER from './createorder'
import SEARCH from './search'
import URI from "./uri"
import APPINFO from "./view_reader"
import APP_HEADER from "./view_header"
import MODULE_CHARGE from "./module_charge"
import MINE from "./mine"

export {
  COMMENTS,
  CART,
  FORM,
  REPORT,
  ABOUT,
  FILTER_NODE,
  COMMENTSTYLE,
  ORDERDETAIL,
  CREATEORDER,
  URI,
  SEARCH,
  APPINFO,
  APP_HEADER,
  MODULE_CHARGE,
  MINE
}
