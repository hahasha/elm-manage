<template>
  <div class="fillcontain">
    <Header></Header>
    <div class="table-container">
      <el-table :data="tableData" :header-cell-style="headerCellStyle">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form inline class="table-expand">
              <el-form-item label="食品名称">
                <span>{{props.row.name}}</span>
              </el-form-item>
              <el-form-item label="店铺名称">
                <span>{{props.row.shopName}}</span>
              </el-form-item>
              <el-form-item label="食品ID">
                <span>{{props.row.id}}</span>
              </el-form-item>
              <el-form-item label="店铺ID">
                <span>{{props.row.shopId}}</span>
              </el-form-item>
              <el-form-item label="食品介绍">
                <span>{{props.row.desc}}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{props.row.address}}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{props.row.score}}</span>
              </el-form-item>
              <el-form-item label="食品分类">
                <span>{{props.row.category}}</span>
              </el-form-item>
              <el-form-item label="月销量">
                <span>{{props.row.sales}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="食品名称" prop="name"></el-table-column>
        <el-table-column label="食品介绍" prop="desc"></el-table-column>
        <el-table-column label="食品评分">
          <template slot-scope="props">
            <el-rate v-model="props.row.score" disabled show-score text-color="#ff9900"></el-rate>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-container dialog-foodInfo">
      <el-dialog title="修改食品信息" :visible.sync="diaFoodVisible">
        <el-form :model="diaFoodData">
          <el-form-item label="食品名称">
            <el-input v-model="diaFoodData.name"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍">
            <el-input v-model="diaFoodData.desc"></el-input>
          </el-form-item>
          <el-form-item label="食品分类">
            <el-select placeholder="热销榜" v-model="selectData.value">
              <el-option
                v-for="item in selectData.options"
                :key="item.value"
                :label="item.lable"
                :value="item.lable"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食品图片">
            <el-upload action="baseUrl + '/v1/addimg/shop'" :show-file-list="false">
              <img :src="imageUrl" v-if="imageUrl" class="img" />
              <i v-else class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-table :data="[diaFoodData.specs]" :header-cell-style="headerCellStyle">
              <el-table-column label="规格" prop="spec"></el-table-column>
              <el-table-column label="包装费" prop="packingCharge"></el-table-column>
              <el-table-column label="价格" prop="price"></el-table-column>
              <el-table-column label="操作">
                <el-button type="danger" size="mini">删除</el-button>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item class="add-spec">
            <el-button type="primary" @click="diaAddSpecVisible = true">添加规格</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="diaFoodVisible = false">取消</el-button>
          <el-button @click="diaFoodVisible = false" type="primary">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="dialog-container dialog-addSpec">
      <el-dialog title="添加规格" :visible.sync="diaAddSpecVisible">
        <el-form class="add-spec-form" label-width="80px">
          <el-form-item label="规格">
              <el-input></el-input>
          </el-form-item>
          <el-form-item label="包装费">
              <el-input-number :min="1" :max="20" controls-position="right" v-model="num"></el-input-number>
          </el-form-item>
          <el-form-item label="价格">
              <el-input-number :min="20" controls-position="right" v-model="price"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="diaAddSpecVisible = false">取消</el-button>
            <el-button @click="diaAddSpecVisible = false" type="primary">确定</el-button>
        </div>
      </el-dialog>
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
          id: 5991,
          name: "海陆双拼减脂沙拉",
          shopName: "超能鹿战队",
          shopId: 991,
          address: "北京市朝阳区创远路朝来科技园3号院3号楼",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          score: 5,
          category: "热销榜",
          sales: 1590,
          specs: {
            spec: "默认",
            packingCharge: 5,
            price: 19.9
          }
        },
        {
          id: 5992,
          name: "超能小牛肉沙拉",
          shopName: "超能鹿战队",
          shopId: 991,
          address: "北京市朝阳区创远路朝来科技园3号院3号楼",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          score: 3.5,
          category: "热销榜",
          sales: 1590,
          specs: {
            spec: "默认",
            packingCharge: 5,
            price: 19.9
          }
        },
        {
          id: 5991,
          name: "海陆双拼减脂沙拉",
          shopName: "超能鹿战队",
          shopId: 991,
          address: "北京市朝阳区创远路朝来科技园3号院3号楼",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          score: 5,
          category: "热销榜",
          sales: 1590,
          specs: {
            spec: "默认",
            packingCharge: 5,
            price: 19.9
          }
        },
        {
          id: 5992,
          name: "超能小牛肉沙拉",
          shopName: "超能鹿战队",
          shopId: 991,
          address: "北京市朝阳区创远路朝来科技园3号院3号楼",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          score: 3.5,
          category: "热销榜",
          sales: 1590,
          specs: {
            spec: "默认",
            packingCharge: 5,
            price: 19.9
          }
        }
      ],
      diaFoodVisible: false,
      diaAddSpecVisible: false,
      diaFoodData: {},
      selectData: {
        value: "",
        options: [
          {
            value: "hot1",
            lable: "热销榜1"
          },
          {
            value: "hot2",
            lable: "热销榜2"
          },
          {
            value: "hot3",
            lable: "热销榜3"
          }
        ]
      },
      imageUrl: "http://elm.cangdu.org/img/16f132484ce61386.jpg",
      num: 1,
      price: 20
    };
  },
  methods: {
    headerCellStyle() {
      return "background: #eef1f6";
    },
    handleEdit(index, row) {
      this.diaFoodVisible = true;
      this.diaFoodData = this.tableData[index];
    },
    handleDel(index, row) {
      this.tableData.splice(index, 1);
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.tableborder {
  .el-table {
    border: 1px solid #ebeef5;
  }
  .el-table--fit {
    border-bottom: 0;
  }
}
.table-container {
  padding: 20px;
  .tableborder;
}
.dialog-container {
  .tableborder;
  /deep/ .el-table td {
    padding: 6px 0;
  }
  /deep/ .el-table th {
    padding: 0;
  }
  .add-spec {
    text-align: center;
  }
  .add-spec-form {
      /deep/ .el-form-item__content {
          margin: 0!important;
      }
  }
}
</style>