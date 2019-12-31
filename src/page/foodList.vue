<template>
  <div class="fillcontain">
    <Header></Header>
    <div class="table-container">
      <el-table
        :data="tableData"
        :header-cell-style="headerCellStyle"
        @expand-change="expandChange"
        :expand-row-keys="expandedRows"
        :row-key="row => row.index"
      >
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
                <span>{{props.row.shopAddress}}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{props.row.rating}}</span>
              </el-form-item>
              <el-form-item label="食品分类">
                <span>{{props.row.categoryName}}</span>
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
            <el-rate v-model="props.row.rating" disabled show-score text-color="#ff9900"></el-rate>
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
    <div class="pagination-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[20, 30, 50, 100]"
        :page-size="20"
        :current-page="currentPage"
        :total="foodCount"
        layout="total, sizes, prev, pager, next"
      ></el-pagination>
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
            <el-select v-model="selectData.value">
              <el-option
                v-for="item in selectData.options"
                :key="item.value"
                :label="item.lable"
                :value="item.lable"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食品图片">
            <el-upload
              :action="baseUrl+'/v1/addimg/food'"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-success="handleServiceAvatarScucess"
            >
              <img :src="baseImgUrl + diaFoodData.imgUrl" v-if="diaFoodData.imgUrl" class="img" />
              <i v-else class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-table :data="specs" :header-cell-style="headerCellStyle">
              <el-table-column label="规格" prop="specName"></el-table-column>
              <el-table-column label="包装费" prop="packingCharge"></el-table-column>
              <el-table-column label="价格" prop="price"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="deleteSpec(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item class="add-spec">
            <el-button type="primary" @click="diaAddSpecVisible = true">添加规格</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="diaFoodVisible = false">取消</el-button>
          <el-button @click="updateFood" type="primary">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="dialog-container dialog-addSpec">
      <el-dialog title="添加规格" :visible.sync="diaAddSpecVisible">
        <el-form
          :model="newSpec"
          class="add-spec-form"
          label-width="80px"
          :rules="specRule"
          ref="addSpecForm"
        >
          <el-form-item label="规格" prop="specName">
            <el-input v-model="newSpec.specName"></el-input>
          </el-form-item>
          <el-form-item label="包装费">
            <el-input-number
              :min="1"
              :max="20"
              controls-position="right"
              v-model="newSpec.packingCharge"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="价格">
            <el-input-number :min="20" controls-position="right" v-model="newSpec.price"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="diaAddSpecVisible = false">取消</el-button>
          <el-button @click="addSpec('addSpecForm')" type="primary">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import { baseUrl, baseImgUrl } from "@/api/http";
import {
  getFoodList,
  getFoodCount,
  getShopDetail,
  getFoodCategory,
  getFoodInfoById,
  updateFoodInfo
} from "@/api/api";
export default {
  data() {
    return {
      baseUrl,
      baseImgUrl,
      tableData: [],
      foodCount: 0,
      expandedRows: [],
      currentPage: 1,
      offset: 0,
      limit: 20,
      diaFoodVisible: false,
      diaAddSpecVisible: false,
      diaFoodData: {},
      selectData: {
        value: "",
        options: []
      },
      specs: [
        {
          specName: "",
          packingCharge: 0,
          price: 0
        }
      ],
      newSpec: {
        specName: "",
        packingCharge: 2,
        price: 20
      },
      specRule: {
        specName: [
          { required: true, message: "请输入规格名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const res = await getFoodCount();
      if (res.status == 1) {
        this.foodCount = res.count;
        this.getFoods();
      } else {
        throw new Error(res.message);
      }
    },
    async getFoods() {
      const foods = await getFoodList({
        offset: this.offset,
        limit: this.limit
      });
      this.tableData = [];
      foods.forEach((item, index) => {
        const foodInfo = {};
        foodInfo.index = index;
        foodInfo.id = item.item_id;
        foodInfo.name = item.name;
        foodInfo.desc = item.description;
        foodInfo.rating = item.rating;
        foodInfo.sales = item.month_sales;
        foodInfo.imgUrl = item.image_path;
        foodInfo.specs = item.specfoods;
        foodInfo.shopId = item.restaurant_id;
        foodInfo.categoryId = item.category_id;
        foodInfo.isExpand = false;
        this.tableData.push(foodInfo);
      });
    },
    async expandChange(row) {
      row.isExpand = !row.isExpand;
      // 如果expand-change结果为展开
      if (row.isExpand) {
        const shopInfo = await getShopDetail(row.shopId);
        const category = await getFoodCategory(row.categoryId);
        this.tableData.splice(row.index, 1, {
          ...row,
          ...{
            shopName: shopInfo.name,
            shopAddress: shopInfo.address,
            categoryName: category.name
          }
        });
        this.expandedRows.push(row.index);
      } else {
        const index = this.expandedRows.indexOf(row.index);
        this.expandedRows.splice(index, 1);
      }
    },
    handleSizeChange(val) {
      this.limit = val;
      this.getFoods();
    },
    handleCurrentChange(val) {
      this.offset = (val - 1) * this.limit;
      this.getFoods();
    },
    handleEdit(index, row) {
      this.diaFoodVisible = true;
      this.diaFoodData = row;
      this.setCategoryOption(row);
      this.setSpecData(row);
    },
    async setCategoryOption(row) {
      const cateDatas = await getFoodInfoById(row.shopId); //根据店铺ID获取当前店铺的食品信息
      this.selectData.options = [];
      cateDatas.forEach((item, index) => {
        const option = {};
        option.value = item.id;
        option.lable = item.name;
        if (item.id == row.categoryId) {
          this.selectData.value = item.name; //设置食品分类列表的当前选中项
        }
        this.selectData.options.push(option);
      });
    },
    setSpecData(row) {
      this.specs = [];
      row.specs.forEach(item => {
        const spec = {};
        spec.specName = item.specs_name;
        spec.packingCharge = item.packing_fee;
        spec.price = item.price;
        this.specs.push(spec);
      });
    },
    async updateFood() {
      this.diaFoodVisible = false;
      const subData = {
        new_category_id: this.selectData.value,
        specs: this.specs
      };
      const postData = { ...this.diaFoodData, ...subData };
      const res = await updateFoodInfo(postData);
      if (res.status == 1) {
        this.$message({
          type: "success",
          message: "更新食品信息成功"
        });
        this.getFoods();
      } else {
        console.log(res);
        this.$message({
          type: "error",
          message: res.message
        });
      }
    },
    handleDel(index, row) {
      this.tableData.splice(index, 1);
    },
    addSpec(addSpecForm) {
      this.$refs[addSpecForm].validate(valid => {
        if (valid) {
          this.specs.push(this.newSpec);
          this.diaAddSpecVisible = false;
        } else {
          return false;
        }
      });
    },
    beforeAvatarUpload(file) {
      const isRightType =
        file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isRightType) {
        this.$message.error("上传头像图片只支持jpg格式和png格式");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过2M");
      }
      return isRightType && isLt2M;
    },
    handleServiceAvatarScucess(res, file) {
      if (res.status == 1) {
        this.diaFoodData.imgUrl = res.image_path;
      } else {
        this.$message.error("上传图片失败!");
      }
    },
    deleteSpec(index, row) {
      this.specs.splice(index, 1);
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
.pagination-wrap {
  margin: 0 0 50px 20px;
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
      margin: 0 !important;
    }
  }
}
</style>