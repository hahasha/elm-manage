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
                <span>{{props.row.restaurant_name}}</span>
              </el-form-item>
              <el-form-item label="食品ID">
                <span>{{props.row.item_id}}</span>
              </el-form-item>
              <el-form-item label="店铺ID">
                <span>{{props.row.restaurant_id}}</span>
              </el-form-item>
              <el-form-item label="食品介绍">
                <span>{{props.row.description}}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{props.row.restaurant_address}}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{props.row.rating}}</span>
              </el-form-item>
              <el-form-item label="食品分类">
                <span>{{props.row.category_name}}</span>
              </el-form-item>
              <el-form-item label="月销量">
                <span>{{props.row.month_sales}}</span>
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
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        :total="count"
        layout="total, sizes, prev, pager, next"
      ></el-pagination>
    </div>
    <div class="dialog-container dialog-foodInfo">
      <el-dialog title="修改食品信息" :visible.sync="dialogFormVisible">
        <el-form :model="selectTable">
          <el-form-item label="食品名称">
            <el-input v-model="selectTable.name"></el-input>
          </el-form-item>
          <el-form-item label="食品介绍">
            <el-input v-model="selectTable.description"></el-input>
          </el-form-item>
          <el-form-item label="食品分类">
            <el-select v-model="selectMenu.label" @change="handleSelect">
              <el-option
                v-for="item in menuOptions"
                :key="item.value"
                :label="item.label"
                :value="item.index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="食品图片">
            <el-upload
              :action="baseUrl+'/v1/addimg/food'"
              :show-file-list="false"
              :before-upload="beforeAvatorUpload"
              :on-success="handleServiceAvatorSuccess"
            >
              <img :src="baseImgUrl + selectTable.image_path" v-if="selectTable.image_path" class="img" />
              <i v-else class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-table :data="specs" :header-cell-style="headerCellStyle">
              <el-table-column label="规格" prop="specs"></el-table-column>
              <el-table-column label="包装费" prop="packing_fee"></el-table-column>
              <el-table-column label="价格" prop="price"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="deleteSpec(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item class="add-spec">
            <el-button type="primary" @click="specsFormVisible = true">添加规格</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button @click="updateFood" type="primary">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="dialog-container dialog-addSpec">
      <el-dialog title="添加规格" :visible.sync="specsFormVisible">
        <el-form
          :model="specsForm"
          class="add-spec-form"
          label-width="80px"
          :rules="specsFormRules"
          ref="addSpecForm"
        >
          <el-form-item label="规格" prop="specs">
            <el-input v-model="specsForm.specs"></el-input>
          </el-form-item>
          <el-form-item label="包装费">
            <el-input-number
              :min="1"
              :max="20"
              controls-position="right"
              v-model="specsForm.packing_fee"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="价格">
            <el-input-number :min="20" controls-position="right" v-model="specsForm.price"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="specsFormVisible = false">取消</el-button>
          <el-button @click="addSpecs" type="primary">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import axios from 'axios'
