<template>
  <el-row>
    <el-col :span="4">
        <el-menu class="menu">
            <el-menu-item index="1-1"><i class="el-icon-menu"></i>首页</el-menu-item>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-document"></i>数据管理</template>
                    <el-menu-item index="2-1">用户列表</el-menu-item>
                    <el-menu-item index="2-2">商家列表</el-menu-item>
                    <el-menu-item index="2-3">食品列表</el-menu-item>
                    <el-menu-item index="2-4">订单列表</el-menu-item>
                    <el-menu-item index="2-5">管理员列表</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
                    <el-menu-item index="3-1">添加商铺</el-menu-item>
                    <el-menu-item index="3-2">添加商品</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-star-on"></i>图表</template>
                <el-menu-item>用户分布</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title"><i class="el-icon-edit"></i>编辑</template>
                <el-menu-item>文本编辑</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title"><i class="el-icon-setting"></i>设置</template>
                <el-menu-item>管理员设置</el-menu-item>
            </el-submenu>
            <el-submenu index="7">
                <template slot="title"><i class="el-icon-warning"></i>说明</template>
                <el-menu-item>说明</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-col>
    <el-col :span="20" class="content-container">
      <div class="header-container">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: '/manage/userList'}">用户列表</el-breadcrumb-item>
          </el-breadcrumb>
          <el-dropdown @command="handleCommand">
              <img class="avator" src="../assets/images/avator.jpg" alt="">
              <el-dropdown-menu>
                  <el-dropdown-item command="index">首页</el-dropdown-item>
                  <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
      </div>
      <div id="chart"></div>
    </el-col>
  </el-row>
</template>

<script>
export default {
    data(){
        return {
            isLogin : false
        }
    },
    created(){
        this.isLogin = this.$route.params.isLogin;
        if(this.isLogin){
            this.$message('登录成功');
        }
        this.drawLine();
    },
    methods: {
        handleCommand(command){
            if(command === 'logout'){
                this.$router.push({
                    name : 'Login',
                    params : { isLogout : true }
                });
            }
        },
        drawLine(){
            let myChart = this.$echarts.init(document.getElementById('chart'))
            myChart.setOption({
                title: { text: '在Vue中使用echarts' },
                tooltip: {},
                xAxis: {
                    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            });
        }
    }
}
</script>

<style lang="less" scoped>
.content-container{
    background: #fff;
}
.header-container{
    display: flex;
    padding: 0 40px 0 20px;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: #eff2f7;
}
.menu{
    background: #1f2d3d;
    height: 100%;
    overflow-y: hidden;
}
.avator{
    width: 36px;
    height: 36px;
    border-radius: 50%;
}
</style>