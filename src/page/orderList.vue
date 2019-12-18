<template>
  <div class="fillcontain">
    <Header></Header>
    <div class="table-container">
      <el-table>
        <el-table-column type="expand">
          <template >
            <el-form>
              <el-form-item label="用户名"></el-form-item>
              <el-form-item label="店铺名称"></el-form-item>
              <el-form-item label="收货地址"></el-form-item>
              <el-form-item label="店铺ID"></el-form-item>
              <el-form-item label="店铺地址"></el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单ID"></el-table-column>
        <el-table-column label="总价格"></el-table-column>
        <el-table-column label="订单状态"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
export default {
  data() {
    return {
      tableData: [
        {
          userName: "18210587582",
          shopName: "超能鹿战队",
          deliveryAddress: "北京市朝阳区善各庄瑞平家园1号院1单元1号楼",
          shopId: 991,
          address: "北京市朝阳区创远路朝来科技园3号院3号楼"
        },
        {
          userName: "18210587582",
          shopName: "超能鹿战队",
          deliveryAddress: "北京市朝阳区善各庄瑞平家园1号院1单元1号楼",
          shopId: 991,
          address: "北京市朝阳区创远路朝来科技园3号院3号楼"
        }
      ]
    };
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
</style>