<template>
  <div class="header-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path:'/manage'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand">
      <img class="avator" src="../assets/images/avator.jpg" alt />
      <el-dropdown-menu>
        <el-dropdown-item command="index">首页</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: false
    }
  },
  created() {
    this.isLogin = this.$route.params.isLogin;
    if (this.isLogin) {
      this.$message("登录成功");
    }
  },
  methods: {
    handleCommand(command) {
      if (command === "logout") {
        this.$router.push({
          name: "Login",
          params: { isLogout: true }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header-container {
  display: flex;
  padding: 0 40px 0 20px;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background: #eff2f7;
  .avator {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
}
</style>