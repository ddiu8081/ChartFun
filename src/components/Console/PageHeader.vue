<template lang="pug">
  .header
    .page-title
      span {{pageTitle}}
    .icon-row
      el-badge.icon.item(is-dot :hidden="true")
        i.el-icon-bell
    .avatar-image
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    pageTitle() {
      return this.$route.meta.title;
    },
  },
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
  }
}
</style>
