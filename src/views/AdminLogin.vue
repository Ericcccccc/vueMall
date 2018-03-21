<template>
    <div>
      <el-form :model="adminForm" :rules="rules" ref="adminForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="adminUser">
          <el-input type="text" v-model="adminForm.adminUser" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="adminPwd">
          <el-input type="password" v-model="adminForm.adminPwd" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="adminLogin('adminForm')" :loading="logining">登录</el-button>
          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
      </el-form>
    </div>
</template>
<style>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login-container .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login-container .remember {
    margin: 0px 0px 35px 0px;
  }
</style>
<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        logining: false,
        adminForm: {
          adminUser: 'admin',
          adminPwd: '123'
        },
        // 校验规则
        rules: {
          adminUser: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          adminPwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    mounted(){

    },
    methods: {
      adminLogin(adminForm){
        //登录动画开启
        this.logining = true;
        // 校验数据
        this.$refs[adminForm].validate((valid) => {
          if (valid) {
            // 参数
            var loginParams = {
              adminUser:this.adminForm.adminUser,
              adminPwd:this.adminForm.adminPwd
            }
            //提交数据
            axios.post('/admins/login',loginParams).then((response)=>{
              let res = response.data;
              if(res.status == '0'){
                //登录动画关闭
                this.logining = false;
                console.log('登录成功');
                this.$store.commit('updateAdminInfo',res.result.adminName);
                this.$router.push('/main/index');
              }else{
                //this.$message(res.msg);
                this.$alert(res.msg, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    return;
                  }
                });
                //登录动画关闭
                this.logining = false;
              }
            })
          } else {
            this.$alert('提交有误!!', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                return;
              }
            });
            //登录动画关闭
            this.logining = false;
            return false;
          }
        });
      },
    }
  }
</script>
