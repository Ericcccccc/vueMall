<template>
  <el-row class="main-container">
    <el-aside>
      <a class="aside-header" href="javascript:;">
        VUEADMIN
      </a>
      <el-row class="tac">
        <el-col :span="24">
          <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            background-color="rgb(48, 65, 86)"
            text-color="#fff"
            :router="true"
          >
            <el-menu-item index="0" :route="{path: '/main/index'}">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="1" :route="{path: '/main/city'}">
              <i class="el-icon-location-outline"></i>
              <span slot="title">城市管理</span>
            </el-menu-item>

             <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-star-off"></i>
                <span>推荐位管理</span>
              </template>
                <el-menu-item index="2-1" :route="{path: '/main/addRecom'}">添加推荐位</el-menu-item>
                <el-menu-item index="2-2" :route="{path: '/main/recomList'}">推荐位列表</el-menu-item>
            </el-submenu>


            <el-menu-item index="3" :route="{path: '/main/stores'}">
              <i class="el-icon-location"></i>
              <span slot="title">门店管理</span>
            </el-menu-item>
            <el-menu-item index="4" :route="{path: '/main/commodity'}">
              <i class="el-icon-goods"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="5" :route="{path: '/main/order'}">
              <i class="el-icon-tickets"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="6" :route="{path: '/main/echarts'}">
              <i class="el-icon-picture-outline"></i>
              <span slot="title">Echarts</span>
            </el-menu-item>

            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-star-off"></i>
                <span>游戏</span>
              </template>
                <el-menu-item index="2-1" :route="{path: ''}">飞机大战</el-menu-item>
                <el-menu-item index="2-2" :route="{path: ''}">聊天室</el-menu-item>
            </el-submenu>
           
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
    <!--main-->
    <el-main>
      <!--头部-->
      <div class="main-header">
        后台管理系统
        <div class="adminUser">超级管理员</div>
      </div>

      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </el-main>
  </el-row>
</template>
<style>
  html,body{
    height:100%;
  }
  .main-container{
    position: absolute !important;
    top:0;
    bottom:0;
    width:100%;
    height:100%;
  }
  .el-aside{
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    width:180px!important;
    background-color: rgb(48, 65, 86);
    z-index: 1;
  }
  .el-main{
    position: absolute;
    top:0;
    right:0;
    bottom:0;
    width:100%!important;
    padding:0 15px 0 195px!important;
    background-color: #fff;
  }
  .el-aside .aside-header{
    display: flex;
    width:100%;
    height:60px;
    justify-content:center;
    align-items:center;
    color: #fff;
    border-bottom: 1px solid #000;
  }
  .el-menu{
    border-right: none;
  }
  .el-breadcrumb{
    line-height:35px;
    border-bottom: 1px solid #333;
  }
  .main-header{
    line-height: 60px;
    background-color: #fff;
    border-bottom: solid 1px #e6e6e6;
    margin:0 -15px;
    padding-left:15px;
    color: #333;
    font-weight: 600;
    font-size: 1.5em;
  }
  .adminUser{
    position: absolute;
    top:0;
    right:15px;
    bottom:0;
    font-weight: 400;
    font-size: 0.5em;
  }
  .el-submenu .el-menu-item{
    background-color: #1f2d3d!important;
  }
  .el-menu-item:focus, .el-menu-item:hover, .el-submenu__title:hover{
    background-color: #001528!important;
  }
</style>
<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        isCollapse: false
      }
    },
    mounted(){
      this.checkLogin();
    },
    components:{

    },
    methods:{
      checkLogin(){
        axios.post('/admins/checkLogin').then((response)=>{
          let res = response.data;
          if(res.status == '0'){
            this.$store.commit('updateAdminInfo',res.result)
          }else{
            this.$router.push('/admin')
          }
        })
      },




    },


  }
</script>
