<template lang="pug">
  .edit-view
    .screen
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.edit-view {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: visible;
}

.screen {
  position: absolute;
  width: 1220px;
  height: 400px;
  background: #999;
  transition: all 0.3s ease;
  transform: scale(0.7);
  transform-origin: 0 0;
  left: 0;
  top: 0;
  margin: 100px;
  // zoom: 0.5;
  // box-sizing: border-box;
  box-shadow: 0 0 40px #333;
}
</style>
