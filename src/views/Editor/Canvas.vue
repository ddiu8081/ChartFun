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
          :parentW="1920"
          :parentH="1080"
          :aspectRatio="false"
          :minw="20"
          :minh="20"
          :z="chartData.elements.length - index"
          :isDraggable="true"
          :isResizable="true"
          @activated="handleActivated(index)"
          @resizing="handleResize(item, arguments[0])"
          @dragging="handleDrag(item, arguments[0])")
          div.filler(style="width:100%;height:100%;background:#666;")
            ve-chart(
              :width="item.w + 'px'"
              :height="item.h + 'px'"
              :data="item.data.data" 
              :settings="item.data.settings")
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
      chartD: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 },
        ]
      },
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
