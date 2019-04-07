<template lang="pug">
  .panel
    vue-draggable-resizable(:w="100" :h="100" :parent="true" class-name="canvas-box")
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.panel {
  height: 140px;
  width: 160px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background: #1e1e1ee9;
}

.canvas-box {
  background: rgba(255, 255, 255, 0.1);
}
</style>
