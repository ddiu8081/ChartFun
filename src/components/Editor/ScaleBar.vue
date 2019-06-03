<template lang="pug">
  .panel
    // .canvas-view
      vue-draggable-resizable(
        :w="100"
        :h="80"
        :parent="true"
        class-name="canvas-box"
        class-name-dragging="canvas-box-dragging"
        :resizable="false")
    .control-bar
      i.btn.el-icon-minus(@click="zoomOut")
      .scale-mount {{scale * 100}}%
      i.btn.el-icon-plus(@click="zoomIn")
</template>

<script>
export default {
  data() {
    return {
      scale: 0.7,
    };
  },
  watch: {
    scale() {
      this.$emit('update:scale', this.scale);
    },
  },
  methods: {
    zoomOut() {
      if (this.scale > 0.1) {
        this.scale = parseFloat((this.scale - 0.1).toFixed(1));
      }
    },
    zoomIn() {
      if (this.scale < 1) {
        this.scale = parseFloat((this.scale + 0.1).toFixed(1));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.panel {
  width: 130px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  background: #ffffffe9;
  border: 1px solid #cccccc;
}

.control-bar {
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  height: 32px;
  color: #666666;
  padding: 0 6px;

  .btn {
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    font-size: 12px;
    transition: all 0.3s ease;

    &:hover {
      cursor: pointer;
      background-color: #dddddd;
      color: #333333;
    }
  }

  .scale-mount {
    flex: 1;
    font-size: 14px;
  }
}

.canvas-view {
  position: relative;
  background: #1e1e1ee9;
  width: 144px;
  margin: 6px 8px;
  height: 120px;
}

.canvas-box {
  background: rgba(255, 255, 255, 0.08);
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
}

.canvas-box-dragging, .canvas-box-dragging:hover {
  background: rgba(255, 255, 255, 0.16);
}
</style>
