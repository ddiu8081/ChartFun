<template lang="pug">
  .header
    .page-title
      span {{pageTitle}}
    .icon-row
      //- el-badge.icon.item(is-dot :hidden="true")
        i.el-icon-bell
    el-dropdown
      .avatar-image
      el-dropdown-menu(slot="dropdown")
        el-dropdown-item(disabled) {{ user.username }}
        el-dropdown-item(divided @click.native="logout") 退出
</template>

<script>
export default {
  data() {
    return {
      user: {
        uid: localStorage.getItem('uid'),
        username: localStorage.getItem('user'),
      },
    };
  },
  computed: {
    pageTitle() {
      return this.$route.meta.title;
    },
  },
  mounted() {
    if (!this.user.uid) {
      this.logout();
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('uid');
      localStorage.removeItem('user');
      this.$router.push('/');
    },
  }
};
</script>

<style lang="scss" scoped>
.header {
  padding: 40px 40px 0;
  display: flex;
  align-items: center;

  .page-title {
    flex: 1;
    font-size: 20px;
    font-weight: normal;
  }

  .icon {
    display: inline-block;
    font-size: 20px;
    margin-right: 14px;

    &:last-of-type {
      margin-right: 28px;
    }
  }

  .avatar-image {
    width: 32px;
    height: 32px;
    background: #ccc;
    border-radius: 50%;
    background-image: url('../../assets/img/profile.jpg');
    background-size: 32px;
  }
}
</style>
