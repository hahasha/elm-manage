<template>
  <div class="fillcontain">
    <Header></Header>
    <div class="add-goods-container">
      <p class="form-title">选择食品种类</p>
      <el-form class="category-form">
        <el-form-item label="食品种类" class="select-wrap">
          <el-select v-model="categories.value" placeholder="请选择">
            <el-option
              v-for="item in categories.options"
              :key="item.value"
              :value="item.value"
              :label="item.lable"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-row class="add-category-wrap" :class="isAddCategory ? 'showEdit' : ''">
          <el-form-item label="食品种类">
            <el-input v-model="newCategory.type"></el-input>
          </el-form-item>
          <el-form-item label="种类描述">
            <el-input v-model="newCategory.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAddCategory">提交</el-button>
          </el-form-item>
        </el-row>
        <div class="add-category-btn" @click="showAddCategory">
          <i class="el-icon-caret-top add-icon" v-if="isAddCategory"></i>
          <i class="el-icon-caret-bottom add-icon" v-else></i>
          <span>添加食品种类</span>
        </div>
      </el-form>
      <p class="form-title">添加食品</p>
      <el-form class="add-goods-form" :rules="rules">
        <el-form-item label="食品名称" prop="foodName">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="食品活动">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="食品详情">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="上传食品图片">
          <el-upload action>
            <div class="img-wrap">
              <i class="el-icon-plus"></i>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="食品特点">
          <el-select v-model="features.value" multiple>
            <el-option
              v-for="item in features.options"
              :key="item.value"
              :value="item.value"
              :label="item.lable"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btn-wrap">
          <el-button type="primary">确认添加食品</el-button>
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
      isAddCategory: false,
      categories: {
        value: "",
        options: [
          {
            value: "op1",
            lable: "快餐"
          },
          {
            value: "op2",
            lable: "甜点"
          },
          {
            value: "op3",
            lable: "火锅"
          },
          {
            value: "op4",
            lable: "烧烤"
          }
        ]
      },
      newCategory: {
        type: "",
        desc: ""
      },
      features: {
        value: [],
        options: [
          {
            value: "op1",
            lable: "新品"
          },
          {
            value: "op2",
            lable: "招牌"
          },
          {
            value: "op3",
            lable: "特色"
          }
        ]
      },
      specs: "1",
      rules: {
        foodName: [{ required: true, message: "请输入店铺名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    showAddCategory() {
      this.isAddCategory = !this.isAddCategory;
    },
    handleAddCategory() {
      this.categories.options.push({
        value: this.newCategory.type,
        lable: this.newCategory.type
      })
      this.newCategory.type = '';
      this.$message('添加成功');
    }
  },
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.add-goods-container {
  padding: 25px 0;
  .form-title {
    text-align: center;
    font-size: 16px;
    color: #666;
    margin-bottom: 10px;
  }
  .category-form {
    width: 930px;
    margin: 0 auto 30px auto;
    border: 1px solid #eaeefb;
    border-radius: 6px;
    padding-top: 10px;
    box-sizing: border-box;
    .el-form-item {
      display: flex;
      margin: 20px 50px;
      text-align: center;
      /deep/ .el-form-item__content {
        flex: 1;
      }
      /deep/ .el-select {
        width: 100%;
      }
    }
    .add-category-wrap {
      height: 0;
      background: #f9fafc;
      overflow: hidden;
      transition: all 400ms;
      & .el-form-item:first-child {
        padding-top: 10px;
      }
      & .el-form-item:last-child {
        padding-bottom: 20px;
      }
    }
    .add-category-wrap.showEdit {
      height: 210px;
    }
    .add-category-btn {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      text-align: center;
      color: #ccc;
      transition: all 400ms;
      cursor: pointer;
      //   span {
      //     transition: all 400ms;
      //   }
      .add-icon {
        font-size: 24px;
        transform: translateY(14%);
        // transition: all 400ms;
      }
    }
    .add-category-btn:hover {
      color: #20a0ff;
    }
    .select-wrap {
      border-bottom: 1px solid #eaeefb;
      margin: 0;
      padding: 0 50px 30px 50px;
    }
    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
  }
  .add-goods-form {
    width: 930px;
    border: 1px solid #eaeefb;
    border-radius: 6px;
    padding: 20px;
    box-sizing: border-box;
    margin: 0 auto;
    .el-form-item {
      display: flex;
      /deep/ .el-form-item__content {
        flex: 1;
      }
      &.btn-wrap {
        text-align: center;
        margin-bottom: 0;
      }
    }
    .img-wrap {
      width: 120px;
      height: 120px;
      border: 1px dashed #ccc;
      border-radius: 4px;
      line-height: 120px;
      text-align: center;
      &:hover {
        border-color: #409eff;
      }
    }
    /deep/ .el-form-item__label {
      text-align: right;
      width: 100px;
    }
    &:hover {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
  }
}
</style>