import { baseUrl, baseImgUrl } from "@/api/http";
import { getFoodList, getFoodCount, getShopDetail, getCategoryList, getCategoryById, getResturantDetail, updateFoodInfo, deleteFoodById } from "@/api/api";
export default {
  data() {
    return {
      baseUrl,
      baseImgUrl,
      restaurant_id: null,
      offset: 0,
      count: 0,
      limit: 20,
      tableData: [],
      currentPage: 1,
      selectTable: {},   //选中表格的详细信息
      dialogFormVisible: false,
      menuOptions: [],    //食品分类列表
      selectMenu: {},    //选中的食品分类
      selectIndex: null,   //选中食品分类的索引
      specsForm: {   //新添加规格信息
        specs: '',   //规格名称
        packing_fee: 0,   //包装费
        price: 20    //配送费
      },
      specsFormRules: {   
        specs : [
          { required: true, message: '请输入规格', trigger: 'blur' }
        ]
      },
      specsFormVisible: false,
      expandedRows: []    //展开行
    }
  },
  created() {
    this.restaurant_id = this.$route.query.restaurant_id
    this.initData()
  },
  computed: {
    specs() {
      let specs = []
      if(this.selectTable.specfoods) {
        this.selectTable.specfoods.forEach((item) => {
          specs.push({
            specs: item.specs_name,
            packing_fee: item.packing_fee,
            price: item.price
          })
        })
      }
      return specs
    }
  },
  methods: {
    async initData() {
      try {
        const res = await getFoodCount({ restaurant_id : this.restaurant_id })
        if (res.status === 1) {
          this.count = res.count
          this.getFoods()
        } else {
          throw new Error('获取数据失败')
        }
      } catch (err) {
        
      }
    },
    async getMenus() {
      this.menuOptions = []
      let categoryList = []
      try {
        const res = await getCategoryList(this.restaurant_id)
        if(res.status === 1) {
          categoryList = res.category_list
          categoryList.forEach((item, index) => {
            this.menuOptions.push({
              label: item.name,
              value: item.id,
              index
            })
          })
        } else {
          throw new Error('获取数据失败')
        }
      } catch(err) {
        console.log('获取食品分类信息失败', err)
      } 
    },
    async getFoods() {
      const foodList = await getFoodList({
        offset: this.offset,
        limit: this.limit,
        restaurant_id: this.restaurant_id
      })
      this.tableData = []
      foodList.forEach((item, index) => {
        const foodItem = {}
        foodItem.name = item.name // 食品名称
        foodItem.item_id = item.item_id // 食品ID
        foodItem.restaurant_id = item.restaurant_id // 餐馆ID（根据id获取餐馆名称和地址）
        foodItem.description = item.description // 食品介绍
        foodItem.rating = item.rating // 食品评分
        foodItem.category_id = item.category_id // 分类ID（根据id获取分类信息）
        foodItem.month_sales = item.month_sales // 月销量
        foodItem.image_path = item.image_path // 食品图片
        foodItem.specfoods = item.specfoods // 食品规格
        foodItem.isExpanded = false //当前项是否展开
        foodItem.index = index
        this.tableData.push(foodItem)
      })
    },
    handleSelect(index) {
      this.selectMenu = this.menuOptions[index]
    },
    expandChange(row) {
      row.isExpanded = !row.isExpanded
      if(row.isExpanded) {
        // 并获取展开行信息
        this.expandedRows.push(row.index)
        this.getSelectedItemData(row)
      } else {
        // 从展开行列表中删除当前展开行
        const index = this.expandedRows.indexOf(row.index)
        this.expandedRows.splice(index, 1)
      }
    },
    async getSelectedItemData(row, type) {
      const restaurant = await getResturantDetail(row.restaurant_id)
      const category = await getCategoryById(row.category_id)
      this.selectTable = {
        ...row,
        ...{
          restaurant_name : restaurant.name,
          restaurant_address : restaurant.address,
          category_name : category.name
        }
      }
      this.selectMenu = {
        label : category.name,
        value : row.category_id
      }
      this.tableData.splice(row.index, 1, {...this.selectTable}) // 更新当前展开行的信息
      // this.$nextTick(() => {
      //   // 等待DOM更新后执行
      //   this.expandedRows.push(row.index)
      // })
      if(type === 'edit') {
        this.restaurant_id = row.restaurant_id
        this.getMenus()
      }
    },
    handleEdit(row) {
      this.getSelectedItemData(row, 'edit')
      this.dialogFormVisible = true
    },
    async handleDelete(index, row) {
      // const res = await deleteFoodById(row.item_id)
      axios.delete('/shopping/v2/food/'+ row.item_id).then((res) => {
        const ress = res.data
        console.log(ress)
        if(ress.status === 1) {
          this.$message({
            type: 'success',
            message: '删除食品成功'
          })
          this.getFoods()
        } else {
          this.$message({
            type: 'error',
            message: ress.message
          })
        }
      })
    },
    // item_id    	  Y      	int  	    食品id
    // name    	      Y      	string  	食品名称
    // description    N     	string  	食品介绍
    // image_path    	Y      	string  	店铺图片地址
    // restaurant_id  Y      	int  	    餐馆id
    // category_id    Y      	int  	    食品分类id
    // specfoods    	Y      	array  	  规格： [{specs: '默认',packing_fee: 0,price: 20,}]
    async updateFood() {
      this.dialogFormVisible = false
      try {
        this.selectTable.category_id = this.selectMenu.value
        const subData = { specfoods: this.specs }
        const postData = { ...this.selectTable, ...subData }
        const res = await updateFoodInfo(postData)
        console.log(postData)
        debugger
        if(res.status === 1) {
          this.$message({
            type: 'success',
            message: '更新食品信息成功'
          })
          this.getFoods()  //更新完食品信息后重新获取
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      } catch (err) {
        console.log('修改失败'+ err)
      }
    },

    addSpecs() {
      this.specs.push({...this.specsForm})
      this.specsFormVisible = false
    },
    deleteSpec(index) {
      this.specs.splice(index, 1)
    },
    beforeAvatorUpload(file) {
      const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png')
      const isLt2M = file.size / 1024 / 1024 < 2
      if(!isRightType) {
        this.$message.error('上传头像图片只能是 JPG或者PNG 格式')
      }
      if(!isLt2M) {
        this.$message.error('上传图片的大小不能超过2MB!')
      }
      return isRightType && isLt2M
    },
    handleServiceAvatorSuccess(res, file) {
      if(res.status === 1) {
        this.selectTable.image_path = res.image_path
      } else {
        this.$message.error('上传图片失败！')
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
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