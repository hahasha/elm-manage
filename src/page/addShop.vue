<template>
  <div class="fillcontain">
    <Header></Header>
    <div class="form-container">
      <el-form :model="formData" ref="addShopForm" :rules="rules">
        <el-form-item label="店铺名称" prop="shopName">
          <el-input v-model="formData.shopName"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="tel">
          <el-input v-model="formData.tel"></el-input>
        </el-form-item>
        <el-form-item label="店铺简介">
          <el-input v-model="formData.desc"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类">
          <el-cascader :options="formData.category.options"></el-cascader>
        </el-form-item>
        <el-form-item label="店铺特点">
          <el-row class="sw-wrap">
            <span>品牌保证</span>
            <el-switch v-model="formData.features.sw1"></el-switch>
            <span>蜂鸟专送</span>
            <el-switch v-model="formData.features.sw2"></el-switch>
            <span>新开店铺</span>
            <el-switch v-model="formData.features.sw3"></el-switch>
          </el-row>
          <el-row class="sw-wrap">
            <span>外卖保</span>
            <el-switch v-model="formData.features.sw4"></el-switch>
            <span>准时达</span>
            <el-switch v-model="formData.features.sw5"></el-switch>
            <span>开发票</span>
            <el-switch v-model="formData.features.sw6"></el-switch>
          </el-row>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input-number v-model="formData.distributionFee" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="起送价">
          <el-input-number v-model="formData.deliveryCost" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-select
            :picker-options="{
              start: '05:00',
              step: '00:15',
              end: '23:00'
          }"
            placeholder="起始时间"
            v-model="formData.businessTime.startValue"
          ></el-time-select>
          <el-time-select
            :picker-options="{
              start: '05:00',
              step: '00:15',
              end: '23:00'
                }"
            placeholder="结束时间"
            v-model="formData.businessTime.endValue"
          ></el-time-select>
        </el-form-item>
        <el-form-item label="上传店铺头像">
          <el-upload action="baseUrl + '/v1/addimg/shop'" :show-file-list="false">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传营业执照">
          <el-upload action="baseUrl + '/v1/addimg/shop'" :show-file-list="false">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传餐饮服务许可证">
          <el-upload action="baseUrl + '/v1/addimg/shop'" :show-file-list="false">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="优惠活动">
          <el-select v-model="formData.discount.value" @change="handleSelectChange">
            <el-option
              v-for="item in formData.discount.options"
              :key="item.value"
              :label="item.lable"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-table :data="formData.discount.tbArr" :header-cell-style="headerCellStyle">
            <el-table-column label="活动标题" prop="title"></el-table-column>
            <el-table-column label="活动名称" prop="name"></el-table-column>
            <el-table-column label="活动详情" prop="detail"></el-table-column>
            <el-table-column label="操作">
              <el-button type="danger" size="mini">删除</el-button>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item class="form-btn-wrap">
          <el-button type="primary">立即创建</el-button>
          <el-button @click="resetForm('addShopForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
export default {
  data() {
    return {
      formData: {
        shopName: "",
        address: "",
        tel: "",
        desc: "",
        category: "",
        distributionFee: 2,
        deliveryCost: 20,
        features: {
          sw1: true,
          sw2: true,
          sw3: true,
          sw4: true,
          sw5: true,
          sw6: true
        },
        category: {
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
        businessTime: {
          startValue: "",
          endValue: ""
        },
        discount: {
          value: "op1",
          options: [
            {
              value: "op1",
              lable: "满减优惠"
            },
            {
              value: "op2",
              lable: "优惠大酬宾"
            },
            {
              value: "op3",
              lable: "新用户立减"
            },
            {
              value: "op4",
              lable: "进店领券"
            }
          ],
          tbArr: [
            {
              title: "减",
              name: "满减优惠",
              detail: "满30减5，满60减15"
            }
          ]
        }
      },
      rules: {
        shopName: [
          { required: true, message: "请输入店铺名称", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        tel: [{ required: true, message: "请输入联系电话", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSelectChange(value) {
      const discounts = this.formData.discount.options;
      let tbItem = {
        title: "",
        name: "",
        detail: ""
      };
      if (value == "op1") {
        tbItem.title = "减";
        tbItem.name = discounts[0].lable;
      } else if (value == "op2") {
        tbItem.title = "惠";
        tbItem.name = discounts[1].lable;
      } else if (value == "op3") {
        tbItem.title = "新";
        tbItem.name = discounts[2].lable;
      } else {
        tbItem.title = "券";
        tbItem.name = discounts[3].lable;
      }
      this.$prompt("请输入活动详情", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          tbItem.detail = value;
          this.formData.discount.tbArr.push(tbItem);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    headerCellStyle() {
      return "background: #eef1f6;";
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.form-container {
  width: 60%;
  margin: 20px auto 40px auto;
  /deep/ .el-form-item__label {
    width: 12%;
    float: left;
  }
  /deep/ .el-form-item__content {
    float: left;
    width: 88%;
  }
  .sw-wrap span {
    color: #606266;
    display: inline-block;
    width: 7%;
  }
  .el-switch {
    margin-right: 10px;
  }
  .el-date-editor {
    width: 192px;
    margin-right: 10px;
  }
  .el-table {
    border: 1px solid #ebeef5;
  }
  .el-table--fit {
    border-bottom: 0;
  }
  /deep/ .el-table td {
    padding: 6px 0;
  }
  /deep/ .el-table th {
    padding: 0;
  }
  .form-btn-wrap {
    text-align: center;
  }
}
</style>