<template lang="pug">
  div
    el-row(style="margin-bottom: 20px;")
      el-button(type="primary" @click="addData") 新增数据源
    el-table(:data="tableData")
      el-table-column(prop="id" label="id")
      el-table-column(prop="name" label="名称")
      el-table-column(prop="date" label="上传时间")
      el-table-column(label="操作")
        template(slot-scope="scope")
          el-button(type="text" size="small") 删除
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '某电商平台第一季度营业额',
          date: '2019-05-02',
        },
        {
          id: 2,
          name: '某电商平台第二季度营业额',
          date: '2019-05-03',
        },
        {
          id: 3,
          name: '某学校101班学生成绩',
          date: '2019-05-10',
        },
      ],
    };
  },
  methods: {
    addData() {
      this.$router.push('data/add');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
