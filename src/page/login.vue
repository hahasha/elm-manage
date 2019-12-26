<template>
  <div class="login-container">
    <h1 class="login-title">elm后台管理系统</h1>
    <div class="login-wrap">
      <el-form :model="ruleForm" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input class="fm-input" placeholder="用户名" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="fm-input" type="password" placeholder="密码" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-button
          class="fm-btn"
          @click="subForm('loginForm')"
          @keyup.enter="subForm('loginForm')"
        >登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogout: false,
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    this.isLogout = this.$route.params.isLogout;
    if (this.isLogout) {
      this.$message("退出成功");
    }
  },
  methods: {
    saveUserInfo() {
      const data = {
        id: parseInt((Math.random() + 1) * Math.pow(10, 4 - 1)),
        username: this.ruleForm.username,
        password: this.ruleForm.password,
        registerTime: (new Date()).toLocaleString(),
        limits: "admin",
        avatorUrl: "http://elm.cangdu.org/img/16f132484ce61386.jpg"
      };
      // this.$store.commit("UPDATEUSERINFO", data);
    },
    subForm(loginForm) {
      this.saveUserInfo();
      this.$refs[loginForm].validate(val => {
        if (val) {
          this.$router.push({
            name: "Home",
            params: { isLogin: true }
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
// @import url('~@/style/common.less');
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
