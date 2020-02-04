<template>
  <div class="login-page">
    <div class="login-container" v-show="showLogin">
      <h1 class="login-title">elm后台管理系统</h1>
      <div class="login-wrap">
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input class="fm-input" placeholder="用户名" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="fm-input" type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-button
            class="fm-btn"
            @click="submitForm('loginForm')"
            @keyup.enter="submitForm('loginForm')"
          >登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { login, getAdminInfo } from '@/api/api'

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      showLogin: false
    };
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  mounted(){
    this.showLogin = true
    if(!this.adminInfo.id) {
      this.getAdminData()
    }
  },
  methods: {
    ...mapActions(['getAdminData']),
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if(valid) {
          const res = await login({
            user_name: this.loginForm.username,
            password: this.loginForm.password
          })
          if(res.status == 1) {
            this.$message({
              type: 'success',
              message: '登录成功'
            })
            this.$router.push('manage/home')
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        } else {
          this.$notify.error({
            title: '错误',
            message: "请输入正确的用户名和密码",
            offset: 100
          })
          return false
        }
      })
    }
  },
  watch: {
    adminInfo: function (newValue){
      if(newValue.id) {
        this.$message({
          type: 'success',
          message: '检测到你之前登录过，将自动登录'
        })
        this.$router.push('manage/home')
      }
    }
  }
};
</script>

<style lang="less" scoped>
// @import url('~@/style/common.less');
.login-page {
  background: #324057;
  height: 100%;
}
.login-container {
  position: fixed;
  width: 370px;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-60%);
  margin: auto;
  .login-title {
    font-size: 32px;
    font-weight: 200;
    color: #fff;
    text-align: center;
  }
  .login-wrap {
    box-sizing: border-box;
    width: 100%;
    background: #fff;
    border-radius: 6px;
    padding: 27px;
    margin-top: 56px;
    .fm-btn {
      width: 100%;
      background: #20a0ff;
      border-radius: 4px;
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>
