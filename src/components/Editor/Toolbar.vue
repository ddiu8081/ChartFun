<template lang="pug">
  .toolbar
    .toolbox
      .tool-list
        .btn(@click="showPanel('chart')")
          i.iconfont.icon-chart
        .btn(@click="showPanel('text')")
          i.iconfont.icon-text
        .btn(@click="showPanel('picture')")
          i.iconfont.icon-picture
        .btn(@click="showPanel('tools')")
          i.iconfont.icon-tools
      .layer-btn.btn(@click="showPanel('chart')")
        i.iconfont.icon-layer
    .collapse-panel(v-show="panelKey")
      SidePanel(:panelKey="panelKey")
</template>

<script>
import SidePanel from './SidePanel.vue';

export default {
  components: {
    SidePanel,
  },
  data() {
    return {
      panelKey: '',
      showCollapsePanel: false,
    };
  },
  methods: {
    showPanel(key) {
      if (this.panelKey == key) {
        this.panelKey = '';
      } else {
        this.panelKey = key;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  height: 100%;
}

.toolbox {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #1e1e1ee9;

  .tool-list {
    flex: 1;
  }

  .btn {
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin: 5px;
    text-align: center;
    border-radius: 8px;
    transition: all 0.3s ease;
    color: #999;
    &:hover {
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }
    .iconfont {
      font-size: 24px;
    }
  }
}

.collapse-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50px;
  width: 250px;
  z-index: 10;
}
</style>
