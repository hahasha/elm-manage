<template>
  <div class="fillcontain">
    <Header></Header>
    <div class="table-container">
      <el-table
        :data="tableData"
        :header-cell-style="tableHeaderStyle"
        :cell-style="tableCellStyle"
      >
        <el-table-column type="index" label="#" width="116px"></el-table-column>
        <el-table-column prop="date" label="注册日期" width="216px"></el-table-column>
        <el-table-column prop="name" label="用户姓名" width="216px"></el-table-column>
        <el-table-column prop="address" label="注册地址"></el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10,20,50,100]"
        :page-size="10"
        layout="total,sizes,prev,pager,next"
        :total="15"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
export default {
  data() {
    return {
      tableData: [],
      pageData: [
        {
          pageNum: 1,
          data: [
            {
              date: "2019-12-16 08:55",
              name: "sasa",
              address: "北京"
            },
            {
              date: "2019-12-16 09:55",
              name: "sasa",
              address: "北京"
            },
            {
              date: "2019-12-16 09:55",
              name: "sasa",
              address: "北京"
            },
            {
              date: "2019-12-16 09:55",
              name: "sasa",
              address: "北京"
            },
            {
              date: "2019-12-16 09:55",
              name: "sasa",
              address: "北京"
            },
            {
              date: "2019-12-16 08:55",
              name: "sasa",
              address: "北京"
            },
            {
              date: "2019-12-16 09:55",
              name: "sasa",
              address: "北京"
            },
            {
              date: "2019-12-16 09:55",
              name: "sasa",
              address: "北京"
            },
            {
              date: "2019-12-16 09:55",
              name: "sasa",
              address: "北京"
            },
            {
              date: "2019-12-16 09:55",
              name: "sasa",
              address: "北京"
            }
          ]
        },
        {
          pageNum: 2,
          data: [
            {
              date: "2019-12-16 08:55",
              name: "sasa",
              address: "北京"
            },
            {
              date: "2019-12-16 09:55",
              name: "sasa",
              address: "北京"
            },
            {
              date: "2019-12-16 09:55",
              name: "sasa",
              address: "北京"
            },
            {
              date: "2019-12-16 09:55",
              name: "sasa",
              address: "北京"
            },
            {
              date: "2019-12-16 09:55",
              name: "sasa",
              address: "北京"
            }
          ]
        }
      ],
      currentPage: 1
    };
  },
  created() {
    this.initData();
  },
  methods: {
    tableHeaderStyle() {
      return {
        background: "#eef1f6"
      };
    },
    tableCellStyle({ columnIndex }) {
      if (columnIndex == 0) {
        return {
          borderLeft: "1px solid #ebeef5"
        };
      } else if (columnIndex == 3) {
        return {
          borderRight: "1px solid #ebeef5"
        };
      }
    },
    initData() {
      const datas = this.pageData[this.currentPage - 1].data;
      this.tableData = datas;
    },
    handleSizeChange(val) {
      console.log(`每页${val}条`);
    },
    handleCurrentChange(val) {
        this.currentPage = val;
        this.initData();
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.table-container {
  padding: 20px;
}
.page-container {
  padding-left: 40px;
}
</style>