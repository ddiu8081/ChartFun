<template lang="pug">
  .editor-view
    .topbar-view
      Topbar
    .toolbar-view
      Toolbar
    .config-view
      Config
    .scale-view
      ScaleBar(@update:scale="changeScale")
    .main-view
      router-view(:scale="scale")
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
    return {
      title: '',
      scale: 0.5,
      chartData: {
        elements: [],
      },
      currentElementIndex: 1,
    };
  },
  mounted() {
    this.$http.get('/charts/1234')
      .then((res) => {
        const { errno, data } = res.data;
        if (errno === 0) {
          this.title = data.title;
          this.chartData = data.chartData;
        }
      })
      .catch(() => {});
  },
  methods: {
    changeScale(scale) {
      this.scale = scale;
    },
    setActiveComponentByIndex(index) {
      this.currentElementIndex = index;
      for (let i = 0; i < this.chartData.elements.length; i++) {
        const element = this.chartData.elements[i];
        if (index === i) {
          element.active = true;
        } else {
          element.active = false;
        }
      }
    }
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
  right: 316px;
  bottom: 16px;
  z-index: 1000;
}

.main-view {
  background: #1e1e1e;
  padding: 60px 300px 0 50px;
  overflow: hidden;
  height: calc(100vh - 60px);
}
</style>
