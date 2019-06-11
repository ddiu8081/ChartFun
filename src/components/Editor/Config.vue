<template lang="pug">
  .config
    .public-config(v-if="!currentElement.w")
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
              action="http://localhost:3000/api/uploadfile/"
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
    .component-config(v-if="currentElement.w")
      .panel-selector
        .radio-group
          .radio-btn(
            @click="thisKey='general'"
            :class="{active: thisKey=='general'}") 基础
          .radio-btn(
            @click="thisKey='data'"
            v-show="currentElement.data.type == 'chart'"
            :class="{active: thisKey=='data'}") 数据
          .radio-btn(
            @click="thisKey='data'"
            v-show="currentElement.data.type == 'text'"
            :class="{active: thisKey=='data'}") 文字
          .radio-btn(
            @click="thisKey='data'"
            v-show="currentElement.data.type == 'image'"
            :class="{active: thisKey=='data'}") 图片
          .radio-btn(
            @click="thisKey='data'"
            v-show="currentElement.data.type == 'border'"
            :class="{active: thisKey=='data'}") 边框
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
      .panel(v-show="thisKey=='data' && currentElement.data.type == 'chart'")
        .config-box
          .title 数据配置
          el-select(
            v-model="currentElement.data.datacon.type"
            placeholder="请选择"
            @change="handleChartDataChange"
            style="width: 100%; margin-bottom: 10px;")
            el-option(label="静态JSON" value="raw")
            el-option(label="我的数据源" value="connect")
            //- el-option(label="表格数据" value="table")
            el-option(label="GET接口" value="get")
          //- el-input(
            v-model="currentElement.data.datacon.data"
            type="textarea"
            :rows="10"
            placeholder="请插入标准 JSON 文件"
            v-show="currentElement.data.datacon.type == 'raw'")
          vue-json-editor(
            v-if="currentElement.data.datacon.type == 'raw'"
            v-model="currentElement.data.datacon.data"
            mode="code"
            :show-btns="true"
            @json-save="handleChartDataChange")
          el-select(
            v-if="currentElement.data.datacon.type == 'connect'"
            v-model="currentElement.data.datacon.connectId"
            placeholder="请选择"
            @change="handleChartDataChange"
            style="width: 100%; margin-bottom: 10px;")
            el-option(v-for="item in connectList" :label="item.name" :value="item._id")
          el-input(
            v-if="currentElement.data.datacon.type == 'get'"
            v-model="currentElement.data.datacon.getUrl"
            type="textarea"
            :rows="5"
            style="margin-bottom: 10px;")
          el-row(v-if="currentElement.data.datacon.type == 'get'")
            el-col(:span="8")
              p(style="margin-top: 8px;") 刷新时间
            el-col(:span="16")
              el-input-number(
                v-model="currentElement.data.datacon.interval"
                :min="1"
                :max="10"
                @change="handleChartDataChange"
                style="width: 100%;")
      .panel(v-show="thisKey=='data' && currentElement.data.type == 'text'")
        .config-box
          .title 输入文本
          el-input(
            v-model="currentElement.data.datacon.text"
            type="textarea"
            :rows="5"
            style="margin-bottom: 10px;")
        .config-box
          .title 字体字号
          el-select(
            v-model="currentElement.data.datacon.fontFamily"
            placeholder="请选择"
            style="width: 100%; margin-bottom: 10px;")
            el-option-group(label="英文字体")
              el-option(label="Molengo" value="Molengo")
                span(:style="{fontFamily: 'Molengo'}") Molengo
              el-option(label="Lobster" value="Lobster")
                span(:style="{fontFamily: 'Lobster'}") Lobster
            el-option-group(label="中文字体")
              el-option(label="思源黑体" value="Noto Sans SC")
                span(:style="{fontFamily: 'Noto Sans SC'}") 思源黑体
              el-option(label="思源宋体" value="Noto Serif SC")
                span(:style="{fontFamily: 'Noto Serif SC'}") 思源宋体
              el-option(label="站酷庆科黄油体" value="ZCOOL QingKe HuangYou")
                span(:style="{fontFamily: 'ZCOOL QingKe HuangYou'}") 站酷庆科黄油体
              el-option(label="站酷小薇体" value="ZCOOL XiaoWei")
                span(:style="{fontFamily: 'ZCOOL XiaoWei'}") 站酷小薇体
          el-row(:gutter="20")
            el-col(:span="4")
              el-color-picker(v-model="currentElement.data.datacon.color" show-alpha)
            el-col(:span="20")
              el-input(v-model="currentElement.data.datacon.fontSize")
                template(slot="append") px
          el-row(:gutter="20")
            el-col(:span="24")
              .btn(:class="{active: currentElement.data.datacon.bold}" @click="currentElement.data.datacon.bold = !currentElement.data.datacon.bold")
                i.iconfont.icon-bold
              .btn(:class="{active: currentElement.data.datacon.italic}" @click="currentElement.data.datacon.italic = !currentElement.data.datacon.italic")
                i.iconfont.icon-italic
        .config-box
          .title 描边
            el-switch(v-model="currentElement.data.datacon.stroke" style="float: right;")
          el-row(:gutter="20" v-show="currentElement.data.datacon.stroke")
            el-col(:span="4")
              el-color-picker(v-model="currentElement.data.datacon.strokeColor")
            el-col(:span="20")
              el-input(v-model="currentElement.data.datacon.strokeSize")
                template(slot="append") px
        .config-box
          .title 阴影
            el-switch(v-model="currentElement.data.datacon.shadow" style="float: right;")
          el-row(:gutter="20" v-show="currentElement.data.datacon.shadow")
            el-col(:span="4")
              el-color-picker(v-model="currentElement.data.datacon.shadowColor")
            el-col(:span="20")
              el-input(v-model="currentElement.data.datacon.shadowBlur")
                template(slot="append") px
      .panel(v-show="thisKey=='data' && currentElement.data.type == 'image'")
        .config-box
          .title 上传图片
          el-upload(
            class="bg-uploader"
            action="http://localhost:3000/api/uploadfile/"
            :show-file-list="false"
            :on-success="handleImageUploadSuccess"
            :before-upload="beforeUpload")
            .bg-preview-wrapper(v-if="this.currentElement.data.datacon.img")
              img.bg-preview(:src="this.currentElement.data.datacon.img")
            i.el-icon-plus.avatar-uploader-icon(v-else)
          el-row
            el-col(:span="24" v-show="this.currentElement.data.datacon.img")
              el-select(v-model="currentElement.data.datacon.imgSize" placeholder="请选择" style="width: 100%")
                el-option(label="覆盖" value="cover")
                el-option(label="平铺" value="contain")
                el-option(label="拉伸" value="100% 100%")
        .config-box
          .title 透明度
          el-slider(v-model="currentElement.data.datacon.opacity" :max="1" :step="0.01" show-input)
      .panel(v-show="thisKey=='data' && currentElement.data.type == 'border'")
        .config-box
          .title 边框样式
          el-select(
            v-model="currentElement.data.datacon.borderId"
            placeholder="请选择"
            style="width: 100%; margin-bottom: 10px;")
            el-option(label="古典-棕" :value="1")
            el-option(label="古典-白" :value="2")
            el-option(label="科技" :value="3")
        .config-box
          .title 透明度
          el-slider(v-model="currentElement.data.datacon.opacity" :max="1" :step="0.01" show-input)
