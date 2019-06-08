<template lang="pug">
  div
    el-row(:gutter="36")
      el-col(:span="6" v-for="item in chartList" :key="item._id")
        el-card(:body-style="{ padding: '0px' }" shadow="hover" @click.native="editChart(item._id)")
          img.image(:src="item.img")
          div(style="padding: 14px;")
            span {{item.title}}
            el-dropdown(style="float: right;")
              i.el-icon-more
              el-dropdown-menu(slot="dropdown")
                el-dropdown-item(@click.native="editChart(item._id)") 编辑
                el-dropdown-item(@click.native="renameChart(item)") 重命名
                el-dropdown-item(@click.native="deleteChart(item._id)") 删除
                el-dropdown-item(@click.native="editChart(item._id)" divided) 查看统计
      el-col(:span="6")
        el-card(:body-style="{ padding: '0px' }" shadow="hover" @click.native="addNewChart")
          .add-card
            i.el-icon-circle-plus
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      chartList: [],
      filter: ""
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http
        .get("/chart")
        .then(res => {
          const { errno, data } = res.data;
          if (errno === 0) {
            this.chartList = data.chartList;
          }
        })
        .catch(() => {});
    },
    editChart(id) {
      this.$router.push(`/edit/${id}`);
    },
    addNewChart() {
      this.$prompt('输入大屏标题', '创建大屏项目', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          this.$http
            .post('/chart', {
              title: value
            })
            .then(res => {
              const { errno, data } = res.data;
              if (errno === 0) {
                this.$message({
                  type: 'success',
                  message: '创建成功'
                });
                // this.getData();
                this.editChart(data._id);
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    renameChart(row) {
      this.$prompt('输入大屏标题', '重命名', {
        inputValue: row.title,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          this.$http
            .put(`/chart/${row._id}`, {
              name: value
            })
            .then(res => {
              const { errno, data } = res.data;
              if (errno === 0) {
                this.$message({
                  type: 'success',
                  message: '保存成功'
                });
                this.getData();
                // this.editChart(data._id);
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    deleteChart(id) {
      this.$confirm('是否删除大屏项目？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http
          .delete(`/chart/${id}`)
          .then(res => {
            const { errno, data } = res.data;
            if (errno === 0) {
              this.$message({
                type: "success",
                message: "已删除"
              });
              this.getData();
              // this.editChart(data._id);
            }
          });
      }).catch(() => {});
    },
  }
};
</script>

<style lang="scss" scoped>
.page-header-slot {
  position: fixed;
  top: 56px;
  left: 240px;
  right: 0;
  padding: 0 40px 20px;
  z-index: 8;
  background-color: rgba(255, 255, 255, 0.94);

  .search {
    width: 240px;
    float: right;
  }
}

.el-card {
  margin-bottom: 36px;

  .image {
    width: 100%;
    height: 150px;
    display: block;
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  &:hover {
    cursor: pointer;
    .image {
      opacity: 0.8;
    }
  }
}

.el-card .add-card {
  height: 200px;
  line-height: 200px;
  text-align: center;
  font-size: 82px;
  color: rgba(0, 0, 0, 0.08);
}
</style>
