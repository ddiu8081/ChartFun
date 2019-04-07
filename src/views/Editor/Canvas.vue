<template lang="pug">
  .edit-view(
    tabindex="0"
    @keydown.space.prevent="handleSpaceDown"
    @keyup.space.prevent="handleSpaceUp")
    vue-draggable-resizable(
        :style="screenStyle"
        :w="1920"
        :h="1080"
        class-name="screen-box"
        class-name-dragging="canvas-box-dragging"
        :draggable="screenDraggable"
        :resizable="false")
</template>

<script>
export default {
  props: ['scale'],
  data() {
    return {
      screenDraggable: false,
    };
  },
  computed: {
    screenStyle() {
      return {
        transform: `scale(${this.scale / 100})`,
      };
    },
  },
  methods: {
    handleSpaceDown() {
      this.screenDraggable = true;
    },
    handleSpaceUp() {
      this.screenDraggable = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-view {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: visible;
  outline: 0;
}

.screen-box {
  // width: 1220px;
  // height: 400px;
  background: #999;
  transform-origin: 0 0;
  box-shadow: 0 0 40px #111;
}

.screen {
  position: absolute;
  width: 1220px;
  height: 400px;
  background: #999;
  // transition: all 0.3s ease;
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
