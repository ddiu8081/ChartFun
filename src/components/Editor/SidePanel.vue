<template lang="pug">
  .panel
    .title 图表
    .component-list
      .list-item 条形图
      .list-item 条形图
      .list-item 条形图
      .list-item 条形图
      .list-item 条形图
      .list-item 条形图
      .list-item 条形图
      .list-item 条形图
      .list-item 条形图
      .list-item 条形图
      .list-item 条形图
      .list-item 条形图
      .list-item 条形图
      .list-item 条形图
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.panel {
  height: 100%;
  width: 250px;
  display: flex;
  flex-direction: column;
  background: #1e1e1ee9;
}
.title {
  color: #999999;
  padding: 10px 16px 16px;
}
.component-list {
  flex: 1;
  padding: 0 10px 0 16px;
  overflow: scroll;

  .list-item {
    display: inline-block;
    width: 100px;
    height: 80px;
    background: #999999;
    margin-right: 12px;
    margin-bottom: 12px;
  }
}
</style>
