<template>
  <div class="fillcontain">
    <Header></Header>
    <div class="table-container">
      <el-table :data="tableData" :header-cell-style="headerCellStyle">
        <el-table-column type="expand" width="50px">
          <template slot-scope="props">
            <el-form inline class="table-expand">
              <el-form-item label="店铺名称">
                <span>{{props.row.name}}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{props.row.address}}</span>
              </el-form-item>
              <el-form-item label="店铺介绍">
                <span>{{props.row.desc}}</span>
              </el-form-item>
              <el-form-item label="店铺ID">
                <span>{{props.row.shopId}}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{props.row.tel}}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{props.row.score}}</span>
              </el-form-item>
              <el-form-item label="销量">
                <span>{{props.row.sales}}</span>
              </el-form-item>
              <el-form-item label="分类">
                <span>{{props.row.category}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="店铺名称" prop="name" width="330px"></el-table-column>
        <el-table-column label="店铺地址" prop="address" width="330px"></el-table-column>
        <el-table-column label="店铺介绍" prop="desc" width="330px"></el-table-column>
        <el-table-column label="操作"></el-table-column>
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
          name: "超能鹿战队",
          address: "北京市朝阳区创远路朝来科技园3号院3号楼",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          shopId: "001",
          tel: "18210587582",
          score: 4.9,
          sales: 2100,
          category: "轻食/便当"
        },
        {
          name: "超能鹿战队",
          address: "北京市朝阳区创远路朝来科技园3号院3号楼",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          shopId: "001",
          tel: "18210587582",
          score: 4.9,
          sales: 2100,
          category: "轻食/便当"
        }
      ]
    };
  },
  methods: {
    headerCellStyle() {
      return "background: #eef1f6;";
    },
    tableCellStyle({ columnIndex }) {
      if (columnIndex == 0) {
        return {
          borderLeft: "1px solid #ebeef5"
        };
      } else if (columnIndex == 4) {
        return {
          borderRight: "1px solid #ebeef5"
        };
      }
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
  /deep/ .el-table {
    border: 1px solid #ebeef5;
    box-sizing: border-box;
    width: 100%;
  }
  /deep/ .el-table--fit {
    border-bottom: 0;
  }
  // /deep/ .el-table__body-wrapper,
  // .el-table__footer-wrapper,
  // .el-table__header-wrapper {
  //   width: 100%;
  // }
}
</style>