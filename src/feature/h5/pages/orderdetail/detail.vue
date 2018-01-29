<template>
    <!--订单详情-->
   <div class="detailwrap" v-if="detailInfo.status">
       <div class="status ft12">{{detailInfo.status}}</div>
       <!--地址信息 PS:这边需判断是否有虚拟商品-->
       <div class="address sys-flex sys-flex-center" v-show="!detailInfo.is_virtual">
           <img src="https://static-public.ddapp.com/weixin/images/address-icon.png" />
           <div class="sys-flex-one">
               <div class="mb10">
                   收货人:{{detailInfo.address.name}}
               </div>
               <div class="ft12 detail_address">
                   收货地址：{{detailInfo.address.phone}},{{detailInfo.address.district}}{{detailInfo.address.detail}}
               </div>
           </div>
       </div>
       <!--订单详情主体部分-->
       <div class="orderdetail">
           <!--商品列表-->
           <div class="orderproduct_wrap" v-for="product in detailInfo.items" >
               <div class="sys-flex product">
                   <img  :src="product.indexpic_url"/>
                   <div class="sys-flex-one overflow">
                       <div class="overflow mb10">{{product.subject}}</div>
                       <div class="ft12 gray">{{product.sku.properties_name}}</div>
                   </div>
                   <div>
                       <div class="mb10">¥{{product.unit_price}}</div>
                       <div class="ft12 gray text-right">x{{product.number}}</div>
                   </div>
               </div>
               <!--附属信息-->
               <div class="extrainfo_wrap" v-for="group in detailInfo.extra_fields[product.id]">
                   <div class="sys-flex extra-info" v-for="field in group.fields">
                       <div>{{field.display_text}}</div>
                       <div class="ml10 sys-flex-one">{{field.value}}</div>
                   </div>
               </div>
           </div>
           <div class=" sys-flex ft14 message">买家留言:{{detailInfo.message||'暂无留言'}}</div>
           <!--总计-->
           <div class="sys-flex sys-flex-center total">
               <div class="sys-flex-one"></div>
               <div>共{{detailInfo.total_number}}件商品 合计：{{detailInfo.total}}(含运费¥{{detailInfo.express_fee}})</div>
           </div>
       </div>
       <!--订单信息-->
       <div class=" ft12 message mt10">
         <div  class="mb10">订单编号 {{detailInfo.order_no}}</div>
         <div>下单时间: {{detailInfo.create_time}}</div>
       </div>
       <!--底部操邹-->
       <div class="orderoption" v-if="['交易关闭','待确认'].indexOf(detailInfo.status)<0">
           <!--待付款的展示按钮区域-->
           <div class="counttime ml10" v-show="detailInfo.status=='待付款'">{{hour}} 时 {{min}} 分 {{sec}} 秒</div>
           <div class="orderbtnwrap">
               <div v-show="detailInfo.status=='待付款'" class="cancelorder" @click.stop="orderCancel">取消订单</div>
               <div v-show="detailInfo.status=='待付款'" class="payorder" @click.stop="payOrder">立即购买</div>
               <!--确认收货的按钮展示区域-->
               <div v-show="detailInfo.status=='已发货'" class="confirmorder" @click.stop="confirmOrder">确认收货</div>
               <!--评价晒单的按钮展示区域-->
               <div  v-show="detailInfo.status=='交易成功' && is_evaluate" class="evaluateorder">已评价</div>
               <div  v-show="detailInfo.status=='交易成功' && !is_evaluate"class="evaluateorder" @click.stop="evaluateOrder">评价晒单</div>
           </div>
       </div>
       <!-- 页面-pay面板 -->
       <pay-panel :chargeinfo="panelInfo"  v-if="panelInfo.show"></pay-panel>
   </div>
</template>

<script>
import { mapState } from 'vuex'
import sessionStorage from "@h5/services/sessionStorage"
import payPanel from "@h5/components/common/pay_panel"
import "@h5/style/orderdetail/detail.scss"
import "@h5/style/app.css"

