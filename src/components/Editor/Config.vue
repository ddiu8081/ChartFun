<template lang="pug">
  .component-config(v-show="this.$parent.currentElement")
    el-form(ref="form" :model="currentElement" label-width="70px")
      el-form-item(label="控件名称")
        el-input(v-model="currentElement.name")
      el-row(:gutter="20")
        el-col(:span="12")
          el-input(v-model.number="currentElement.x")
            template(slot="prepend") x
        el-col(:span="12")
          el-input(v-model.number="currentElement.y")
            template(slot="prepend") y
      el-row(:gutter="20")
        el-col(:span="12")
          el-input(v-model.number="currentElement.w")
            template(slot="prepend") w
        el-col(:span="12")
          el-input(v-model.number="currentElement.h")
            template(slot="prepend") h
    p {{currentElement}}
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
  },
};
</script>

<style lang="scss" scoped>
.component-config {
  height: 100%;
  background: #ffffffe9;
  color: #515151;
  box-shadow: -4px 0 4px #00000005;
  padding: 20px 20px;
}
</style>