</template>

<script>
/* eslint-disable */
import vueJsonEditor from 'vue-json-editor'

export default {
  components: {
    vueJsonEditor
  },
  data() {
    return {
      user: {
        uid: localStorage.getItem('uid'),
        username: localStorage.getItem('user'),
      },
      editorSettings: {
        parentBg: 0, // 0代表背景颜色，1代表背景图片
        parentBgUrl: '',
      },
      thisKey: 'general',
      connectList: [],
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
  mounted() {
    this.$http
      .get('/connect?uid=' + this.user.uid)
      .then(res => {
        const { errno, data } = res.data;
        if (errno === 0) {
          this.connectList = data.connectList;
        }
      })
      .catch(() => {});
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
    },
    handleChartDataChange() {
      this.$parent.generateData(this.currentElement);
    },
    handleImageUploadSuccess(res, file) {
      // console.log(res);
      this.currentElement.data.datacon.img = res.url;
      // console.log(file);
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
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
  .btn {
    display: inline-block;
    width: 32px;
    height: 32px;
    line-height: 32px;
    margin: 5px 5px 5px 0;
    text-align: center;
    border-radius: 8px;
    transition: all 0.3s ease;
    color: #999;
    &:hover {
      cursor: pointer;
      background-color: rgba(64, 160, 255, 0.1);
      color: #666666;
    }
    &.active {
      background-color: rgba(64, 160, 255, 0.1);
      color: #409EFF;
    }
    .iconfont {
      font-size: 22px;
    }
  }
}

.component-config /deep/ .jsoneditor-menu {
  display: none;
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