export default {
	name:'orderdetail',
	data(){
		return {
            hour:'00',
            min:'15',
            sec:'00',
            is_evaluate:false,
            panelInfo:{}
        }
	},
	props:['orderno'],
  components:{
    payPanel
  },
	created(){
		//初始化订单详情
		this.$store.dispatch('orderdetailStore/initOrderDetail',this.orderno)
    this.countdownTime();
	},
  //路由进入前
  beforeRouteEnter (to, from, next) {
    //通过钩子查看是否是从评论页返回
    if(from.name=='orderevaluate'&&to.query.isEvaluate){
        next(vm=>{
          //已经评价的赋值
          vm.is_evaluate=true;
        });
    }else{
      next();
    }
  },
  //路由离开前
  beforeRouteLeave (to, from, next) {
    //通过钩子将当前页面的数据传送到评论页
    if(to.name=='orderevaluate'){
      to.query['orderinfo']=this.detailInfo;
    }
    next();
  },
	computed:{
    ...mapState('orderdetailStore',['detailInfo']),
    ...mapState('pageStore',['initFitstDataCollection'])
	},
  mounted(){
    console.log("xxx 订单详情的信息",this.detailInfo);
    //判断获取的订单信息中的是否评论
    if(this.detailInfo.status_detail=='after_comment')
      this.is_evaluate=true;
  },
    methods:{
        /*倒计时处理*/
        countdownTime() {
          this.countSec();
        },
        countSec() {
            let _this =this;
            //清除定时器
            if (_this.sec == '00' && _this.hour == '00' && _this.min == '00') {
                if (_this.timer) clearTimeout(_this.timer);
                //时间到了可以取消订单
                _this.$store.dispatch('orderdetailStore/cancelOrder',this.orderno)
                return;
            }

            if (_this.sec == '00') {
                _this.sec = '60';
                _this.countMin();
            }
            _this.timer = setTimeout(function () {
                _this.sec = _this.addZero(_this.sec - 1);
                _this.countSec();
            }, 1000);
        },
        countMin() {
          let _this = this;
          if (_this.min == '00') {
                _this.min = '60';
                _this.countHour();
          }
          _this.min =_this.addZero(_this.min - 1);
        },
        countHour() {
          let _this = this;
          if (_this.hour == '00') return;
          _this.hour = _this.addZero(_this.hour - 1);
        },
        addZero(value) {
          return value > 9 ? value : '0' + value;
        },
        //订单取消
        orderCancel(){
            let _this=this;
            this.$dialog.confirm({
              title: '取消订单',
              message: '确认取消订单吗？'
            }).then(() => {
              // 确认操作
              let promise=_this.$store.dispatch('orderdetailStore/cancelOrder',this.orderno)
              promise.then((tip)=>{
                _this.$toast.success(tip);
              }).catch((err)=>{
                _this.$toast.fail(err);
              })
            }).catch(() => {
              // 取消不做任何操作
            });
        },
        //确认收货
        confirmOrder(){
          let _this=this;
          this.$dialog.confirm({
            title: '提示',
            message: '确认收货吗?'
          }).then(() => {
            // 确认操作
            _this.$store.dispatch('orderdetailStore/confirmOrder',this.orderno)
          }).catch(() => {
            // 取消不做任何操作
          });
        },
        //跳转去评价页面
        evaluateOrder(){
          this.$router.push({name:'orderevaluate'})
        },
        payOrder(){
          //组织回调地址
          let _this=this;

          //获取当前用户信息
          let userinfo=sessionStorage.getObject("userinfo");
          //组织下需要充值面板的参数
          let chargeData=_this.initFitstDataCollection.chargeData,
            tempParams={};
          //没有配置支付方式的提醒
          if(!chargeData){
            _this.$toast.fail('请配置支付');
            return;
          }
          tempParams['coin']=userinfo.coin;//用户的余额
          tempParams['view']=chargeData.VIEWS[chargeData.chargeView];//找到支付的配置
          tempParams['show']=true;//展示弹层
          tempParams['create_type']='orderdetail';//创建panel的页面
          //组织支付面板的参数
          _this.panelInfo=Object.assign({},{
            order_no:_this.detailInfo.order_no,
            pay_amount:_this.detailInfo.total,
            subject:_this.detailInfo.subject
          },tempParams);
        }
    }
}
</script>
