<template lang="pug">
  .config
    p {{chartData.elements[$parent.currentElementIndex]}}
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    chartData() {
      return this.$parent.chartData;
    },
  },
};
</script>

<style lang="scss" scoped>
.config {
  height: 100%;
  display: flex;
  align-items: center;
  background: #1e1e1ee9;
  color: #ffffff;
}
</style>
