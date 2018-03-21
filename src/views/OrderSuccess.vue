<template>
    <div>
      <nav-header></nav-header>
      <div>
        <div class="container">
          <!-- 进度条 -->
          <div class="check-step">
            <ul>
              <li class="cur"><span>确认收货地址</span></li>
              <li class="cur"><span>确认订单</span></li>
              <li class="cur"><span>确认支付</span></li>
              <li class="cur"><span>支付成功</span></li>
            </ul>
          </div>

          <div class="order-create">
            <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
            <div class="order-create-main">
              <h3>恭喜！ <br>您的订单正在处理中！</h3>
              <p>
                <span>Order ID：{{orderId}}</span>
                <span>Order total：{{orderTotal | currency('￥')}}</span>
              </p>
              <div class="order-create-btn-wrap">
                <div class="btn-l-wrap">
                  <!--<a href="javascript:;" class="btn btn&#45;&#45;m">Cart List</a>-->
                  <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
                </div>
                <div class="btn-r-wrap">
                  <!--<a href="javascript:;" class="btn btn&#45;&#45;m">Goods List</a>-->
                  <router-link class="btn btn--m" to="/">继续购物</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
  import NavHeader from '@/components/Header'
  import NavFooter from '@/components/Footer'
  import NavBread from '@/components/Bread'
  import Modal from '@/components/Modal'
  import axios from 'axios'


  export default {
    data() {
        return {
          orderId: '',
          orderTotal:0,
        }
    },
    components:{
      NavHeader,
      NavFooter,
      NavBread,
      Modal,
    },
    mounted(){
      var orderId = this.$route.query.orderId;
      if(!orderId){
        return;
      }
      axios.get('/users/orderDetail',{
        params:{
          orderId:orderId
        }
      }).then((response)=>{
        let res = response.data;
        if(res.status == '0'){
          this.orderId = orderId;
          this.orderTotal = res.result.orderTotal;
        }
      })
    }
  }
</script>
