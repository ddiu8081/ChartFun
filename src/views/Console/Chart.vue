<template lang="pug">
  div
    // .page-header-slot
    //   el-button(type="primary" icon="el-icon-plus" round) 新建
    //   el-input.search(placeholder="搜索名称" prefix-icon="el-icon-search" v-model="filter")
    el-row(:gutter="36")
      el-col(:span="6" v-for="item in chartData")
        el-card(:body-style="{ padding: '0px' }" shadow="hover" @click.native="editThis('123456')")
          img.image(src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png")
          div(style="padding: 14px;")
            span {{item.title}}
      el-col(:span="6")
        el-card(:body-style="{ padding: '0px' }" shadow="hover")
          .add-card
            i.el-icon-circle-plus
</template>

<script>
export default {
  data() {
    return {
      chartData: [],
      filter: '',
    };
  },
  mounted() {
    this.$http.get('charts', {
      params: {
        ID: 12345,
      },
    })
      .then((res) => {
        const { errno, data } = res.data;
        if (errno === 0) {
          console.log(data);
          this.chartData = data.chartList;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    editThis(path) {
      this.$router.push(`/edit/${path}`);
    },
  },
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

  &:hover {
    cursor: pointer;
  }
}

.image {
  width: 100%;
  display: block;
}

.el-card .add-card {
  height: 200px;
  line-height: 200px;
  text-align: center;
  font-size: 82px;
  color: rgba(0, 0, 0, 0.08);
}
</style>
