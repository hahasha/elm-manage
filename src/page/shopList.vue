<template>
  <div class="fillcontain">
    <Header></Header>
    <div class="table-container">
      <el-table :data="tableData">
        <el-table-column type="expand">
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
        <el-table-column label="店铺名称" prop="name"></el-table-column>
        <el-table-column label="店铺地址" prop="address"></el-table-column>
        <el-table-column label="店铺介绍" prop="desc"></el-table-column>
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
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.table-container {
  padding: 20px;
}
</style>