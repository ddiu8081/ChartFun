<template lang="pug">
  div
    el-table(:data="tableData")
      el-table-column(prop="date" label="日期")
      el-table-column(prop="name" label="姓名")
      el-table-column(prop="address" label="地址")
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
