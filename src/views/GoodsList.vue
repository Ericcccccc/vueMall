<template>
    <div>
      <nav-header></nav-header>
      <nav-banner></nav-banner>
      <!--<nav-bread>-->
        <!--<span>商品列表</span>-->
      <!--</nav-bread>-->
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">排  序:</span>
            <a href="javascript:void(0)" class="price" @click="sortGoods">价  格<svg v-bind:class="{'sort-up':sortFlag}" class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">筛  选</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>价  格:</dt>
                <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="getAllPrice">全  部</a></dd>
                <dd v-for="(price,index) in priceFilter">
                  <a href="javascript:void(0)" @click="setPriceFliter(index)" v-bind:class="{'cur':priceChecked==index}">{{price.start}} - {{price.end}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice | currency('￥')}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                  <img src="./../assets/loading-spinning-bubbles.svg" alt="" v-show="loading" class="loading-img">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
        <p slot="message">请先登录，否则无法加入到购物车</p>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn btn--m" @click="mdShow = false">关闭</a>
        </div>
      </modal>

      <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
        <p slot="message">
          <svg class="icon-status-ok">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
          </svg>
          <span>加入购物车成功</span>
        </p>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn btn--m" @click="mdShowCart = false">继续购物</a>
          <router-link href="javascript:;" class="btn btn--m" to="/cart">查看购物车</router-link>
        </div>
      </modal>
      <!--遮罩层-->
      <div class="md-overlay" v-if="overLayFlag" @click="closeModal"></div>
      <to-top v-if="!isPhone"></to-top>
      <nav-footer></nav-footer>
    </div>
</template>
<style>
  .load-more {
    height:100px;
    line-height: 100px;
    text-align: center;
  }
  .loading-img {
    background: #f5f7fc;
    text-align: center;
  }
  .sort-up {
    transform:rotate(180deg);
    transition:all .3s ease-out;
  }
  .icon-arrow-short {
    transition:all .3s ease-out;
  }
  .btn:hover {
    background-color: #ffe5e6;
    transition:all .3s ease-out;
  }
</style>
<script>
    import '@/assets/css/base.css'
    import '@/assets/css/product.css'
    import NavHeader from '@/components/Header'
    import NavFooter from '@/components/Footer'
    import NavBread from '@/components/Bread'
    import NavBanner from '@/components/Banner'
    import ToTop from '@/components/ToTop'
    import axios from 'axios'
    import Modal from '@/components/Modal'



    export default {
        data() {
            return {
              goodsList:[],
              priceFilter:[
                {
                  start:'0.00',
                  end:'100.00'
                },
                {
                  start:'100.00',
                  end:'500.00'
                },
                {
                  start:'500.00',
                  end:'1000.00'
                },
                {
                  start:'1000.00以上'
                }
              ],
              priceChecked:'all',
              filterBy:false,
              overLayFlag:false,
              sortFlag:true,
              page:1,
              pageSize:8,
              busy:true,
              loading:false,
              mdShow:false,
              mdShowCart:false,
              isLogin:false,
              isPhone:false,
            }
        },
        components: {
            NavHeader,
            NavFooter,
            NavBread,
            Modal,
            NavBanner,
            ToTop,
        },
        // 初始化
        mounted(){
          this.getGoodsList();
          if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|mobile|Macintosh)/)) {
            this.isPhone = true;
          } else {
            this.isPhone = false;
          }
        },
        methods:{
          getGoodsList(flag){
            var param = {
              page:this.page,
              pageSize:this.pageSize,
              sort:this.sortFlag?1:-1,
              priceLevel:this.priceChecked,
            }
            this.loading = true;
            axios.get('/goods/list',{
              params:param
            }).then((result) => {
              this.loading = false;
              var res = result.data;
              if (res.status =='0') {
                if (flag) {
                  this.goodsList = this.goodsList.concat(res.result.list);
                  if(res.result.count == 0){
                    this.busy = true;
                  } else {
                    this.busy = false;
                  }
                }else{
                  this.goodsList = res.result.list;
                  this.busy = false;
                }
              }else {
                this.goodsList = [];
              }
            })
          },
          showFilterPop(){
              this.filterBy = true;
              this.overLayFlag = true;
          },
          closePop(){
            this.filterBy = false;
            this.overLayFlag = false;
          },
          getAllPrice(){
            this.priceChecked='all';
            this.filterBy = false;
            this.overLayFlag = false;
            this.getGoodsList();
          },
          setPriceFliter(index){
            this.priceChecked = index;
            this.closePop();
            this.page = 1;
            this.getGoodsList();
          },
          sortGoods(){
            this.sortFlag = !this.sortFlag;
            this.page = 1;
            this.getGoodsList();
          },
          loadMore(){
            this.busy = true;
            setTimeout(() => {
              this.page++;
              this.getGoodsList(true);
            }, 500);
          },
          addCart(productId){
            if(this.$store.state.isLogin){
              axios.post("/goods/addCart",{
                productId:productId
              }).then((res)=>{
                if(res.data.status == "0"){
                  this.mdShowCart = true;
                  this.$store.commit('updateCartCount',1)
                }else{
                  alert(res.data.msg)
                }
              })
            }else{
              this.mdShow = true;
            }

          },
          closeModal(){
            this.mdShow = false;
            this.mdShowCart = false;
            this.overLayFlag = false;
            this.filterBy = false;
          },
        }
    }
</script>
