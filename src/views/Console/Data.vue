<template lang="pug">
  div
    el-row(style="margin-bottom: 20px;")
      el-button(type="primary" @click="addData") 新增数据源
    el-table(:data="connectList")
      el-table-column(prop="_id" label="id")
        template(slot-scope="scope")
          span {{ scope.row._id | simplifyID }}
      el-table-column(prop="name" label="名称")
      el-table-column(prop="createdAt" label="上传时间")
        template(slot-scope="scope")
          span {{ $dayjs(scope.row.createdAt).format('YYYY-MM-DD HH:mm') }}
      el-table-column(label="操作")
        template(slot-scope="scope")
          el-button(type="text" size="small" @click="renameData(scope.row)") 重命名
          el-button(type="text" size="small" @click="deleteData(scope.row._id)") 删除
</template>

<script>
/* eslint-disable */
export default {
  props: ['user'],
  data() {
    return {
      connectList: [],
    };
  },
  mounted() {
    this.getData();
  },
  filters: {
    simplifyID(id) {
      return id.slice(-6);
    }
  },
  methods: {
    getData() {
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
    addData() {
      this.$router.push('data/add');
    },
    renameData(row) {
      this.$prompt('输入大屏标题', '重命名', {
        inputValue: row.name,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          this.$http
            .put(`/connect/${row._id}`, {
              name: value
            })
            .then(res => {
              const { errno, data } = res.data;
              if (errno === 0) {
                this.$message({
                  type: 'success',
                  message: '保存成功'
                });
                setTimeout(() => {
                  this.getData();
                }, 100);
                // this.editChart(data._id);
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    deleteData(id) {
      this.$confirm('是否删除当前数据源？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http
          .delete(`/connect/${id}`)
          .then(res => {
            const { errno, data } = res.data;
            if (errno === 0) {
              this.$message({
                type: "success",
                message: "已删除"
              });
              setTimeout(() => {
                this.getData();
              }, 100);
              // this.editChart(data._id);
            }
          });
      }).catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
