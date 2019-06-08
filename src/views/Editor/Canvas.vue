<template lang="pug">
  .edit-view(
    tabindex="0"
    @keydown.space.prevent="handleSpaceDown"
    @keyup.space.prevent="handleSpaceUp"
    @click.self="handleActivated(-1)")
    vue-draggable-resizable(
        :style="wrapStyle"
        :x="100"
        :y="50"
        :w="chartData.w"
        :h="chartData.h"
        class-name="screen-box"
        class-name-draggable="screen-box-draggable"
        :draggable="screenDraggable"
        :resizable="false")
      .screen(:style="screenStyle" @click.self="handleActivated(-1)")
        vue-drag-resize(
          v-for="(item, index) in chartData.elements"
          :key="index"
          :isActive="item.active"
          :parentScaleX="scale"
          :parentScaleY="scale"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :parentLimitation="true"
          :parentW="chartData.w"
          :parentH="chartData.h"
          :aspectRatio="false"
          :minw="20"
          :minh="20"
          :z="chartData.elements.length - index"
          :isDraggable="true"
          :isResizable="true"
          @activated="handleActivated(index)"
          @resizing="handleResize(item, arguments[0])"
          @dragging="handleDrag(item, arguments[0])")
          div.filler(:style="{width: '100%', height: '100%', backgroundColor: item.bgcolor}")
            ve-chart(
              :width="item.w + 'px'"
              :height="item.h + 'px'"
              :data="item.data.generated"
              :settings="item.data.settings"
              @ready-once="generateData(item)")
        .mock(:class="{front: screenDraggable}")
</template>

<script>
/* eslint-disable */
export default {
  props: ['scale'],
  data() {
    return {
      screenDraggable: false,
    };
  },
  computed: {
    chartData() {
      return this.$parent.chartData;
    },
    wrapStyle() {
      return {
        transform: `scale(${this.scale})`,
      };
    },
    screenStyle() {
      return {
        backgroundColor: this.chartData.bgcolor,
        backgroundImage: `url(${this.chartData.bgimage})`,
        backgroundSize: this.chartData.bgimagesize,
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
    handleActivated(index) {
      this.$parent.setActiveComponentByIndex(index);
    },
    handleResize(widget, arg) {
      const item = widget;
      item.x = arg.left;
      item.y = arg.top;
      item.w = arg.width;
      item.h = arg.height;
    },
    handleDrag(widget, arg) {
      const item = widget;
      item.x = arg.left;
      item.y = arg.top;
    },
    generateData(item) {
      this.$parent.generateData(item);
    }
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
  position: relative;
  background: #ffffff;
  transform-origin: 0 0;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.2);
  transition: transform 0.5s ease;

  &.screen-box-draggable {
    cursor: grab;
  }
}

.screen {
  position: relative;
  width: 100%;
  height: 100%;
  .vdr {
    border: 0;
  }
}

.mock {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  z-index: -1;

  &.front {
    z-index: 999;
  }
}
</style>
