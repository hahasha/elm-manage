<template>
  <div class="fillcontain">
    <Header></Header>
    <div class="table-container">
      <el-table :data="tableData" :header-cell-style="headerCellStyle">
        <el-table-column type="index" width="50px"></el-table-column>
        <el-table-column label="姓名" prop="user_name"></el-table-column>
        <el-table-column label="注册日期" prop="create_time"></el-table-column>
        <el-table-column label="地址" prop="city"></el-table-column>
        <el-table-column label="权限" prop="admin"></el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20,30,50,100]"
        :page-size="20"
        layout="total, sizes, prev, pager, next"
        :total="adminCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import { getAdminList, getAdminCount } from "@/api/api";
export default {
  data() {
    return {
      tableData: [],
      adminCount: 0,
      offset: 0,  //跳过的数据条数
      limit: 20,  //每次请求的数据条数
      currentPage: 1
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.getAdmins();
      this.getCount();
    },
    getAdmins() {
      getAdminList({
        offset: this.offset,
        limit: this.limit
      }).then(res => {
        if (res.status == 1) {
          this.tableData = res.data;
        } else {
          throw new Error(res.message);
        }
      });
    },
    getCount() {
      getAdminCount().then(res => {
        if (res.status == 1) {
          this.adminCount = res.count;
        } else {
          throw new Error(res.messge);
        }
      });
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getAdmins();
    },
    handleCurrentChange(val) {
      this.offset = (val - 1) * this.limit;
      this.getAdmins();
    },
    headerCellStyle() {
      return "background: #eef1f6";
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
