<template>
  <div class="fillcontain">
    <Header></Header>
    <div class="table-container">
      <el-table :data="tableData" :header-cell-style="headerCellStyle">
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="注册日期" prop="regesterDate"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="权限" prop="limit"></el-table-column>
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
          name: "sasa",
          regesterDate: "2019-12-19 8:00",
          address: "北京",
          limit: "管理员"
        },
        {
          name: "zhuzhu",
          regesterDate: "2019-12-19 9:00",
          address: "北京",
          limit: "管理员"
        }
      ]
    }
  },
  methods: {
    headerCellStyle() {
      return "background: #eef1f6";
    }
  },
  components: {
    Header
  }
};
</script>