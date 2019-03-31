<template lang="pug">
  .sidebar
    .logo
      router-link(to="/") ChartFun
    router-link.sidebar-item(
      v-for="item in menuList"
      :key="item.name"
      :class="{ active: routePath == item.path }"
      :to="item.path")
      i(:class="item.icon")
      span {{item.name}}
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        {
          name: '数据管理',
          icon: 'el-icon-menu',
          path: '/console/data',
        }, {
          name: '我的可视化',
          icon: 'el-icon-document',
          path: '/console/chart',
        },
      ],
    };
  },
  computed: {
    routePath() {
      return this.$route.path;
    },
  },
  mounted() {
    // this.routePath = this.$route.path;
  },
  methods: {
    goPath(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 240px;
  background: #f7f9fa;
  z-index: 20;

  .logo {
    height: 120px;
    line-height: 120px;
    text-align: center;
    font-weight: bold;
    font-size: 22px;

    &::after {
      content: ".";
      font-size: 28px;
      color: rgba(255, 0, 0, 0.6);
    }

    a {
      color: #515151;
      text-decoration: none;
    }
  }

  .sidebar-item {
    display: flex;
    align-items: center;
    height: 36px;
    margin: 8px 48px 8px 24px;
    padding: 0 16px;
    font-size: 14px;
    color: #808080;
    border-radius: 8px;
    text-decoration: none;

    &.active {
      color: #222222;
      background: rgba(0, 0, 0, 0.06);
    }

    i {
      font-size: 16px;
      margin-right: 8px;
    }

    &:hover {
      color: #333;
    }
  }
}
</style>
