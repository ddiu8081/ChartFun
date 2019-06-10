<template lang="pug">
  el-container
    el-aside(width="240px")
      NavMenu
    el-container
      el-header(height="96px")
        PageHeader
      el-main
        router-view(:user="user")
</template>

<script>
import NavMenu from './NavMenu.vue';
import PageHeader from './PageHeader.vue';

export default {
  data() {
    return {
      user: {
        uid: localStorage.getItem('uid'),
        username: localStorage.getItem('user'),
      },
    };
  },
  components: {
    NavMenu,
    PageHeader,
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  position: fixed;
  left: 240px;
  right: 0;
  padding: 0;
  z-index: 10;
  background: rgba(255, 255, 255, 0.94);
  // box-shadow: 0 0 2px #eee;
}

.el-main {
  padding: 106px 40px 0;
}
</style>
