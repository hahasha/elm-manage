<template>
  <div class="fillcontain">
    <Header></Header>
    <div class="table-container">
      <el-table :data="tableData" :header-cell-style="headerCellStyle">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form class="table-expand" inline>
              <el-form-item label="用户名">
                <span>{{props.row.userName}}</span>
              </el-form-item>
              <el-form-item label="店铺名称">
                <span>{{props.row.shopName}}</span>
              </el-form-item>
              <el-form-item label="收货地址">
                <span>{{props.row.deliveryAddress}}</span>
              </el-form-item>
              <el-form-item label="店铺ID">
                <span>{{props.row.shopId}}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{props.row.address}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单ID" prop="orderId"></el-table-column>
        <el-table-column label="总价格" prop="totalPrice"></el-table-column>
        <el-table-column label="订单状态" prop="status"></el-table-column>
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
          orderId: "FDAGREHREHTFGGFAAAF",
          totalPrice: 90,
          status: "订单超时",
          userName: "18210587582",
          shopName: "超能鹿战队",
          deliveryAddress: "北京市朝阳区善各庄瑞平家园1号院1单元1号楼",
          shopId: 991,
          address: "北京市朝阳区创远路朝来科技园3号院3号楼"
        },
        {
          orderId: "FDAGREHREHTFGGFOOOF",
          totalPrice: 110,
          status: "订单超时",
          userName: "18210587582",
          shopName: "超能鹿战队",
          deliveryAddress: "北京市朝阳区善各庄瑞平家园1号院1单元1号楼",
          shopId: 991,
          address: "北京市朝阳区创远路朝来科技园3号院3号楼"
        }
      ]
    };
  },
  methods: {
    headerCellStyle() {
      return "background: #eef1f6;";
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>

</style>