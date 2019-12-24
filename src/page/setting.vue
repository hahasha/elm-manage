<template>
  <div class="fillcontain">
    <Header></Header>
    <div class="setting-wrap">
      <p class="title">管理员信息</p>
      <el-form :model="userInfo" class="form-wrap">
        <el-form-item label="ID">
          <span>{{userInfo.id}}</span>
        </el-form-item>
        <el-form-item label="姓名">
          <span>{{userInfo.username}}</span>
        </el-form-item>
        <el-form-item label="注册时间">
          <span>{{userInfo.registerTime}}</span>
        </el-form-item>
        <el-form-item label="管理员权限">
          <span>{{userInfo.admin = 'admin' ? '管理员' : '普通用户'}}</span>
        </el-form-item>
        <el-form-item label="更换头像">
          <img :src="userInfo.avatorUrl" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  components: {
    Header
  },
  filters: {
    formatDate(date, fmt) {
      date = new Date(date);
      if (typeof fmt === "undefined") {
        fmt = "yyyy-MM-dd hh:mm:ss";
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
      };
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + "";
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
          );
        }
      }
      return fmt;
    }
  }
};
</script>

<style lang="less" scoped>
.setting-wrap {
  padding: 25px 0;
  .title {
    font-size: 24px;
    color: #666;
    text-align: center;
    margin-bottom: 25px;
  }
  .form-wrap {
    width: 960px;
    margin: 0 auto;
    padding: 10px 20px;
    background: #f9fafc;
    border-radius: 10px;
    color: #666;
    /deep/ .el-form-item__label {
      font-size: 16px;
    }
    /deep/ .el-form-item__content {
      font-size: 16px;
    }
    img {
      width: 120px;
      height: 120px;
      border-radius: 4px;
      border: 1px dashed #ccc;
    }
    img:hover {
      border-color: #20a0ff;
    }
  }
}
</style>