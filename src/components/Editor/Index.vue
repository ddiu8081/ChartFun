<template lang="pug">
  .editor-view
    .topbar-view
      Topbar
    .toolbar-view
      Toolbar
    .config-view
      Config
    .scale-view
      ScaleBar
    .main-view
      router-view
</template>

<script>
import Topbar from './Topbar.vue';
import Toolbar from './Toolbar.vue';
import Config from './Config.vue';
import ScaleBar from './ScaleBar.vue';

export default {
  components: {
    Topbar,
    Toolbar,
    Config,
    ScaleBar,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.editor-view {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.topbar-view {
  position: absolute;
  height: 60px;
  width: 100vw;
  z-index: 1000;
}

.toolbar-view {
  position: absolute;
  top: 60px;
  width: 50px;
  bottom: 0;
  z-index: 1000;
}

.config-view {
  position: absolute;
  right: 0;
  top: 60px;
  width: 300px;
  bottom: 0;
  z-index: 1000;
}

.scale-view {
  position: absolute;
  right: 320px;
  bottom: 20px;
  z-index: 1000;
}

.main-view {
  background: #333333;
  padding: 60px 300px 0 50px;
  overflow: scroll;
  height: calc(100vh - 60px);
}
</style>
