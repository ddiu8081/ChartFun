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
        class-name-draggable="screen-box-draggable"
        :draggable="screenDraggable"
        :resizable="false")
      .screen
        vue-drag-resize(
          v-for="item in chartData.elements"
          :key="item.name"
          :isActive="true"
          :preventActiveBehavior="true"
          :parentScaleX="scale"
          :parentScaleY="scale"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :parentLimitation="true"
          :parentW="1920"
          :parentH="1080"
          :aspectRatio="false"
          :minw="20"
          :minh="20"
          :z="100"
          :isDraggable="true"
          :isResizable="true"
          @resizing="handleResize(item, arguments)"
          @dragging="handleDrag(item, arguments)")
</template>

<script>
export default {
  props: ['scale'],
  data() {
    return {
      screenDraggable: false,
      elements: [
        {
          name: 'keykey1',
          x: 10,
          y: 100,
          w: 192,
          h: 108,
        },
      ],
    };
  },
  computed: {
    chartData() {
      return this.$parent.chartData;
    },
    screenStyle() {
      return {
        transform: `scale(${this.scale})`,
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
    handleResize(widget, args) {
      const item = widget;
      item.x = args[0].left;
      item.y = args[0].top;
      item.w = args[0].width;
      item.h = args[0].height;
    },
    handleDrag(widget, args) {
      const item = widget;
      item.x = args[0].left;
      item.y = args[0].top;
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
  transition: transform 0.5s ease;

  &.screen-box-draggable {
    cursor: grab;
  }
}

.screen {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
