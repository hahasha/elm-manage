<template>
  <div class="fillcontain">
    <Header></Header>
    <div class="form-container">
      <el-form :model="formData" :rules="rules">
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
          <span>品牌保证</span>
          <el-switch v-model="formData.features.sw1"></el-switch>
          <span>蜂鸟专送</span>
          <el-switch v-model="formData.features.sw2"></el-switch>
          <span>新开店铺</span>
          <el-switch v-model="formData.features.sw3"></el-switch>
          <span>外卖保</span>
          <el-switch v-model="formData.features.sw4"></el-switch>
          <span>准时达</span>
          <el-switch v-model="formData.features.sw5"></el-switch>
          <span>开发票</span>
          <el-switch v-model="formData.features.sw6"></el-switch>
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
          ></el-time-select>
          <el-time-select
            :picker-options="{
              start: '05:00',
              step: '00:15',
              end: '23:00'
                }"
            placeholder="结束时间"
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
        <el-form-item label="优惠活动"></el-form-item>
        <el-form-item>
          <el-table>
            <el-table-column label="活动标题"></el-table-column>
            <el-table-column label="活动名称"></el-table-column>
            <el-table-column label="活动详情"></el-table-column>
            <el-table-column label="操作">
              <el-button type="danger">删除</el-button>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即创建</el-button>
          <el-button>重置</el-button>
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
        discount: [
          {
            title: "",
            name: "",
            detail: ""
          },
          {}
        ]
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
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.form-container {
  width: 60%;
  margin: 0 auto;
}
</style>