<template lang="pug">
  .header
    .filename {{$parent.title}}
    i.btn.iconfont.icon-preview(
      :class="{active: $parent.preview}"
      @click="$parent.preview = !$parent.preview")
    .publish-btn(@click="saveChartData") 发布
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
  methods: {
    saveChartData() {
      this.$parent.saveChartData();
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  background: #333333ee;
  padding: 0 20px;
}

.filename {
  flex: 1;
  text-align: center;
  font-size: 16px;
  color: #ffffff;
}

.btn {
  width: 32px;
  height: 32px;
  line-height: 32px;
  margin-right: 8px;
  text-align: center;
  border-radius: 18px;
  transition: all 0.3s ease;
  color: #aaa;
  &:hover {
    cursor: pointer;
    background-color: #666666;
    color: #ffffff;
  }
  .iconfont {
    font-size: 32px;
  }
  &.active {
    background-color: rgba(255, 255, 255, 0.1);
    color: #409EFF;
  }
}

.publish-btn {
  height: 36px;
  line-height: 36px;
  color: #ffffff;
  background: #353535;
  border-radius: 18px;
  padding: 0 18px;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background: #666666;
  }
}
</style>
