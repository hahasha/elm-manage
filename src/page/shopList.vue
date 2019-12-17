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
                <el-rate disabled show-score v-model="props.row.score" text-color="#ff9900"></el-rate>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
            <el-button size="mini" @click="handleAddFood(scope.$index,scope.row)">添加食品</el-button>
            <el-button size="mini" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-container">
      <el-dialog title="修改店铺信息" :visible.sync="dialogVisible">
        <el-form>
          <el-form-item label="店铺名称">
            <el-input v-model="dialogData.name"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="dialogData.address"></el-input>
            <span>当前城市：北京</span>
          </el-form-item>
          <el-form-item label="店铺介绍">
            <el-input v-model="dialogData.desc"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="dialogData.tel"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类">
            <el-cascader
              :options="cascaderData.options"
              v-model="dialogData.category"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="商铺图片">
            <el-upload
              action="baseUrl + '/v1/addimg/shop'"
              :show-file-list="false"
              :on-success="handleImgSuccess"
            >
              <img :src="imageUrl" v-if="imageUrl" class="img" />
              <i v-else class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确定</el-button>
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
          name: "超能鹿战队",
          address: "北京市朝阳区创远路朝来科技园3号院3号楼",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          shopId: "001",
          tel: "18210587582",
          score: 4.9,
          sales: 2100,
          category: "快餐便当/简餐"
        },
        {
          name: "小谷姐姐麻辣烫",
          address: "北京市朝阳区创远路朝来科技园3号院3号楼",
          desc: "鲜香麻辣",
          shopId: "002",
          tel: "18210587582",
          score: 2.9,
          sales: 2100,
          category: "快餐便当/麻辣烫"
        },
        {
          name: "超能鹿战队",
          address: "北京市朝阳区创远路朝来科技园3号院3号楼",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          shopId: "001",
          tel: "18210587582",
          score: 4.9,
          sales: 2100,
          category: "快餐便当/简餐"
        },
        {
          name: "小谷姐姐麻辣烫",
          address: "北京市朝阳区创远路朝来科技园3号院3号楼",
          desc: "鲜香麻辣",
          shopId: "002",
          tel: "18210587582",
          score: 2.9,
          sales: 2100,
          category: "快餐便当/麻辣烫"
        }
      ],
      dialogVisible: false,
      dialogData: {},
      cascaderData: {
        value: [],
        options: [
          {
            value: "ygll",
            label: "异国料理",
            children: [
              {
                value: "rhll",
                label: "日韩料理"
              },
              {
                value: "xc",
                label: "西餐"
              },
              {
                value: "psym",
                label: "披萨意面"
              },
              {
                value: "dnyc",
                label: "东南亚菜"
              }
            ]
          },
          {
            value: "kcbd",
            label: "快餐便当",
            children: [
              {
                value: "jc",
                label: "简餐"
              },
              {
                value: "gjf",
                label: "盖浇饭"
              },
              {
                value: "mfmg",
                label: "米粉面馆"
              },
              {
                value: "bzzd",
                label: "包子粥店"
              },
              {
                value: "mlt",
                label: "麻辣烫"
              }
            ]
          },
          {
            value: "xcxy",
            label: "小吃宵夜",
            children: [
              {
                value: "yblw",
                label: "鸭脖卤味"
              },
              {
                value: "sk",
                label: "烧烤"
              },
              {
                value: "zjzc",
                label: "炸鸡炸串"
              },
              {
                value: "xlx",
                label: "小龙虾"
              },
              {
                value: "lsf",
                label: "螺蛳粉"
              }
            ]
          },
          {
            value: "gssx",
            label: "果蔬生鲜",
            children: [
              {
                value: "sg",
                label: "水果"
              },
              {
                value: "sc",
                label: "蔬菜"
              },
              {
                value: "hx",
                label: "海鲜"
              }
            ]
          },
          {
            value: "xhdg",
            label: "鲜花蛋糕",
            children: [
              {
                value: "xh",
                label: "鲜花"
              },
              {
                value: "dg",
                label: "蛋糕"
              }
            ]
          },
          {
            value: "tpyp",
            label: "甜品饮品",
            children: [
              {
                value: "nc",
                label: "奶茶"
              },
              {
                value: "gz",
                label: "果汁"
              }
            ]
          }
        ]
      },
      imageUrl: "http://elm.cangdu.org/img/16f132484ce61386.jpg"
    };
  },
  methods: {
    headerCellStyle() {
      return "background: #eef1f6;";
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.dialogData = this.tableData[index];
    },
    handleAddFood(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.tableData.splice(index,1);
    },
    handleChange(value) {
      console.log(value);
    },
    handleImgSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
  .el-table {
    border: 1px solid #ebeef5;
  }
  .el-table--fit {
    border-bottom: 0;
  }
  .el-button--mini {
    padding: 6px 8px;
  }
  .el-button--mini:last-child {
    background: #ff4949;
    color: #fff;
  }
  /deep/ .el-form--inline .el-form-item__content {
    vertical-align: middle;
  }
}
.dialog-container {
  /deep/ .el-dialog__body {
    padding: 30px 50px;
  }
  .el-form-item {
    display: flex;
    /deep/ .el-form-item__content {
      flex: 1;
    }
  }
  .img {
    width: 120px;
    height: 120px;
    border-radius: 6px;
    border: 1px dashed #ccc;
  }
  .img:hover {
    border: 1px dashed #20a0ff;
  }
}
</style>