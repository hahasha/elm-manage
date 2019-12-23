<template>
  <div class="fillcontain">
    <Header></Header>
    <div class="edit-container">
      <quill-editor v-model="content" :options="editorOption" class="editor"></quill-editor>
    </div>
    <div class="submit-btn">
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      content: `<h3>请输入正文</h3>`,
      editorOption: {
      }
    };
  },
  methods: {
      onSubmit(){
          this.$message.success('提交成功!');
      }
  },
  components: {
    Header,
    quillEditor
  }
};
</script>

<style lang="less" scoped>
.edit-container {
  padding: 40px;
  .editor {
    height: 350px;
  }
}
.submit-btn {
  text-align: center;
  margin-top: 20px;
}
</style>