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
                <span>{{props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺ID">
                <span>{{props.row.shopId}}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{props.row.shopAddress}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单ID" prop="orderId"></el-table-column>
        <el-table-column label="总价格" prop="totalPrice"></el-table-column>
        <el-table-column label="订单状态" prop="status"></el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[20, 30, 50, 100]"
        :page-size="20"
        :current-page="currentPage"
        :total="orderCount"
        layout="total, sizes, prev, pager, next"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import {
  getOrderList,
  getOrderCount,
  getUserInfo,
  getShopDetail,
  getAddressById
} from "@/api/api";
export default {
  data() {
    return {
      tableData: [],
      offset: 0,
      limit: 20,
      orderCount: 0,
      currentPage: 1,
      shopId: null
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.getOrders();
      this.getCount();
    },
    // getOrders() {
    //   getOrderList({
    //     offset: this.offset,
    //     limit: this.limit
    //   }).then(res => {
    //     this.tableData = res;
    //   });
    // },
    async getOrders() {
      const orders = await getOrderList({
        offset: this.offset,
        limit: this.limit
      });
      orders.forEach((item, index) => {
        this.getExpandData(item, index);
        const orderInfo = {};
        orderInfo.index = index;
        orderInfo.orderId = item.id;
        orderInfo.totalPrice = item.total_amount;
        orderInfo.status = item.status_bar.title;
        orderInfo.shopName = item.restaurant_name;
        orderInfo.shopId = item.restaurant_id;
        this.tableData.push(orderInfo);
      });
    },
    async getExpandData(item, index) {
      const shopInfo = await getShopDetail(item.restaurant_id);
      const userInfo = await getUserInfo(item.user_id);
      const addressInfo = await getAddressById(item.address_id);
      this.tableData.splice(index, 1, {
        ...this.tableData[index],
        ...{
          shopAddress: shopInfo.address,
          address: addressInfo.address,
          userName: userInfo.username
        }
      });
    },
    getCount() {
      getOrderCount().then(res => {
        if (res.status == 1) {
          this.orderCount = res.count;
        } else {
          throw new Error(res.message);
        }
      });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getOrders();
    },
    handleCurrentChange(val) {
      this.offset = (val - 1) * this.limit;
      this.getOrders();
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
.pagination-wrap {
  margin: 0 0 50px 20px;
}
</style>