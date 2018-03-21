import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from '@/views/GoodsList'
import Cart from '@/views/Cart'
import Address from '@/views/Address'
import OrderConfirm from '@/views/OrderConfirm'
import OrderSuccess from '@/views/OrderSuccess'
import AdminLogin from '@/views/AdminLogin'
import AdminIndex from '@/views/AdminIndex'
import Form from '@/components/Form'
import Table from '@/components/Table'
import Echarts from '@/components/Echarts'
import Pictures from '@/components/Pictures'
import NotFoundComponent from '@/components/NotFoundComponent'
import Main from '@/components/main'
import City from '@/components/city'
import Recom from '@/components/recom'
import AddRecom from '@/components/addRecom'
import RecomList from '@/components/recomList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path:'/address',
      name:'Address',
      component:Address
    },
    {
      path:'/orderConfirm',
      name:'OrderConfirm',
      component:OrderConfirm
    },
    {
      path:'/orderSuccess',
      name:'OrderSuccess',
      component:OrderSuccess
    },
    {
      path:'/admin',
      name:'AdminLogin',
      component:AdminLogin
    },
    {
      path:'/main',
      name:'AdminIndex',
      component:AdminIndex,
      children:[
        {
          path:'index',
          name:'Main',
          component:Main
        },
        {
          path:'city',
          name:'City',
          component:City
        },
        {
          path:'recom',
          name:'Recom',
          component:Recom
        },
        {
          path:'addRecom',
          name:'AddRecom',
          component:AddRecom
        },
        {
          path:'recomList',
          name:'RecomList',
          component:RecomList
        },
        {
          path:'echarts',
          name:'Echarts',
          component:Echarts
        },
        {
          path:'picture',
          name:'Pictures',
          component:Pictures
        }
      ]
    },
    {
      path:'*',
      component: NotFoundComponent
    }
  ]
})

