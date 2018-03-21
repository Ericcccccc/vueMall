<template>
  <div class="wrap">
    <!-- <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="标题">
            <el-input v-model="formLabelAlign.title"></el-input>
        </el-form-item>
        <el-form-item label="推荐图">

            <div class="con con_2">
                <div v-for='(item ,index ) in imgs' class='room_img'>
       	   	        <img :src="item" v-model="formLabelAlign.img">
       	   	        <span @click='delete_img(index)'>
                        <i class="el-icon-delete del_icons"></i>
                    </span>
       	        </div>
                <div class='room_add_img' v-show='flag'>
                    <span><img src="/static/add_img.png"></span>
                    <span>上传图片</span>
                    <input @change='add_img'  type="file">
                </div>    
            </div>

        </el-form-item>
        <el-form-item label="URL">
            <el-input v-model="formLabelAlign.url"></el-input>
        </el-form-item>
        <el-form-item label="描述">
            <el-input v-model="formLabelAlign.sum"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click.native.prevent="onSubmit" :loading="submitting">添加</el-button>
        </el-form-item>
    </el-form> -->


<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    
    <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>

    <el-form-item label="推荐图" prop="img">
        <div class="con con_2">
            <div v-for='(item ,index ) in imgs' class='room_img'>
                <img :src="item" v-model="ruleForm.img">
                <span @click='delete_img(index)'>
                    <i class="el-icon-delete del_icons"></i>
                </span>
            </div>
            <div class='room_add_img' v-show='flag'>
                <span><img src="/static/add_img.png"></span>
                <span>上传图片</span>
                <input @change='add_img'  type="file">
            </div>    
        </div>    
    </el-form-item>

    <el-form-item label="URL" prop="url">
        <el-input v-model="ruleForm.url"></el-input>
    </el-form-item>

    <el-form-item label="描述" prop="sum">
        <el-input v-model="ruleForm.sum"></el-input>
    </el-form-item>

    <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
</el-form>






  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      returnSrcId: "",
      imgs: [],
      flag: true,
      // submitting: false,
      ruleForm: {
        title: "",
        img: "",
        url: "",
        sum: ""
      },
      file: "",
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        // img: [{ required: true }],
        url: [{ required: true, message: "请输入URL地址", trigger: "blur" }]
      }
    };
  },
  methods: {
    delete_img(item) {
      this.imgs.splice(item, 1);
      this.flag = true;
    },
    add_img(event) {
      var reader = new FileReader();
      var img1 = event.target.files[0];
      reader.readAsDataURL(img1);
      var that = this;
      reader.onloadend = function() {
        that.imgs.push(reader.result);
      };
      this.flag = false;
      //在这里进行图片上传
      this.file = img1;
      var windowURL = window.URL || window.webkitURL;
      // 创建图片的URL
      this.src = windowURL.createObjectURL(event.target.files[0]);
      event.preventDefault(); // 取消默认行为
      var formdata = new FormData();
      formdata.append("file", this.file);
      var config = {
        headers: {
          "Content-Type": "multipart/form-data" //以表单传数据的格式来传递
        }
      };

      axios
        .post("/admins/upload", formdata, config)
        .then(response => {
          let res = response.data;
          this.returnSrcId = res.result.id;
          console.log('图片上传成功   '+this.returnSrcId);
        })
        .catch(error => {
          alert(error);
        });
    },

    submitForm(formName) {
      var params = {
        title: this.ruleForm.title,
        url: this.ruleForm.url,
        sum: this.ruleForm.sum,
        id: this.returnSrcId
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.post("/admins/addRecom",params).then(response => {
            let res = response.data;
            console.log('推荐图添加成功');
            console.log(response)
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.wrap {
  padding: 30px;
}
.el-form {
  width: 60%;
}
.con {
  width: 60%;
}
.room_img {
  width: 100%;
  height: 100%;
  margin-right: 10px;
  position: relative;
  overflow: hidden;
}
.room_img img {
  width: 100%;
  height: 100%;
}
.room_img:hover span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
  color: #fff;
}
.room_img:hover span i {
  display: block;
}
.room_img span i {
  display: none;
}
.upload_img {
  display: flex;
  align-items: center;
}
.margin_top_20 {
  margin-top: 20px;
}
.room_add_img {
  width: 148px;
  height: 148px;
  border: 1px solid #e1e1e1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-radius: 4px;
}
.room_add_img > span:nth-child(1) {
  margin-top: 40px;
  width: 40px;
  height: 40px;
  overflow: hidden;
}
.room_add_img > span:nth-child(2) {
  margin-bottom: 20px;
}

.room_add_img input {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 99999;
  opacity: 0;
}
</style>
