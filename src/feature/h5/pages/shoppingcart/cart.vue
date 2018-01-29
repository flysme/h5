<template>
    <div class="shopCart">
      <div class="match_parent">
          <div v-if="!cartlist.length" class="empty-cart">
              <img class="icon" src="../../../../assets/cart-empty.png">
          </div>
          <div v-if="cartlist.length" v-on:click="showDelete = !showDelete" class="cart-handle">
              {{showDelete ? '完成' : '编辑'}}
          </div>
          <!--有效商品-->
          <ul v-if="cartlist.length">
              <li v-for="storeproduct, storeIndex in cartlist">
                  <div class="sys-flex sys-flex-center store" :class="{'bgGray':storeproduct.checked}" v-if="storeproduct.store">
                      <input type="radio" :checked="storeproduct.checked" v-on:click="chooseProduct(storeIndex,-1)"/>
                      <img class="icon" src="https://static-public.ddapp.com/weixin/images/business.png">
                      <div class="product-name">{{storeproduct.store.name}}</div>
                      <img class="icon" src="https://static-public.ddapp.com/weixin/images/arrow-right.png">
                      <div class="coupon">领券</div>
                  </div>
                  <div v-for="todoItem, todoIndex in storeproduct.items" class="cart-list sys-flex sys-flex-center" :class="{'bgGray':todoItem.checked}">
                      <input type="radio" :checked="todoItem.checked" v-on:click="chooseProduct(storeIndex, todoIndex)"/>
                      <div class="sys-flex">
                          <img class="indexpic" :src="todoItem.indexpic_url"/>
                      </div>
                      <div class="sys-flex-one">
                          <div class="title">
                              {{todoItem.subject}}
                          </div>
                          <div class="sku">
                              {{todoItem.sku.properties_name}}
                          </div>
                          <div class="sys-flex sys-flex-center">
                              <div class="red ft15 sys-flex-one">
                                  ¥{{todoItem.discount_price}}
                              </div>
                              <div class="sys-flex count">
                                  <div class="btn sys-flex-one" v-on:click="minus(storeIndex, todoIndex)">—</div>
                                  <div class="btn num">{{todoItem.number}}</div>
                                  <div class="btn sys-flex-one" v-on:click="plus(storeIndex, todoIndex)">＋</div>
                              </div>
                          </div>
                      </div>
                  </div>
              </li>
          </ul>
          <!--失效商品-->
          <div class="invalid" v-if="invalidlist&&invalidlist.length">
              <div class="head sys-flex sys-flex-one sys-flex-center" v-on:click="deleteInvalidProduct">
                  <div class="sys-flex-one">
                      失效商品
                  </div>
                  <img class="icon" src="https://static-public.ddapp.com/weixin/images/business.png">
                  <div class="ml10 tip">清除失效商品</div>
              </div>
              <ul>
                  <li v-for="todoItem, todoIndex in invalidlist">
                      <div class="cart-list sys-flex sys-flex-center">
                          <div class="invalid-tip">失效</div>
                          <div class="sys-flex">
                              <img class="indexpic" :src="todoItem.indexpic_url"/>
                          </div>
                          <div class="sys-flex-one">
                              <div class="title">
                                  {{todoItem.subject}}
                              </div>
                              <div class="sku">
                                  {{todoItem.sku.properties_name}}
                              </div>
                              <div class="sys-flex sys-flex-center">
                                  ¥{{todoItem.discount_price}}
                              </div>
                          </div>
                      </div>
                  </li>
              </ul>
          </div>
      </div>
        <div v-if="cartlist.length" class="cartnav sys-flex sys-flex-center">
            <input class="ml10" type="radio" :checked="checked_all" v-on:click="chooseAllProduct"/>
            <label class="sys-flex-one selete-all">全选</label>
            <span v-if="!showDelete">合计:</span><span v-if="!showDelete" class="red ml10">￥{{totalprice}}</span>
            <div v-if="!showDelete" class="buy ml10" v-on:click="createOrder">结算</div>
            <div v-if="showDelete" class="buy ml10" v-on:click="bulkDeleteCart">删除</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import '@h5/style/shoppingcart/cart.scss';
import '@h5/style/app.css';

export default {
	name: 'shopCart',
    data() {
        return {
            showDelete : false
        };
    },
    computed: {
        ...mapState("cartStore",["checked_all","totalprice","cartlist","invalidlist"])
    },
    created() {
        this.$store.dispatch("cartStore/toGetCartList",{})
    },
    mounted(){
        // console.log('option',this.option);
    },
  	methods: {
          bulkDeleteCart() {
      			this.$store.dispatch("cartStore/bulkDeleteCart",{})
      		},
          deleteInvalidProduct(){
              this.$store.dispatch("cartStore/deleteInvalidProduct",{})
          },
          minus(storeindex, productindex){
              this.$store.dispatch("cartStore/minus",{
                  param: {
                      storeindex: storeindex,
                      productindex: productindex
                  }
              });
          },
          plus(storeindex, productindex){
              this.$store.dispatch("cartStore/plus",{
                  param: {
                      storeindex: storeindex,
                      productindex: productindex
                  }
              });
          },
          chooseAllProduct(){
              this.$store.dispatch("cartStore/chooseAllProduct",{});
          },
          chooseProduct(storeindex,productindex){
              this.$store.dispatch("cartStore/chooseProduct",{
                  param: {
                      storeindex: storeindex,
                      productindex: productindex
                  }
              });
          },
          createOrder(){
              if(this.totalprice) this.$router.push({name:'createorder'});
          },
  	}
};
</script>
<style media="screen">
    .match_parent{
      height: 100%;
      display: flex;
      flex-direction: column;
    }
</style>
