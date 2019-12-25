<template>
  <div class="fillcontain">
    <Header></Header>
    <div class="table-container">
      <el-table :data="tableData" :header-cell-style="headerCellStyle">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form class="table-expand" inline>
              <el-form-item label="用户名">
                <span>{{props.row.user_name}}</span>
              </el-form-item>
              <el-form-item label="店铺名称">
                <span>{{props.row.restaurant_name}}</span>
              </el-form-item>
              <el-form-item label="收货地址">
                <span>{{props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺ID">
                <span>{{props.row.restaurant_id}}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{props.row.restaurant_address}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单ID" prop="id"></el-table-column>
        <el-table-column label="总价格" prop="total_amount"></el-table-column>
        <el-table-column label="订单状态" prop="status_bar.title"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import { getOrderList } from "@/api/api";
export default {
  data() {
    return {
      tableData: [],
      offset: 0,
      limit: 20
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.getOrders();
    },
    getOrders() {
      getOrderList({
        offset: this.offset,
        limit: this.limit
      }).then(res => {
        this.tableData = res;
      })
    },
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