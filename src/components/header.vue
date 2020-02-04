<template>
  <div class="header-container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path:'/manage'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand">
      <img class="avator" :src="baseImgUrl + adminInfo.avator" alt />
      <el-dropdown-menu>
        <el-dropdown-item command="index">首页</el-dropdown-item>
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { logout } from '@/api/api'
import { baseImgUrl } from '@/api/http'
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      baseImgUrl
    }
  },
  created(){
    if (!this.adminInfo.id) {
      this.getAdminData()
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    ...mapActions(['getAdminData']),
    handleCommand(command) {
      if( command === "index" ) {
        this.$router.push('/manage/home')
      } else if (command === "logout") {
        logout().then((res) => {
          if(res.status === 1) {
            this.$message({
              type: 'success',
              message: '退出成功'
            })
            this.$router.push('/')
          } else {
            this.$message({
              type: 'error',
              message: res.message
            })
          }
        })
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