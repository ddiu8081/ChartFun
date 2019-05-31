<template lang="pug">
  .component-config(v-show="this.$parent.currentElement")
    el-form(ref="form" :model="currentElement" label-width="70px")
      .config-box
        .title 控件名称
        el-input(v-model="currentElement.name")
      .config-box
        .title 组件位置
        el-row(:gutter="20")
          el-col(:span="12")
            el-input.num-input(v-model.number="currentElement.x")
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
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    currentElement() {
      return this.$parent.currentElement;
    },
    formatedJSON() {
      return JSON.stringify(this.$parent.currentElement, null, 2);
    },
  },
};
</script>

<style lang="scss" scoped>
.component-config {
  position: absolute;
  top: 0;
  bottom: 0;
  background: #ffffffe9;
  color: #515151;
  box-shadow: -4px 0 4px #00000005;
  padding: 0;
  overflow-y: scroll;
}

.el-form-item {
  margin-bottom: 14px;
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
</style>
