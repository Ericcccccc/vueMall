// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import vuex from 'vuex'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'


Vue.use(VueAwesomeSwiper)
// 金额格式化
import {currency} from '@/util/currency'
// 饿了么UI及样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//vue-quill-editor富文本编辑器
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false

// 全局过滤
Vue.filter("currency",currency);

// 插件
Vue.use(ElementUI); // 饿了么UI组件
Vue.use(vuex);// vuex状态管理
const store = new vuex.Store({
  state:{
    nickName:'',
    adminName:'',
    cartCount:0,
    isLogin:false
  },
  mutations:{
    updateUserInfo(state,nickName){
      state.nickName = nickName;
    },
    updateAdminInfo(state,adminName){
      state.adminName = adminName;
    },
    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
    },
    updateLoginState(state,isLogin){
      state.isLogin = isLogin;
    },
    initCartCount(state,cartCount){
      state.cartCount = cartCount;
    }
  }
});
Vue.use(VueLazyLoad,{
  loading: '/static/loading-svg/loading-bars.svg',
});//懒加载

Vue.use(infiniteScroll);//滚动加载



Vue.use(VueQuillEditor);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

