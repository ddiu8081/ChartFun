<template lang="pug">
  .config
    .public-config(v-show="!currentElement.w")
      .config-box
        .title 画布大小
        el-row(:gutter="20")
          el-col(:span="12")
            el-input.num-input(v-model.number="chartData.w")
              template(slot="prepend") w
          el-col(:span="12")
            el-input(v-model.number="chartData.h")
              template(slot="prepend") h
      .config-box
        .title 背景配置
        el-select(v-model="editorSettings.parentBg" placeholder="请选择" style="width: 100%")
          el-option(label="背景颜色" :value="0")
          el-option(label="背景图片" :value="1")
        el-row(:gutter="20" style="margin-top: 12px;" v-show="editorSettings.parentBg === 0")
          el-col(:span="4")
            el-color-picker(v-model="chartData.bgcolor")
          el-col(:span="20")
            el-input(v-model="chartData.bgcolor" readonly)
        el-row(:gutter="20" style="margin-top: 12px;" v-show="editorSettings.parentBg === 1")
          el-col(:span="24")
            el-upload(
              class="bg-uploader"
              action="http://localhost:3000/uploadfile/"
              :show-file-list="false"
              :on-success="handleScreenBgUploadSuccess"
              :before-upload="beforeUpload")
              .bg-preview-wrapper(v-if="chartData.bgimage")
                img.bg-preview(:src="chartData.bgimage")
              i.el-icon-plus.avatar-uploader-icon(v-else)
          el-col(:span="24" v-show="chartData.bgimage")
            el-select(v-model="chartData.bgimagesize" placeholder="请选择" style="width: 100%")
              el-option(label="覆盖" value="cover")
              el-option(label="平铺" value="contain")
              el-option(label="拉伸" value="100% 100%")
          el-col(:span="24" v-show="chartData.bgimage" style="margin-top: 16px")
            el-button(type="danger" plain @click="handleScreenBgDelete" style="width: 100%") 删除
    .component-config(v-show="currentElement.w")
      .panel-selector
        .radio-group
          .radio-btn(@click="thisKey='general'" :class="{active: thisKey=='general'}") 基础
          .radio-btn(@click="thisKey='data'" :class="{active: thisKey=='data'}") 数据
      .panel(v-show="thisKey=='general'")
        .config-box
          .title 控件名称
          el-input(v-model="currentElement.name")
        .config-box
          .title 组件位置
          el-row(:gutter="20")
            el-col(:span="12")
              el-input(v-model.number="currentElement.x")
                template(slot="prepend") x
            el-col(:span="12")
              el-input(v-model.number="currentElement.y")
                template(slot="prepend") y
          el-row(:gutter="20" style="margin-top: 4px;")
            el-col(:span="12")
              el-input(v-model.number="currentElement.w")
                template(slot="prepend") w
            el-col(:span="12")
              el-input(v-model.number="currentElement.h")
                template(slot="prepend") h
        .config-box
          .title 背景颜色
          el-row(:gutter="20")
            el-col(:span="4")
              el-color-picker(v-model="currentElement.bgcolor" show-alpha)
            el-col(:span="20")
              el-input(v-model="currentElement.bgcolor" readonly)
        .config-box
          .title Settings.json
          pre.code-box(v-html="formatedJSON")
      .panel(v-show="thisKey=='data'")
        .config-box
          .title 数据配置
          el-select(
            v-model="editorSettings.parentBg"
            placeholder="请选择"
            style="width: 100%; margin-bottom: 10px;")
            el-option(label="JSON" :value="0")
            el-option(label="我的数据源" :value="1")
            el-option(label="表格数据" :value="2")
            el-option(label="GET接口" :value="3")
          el-input(
            v-model="currentElement.data"
            type="textarea"
            :rows="10"
            placeholder="请插入标准 JSON 文件")
</template>

<script>
export default {
  data() {
    return {
      editorSettings: {
        parentBg: 0, // 0代表背景颜色，1代表背景图片
        parentBgUrl: '',
      },
      thisKey: 'general',
    };
  },
  computed: {
    chartData() {
      return this.$parent.chartData;
    },
    currentElement() {
      return this.$parent.currentElement;
    },
    formatedJSON() {
      return JSON.stringify(this.$parent.currentElement, null, 2);
    },
  },
  methods: {
    handleScreenBgUploadSuccess(res, file) {
      // console.log(res);
      this.chartData.bgimage = res.url;
      // console.log(file);
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeUpload(file) {
      const isPic = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt4M = file.size / 1024 / 1024 < 4;

      if (!isPic) {
        this.$message.error('图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt4M) {
        this.$message.error('图片大小不能超过 4MB!');
      }
      return isPic && isLt4M;
    },
    handleScreenBgDelete() {
      this.chartData.bgimage = '';
    }
  },
};
</script>

<style lang="scss" scoped>
.config, .component-config {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background: #ffffffe9;
  color: #515151;
  box-shadow: -4px 0 4px #00000005;
  padding: 0;
  overflow: hidden;
}

.public-config, .component-config .panel {
  flex: 1;
  overflow-y: scroll;
}

.panel-selector {
  z-index: 100;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.06);
  .radio-group {
    text-align: center;
    .radio-btn {
      display: inline-block;
      padding: 10px 20px;
      margin: 0 10px;
      color: #999999;
      &.active {
        color: #212121;
        border-bottom: 2px solid #212121;
      }
    }
  }
}

.config-box {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  margin: 0;
  padding: 14px 20px;
  .title {
    font-weight: bold;
    font-size: 0.86rem;
    margin-bottom: 12px;
  }
}

.num-input {
  .el-input-group__prepend {
    background-color: #ffffff !important;
  }
}

.code-box {
  width: 260px;
  max-height: 200px;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  padding: 6px;
  overflow: scroll;
  box-sizing: border-box;
}

// image upload
.bg-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  width: 260px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.bg-uploader /deep/ .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.bg-preview-wrapper {
  width: 100%;
  height: 150px;
  .bg-preview {
    max-width: 100%;
    height: 100%;
    margin: 0 auto;
  }
}
</style>
