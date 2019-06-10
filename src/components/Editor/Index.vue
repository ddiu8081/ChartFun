<template lang="pug">
  .editor-view
    .topbar-view
      Topbar
    .toolbar-view(v-show="!preview")
      Toolbar
    .config-view(v-show="!preview")
      Config
    .scale-view(:class="{preview: preview}")
      ScaleBar(@update:scale="changeScale")
    .main-view
      router-view(:scale="scale" ref="screenContainer")
</template>

<script>
/* eslint-disable */
import Topbar from './Topbar.vue';
import Toolbar from './Toolbar.vue';
import Config from './Config.vue';
import ScaleBar from './ScaleBar.vue';
import html2canvas from 'html2canvas';

var interval;

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
      scale: 0.7,
      preview: false,
      chartData: {
        elements: [],
      },
      publishPopVisible: false,
      currentElementIndex: -1,
    };
  },
  computed: {
    currentElement() {
      if (this.currentElementIndex >= 0) {
        return this.chartData.elements[this.currentElementIndex];
      }
      return {};
    },
  },
  mounted() {
    this.$http.get('/chart/' + this.$route.params.id)
      .then((res) => {
        const { errno, data } = res.data;
        if (errno === 0) {
          this.title = data.title;
          this.chartData = data.chartData;
        }
      })
      .catch(() => {});
  },
  beforeDestroy() {
    clearInterval(interval);
  },
  methods: {
    changeScale(scale) {
      this.scale = scale;
    },
    setActiveComponentByIndex(index) {
      this.currentElementIndex = index;
      for (let i = 0; i < this.chartData.elements.length; i += 1) {
        const element = this.chartData.elements[i];
        if (index === i) {
          element.active = true;
        } else {
          element.active = false;
        }
      }
    },
    addComponent(data) {
      this.chartData.elements.unshift(data);
    },
    deleteComponent(index) {
      this.chartData.elements.splice(index, 1);
    },
    saveChartData() {
      const screenshot = this.generateScreenShot().then(url => {
        this.$http.put('/chart/' + this.$route.params.id, {
          img: url,
          chartData: this.chartData,
        })
          .then((res) => {
            const { errno, data } = res.data;
            if (errno === 0) {
              this.publishPopVisible = true;
              this.$message({
                type: "success",
                message: "保存成功"
              });
            }
          })
          .catch(() => {});
      });
    },
    generateData(item) {
      if (item.data.datacon.type == 'raw') {
        item.data.generated = item.data.datacon.data
      } else if (item.data.datacon.type == 'connect') {
        this.$http.get('/connect/' + item.data.datacon.connectId)
          .then((res) => {
            const { errno, data } = res.data;
            if (errno === 0) {
              // console.log(data.data);
              item.data.generated = data.data;
            }
          })
          .catch(() => {});
      } else if (item.data.datacon.type == 'get') {
        clearInterval(interval);
        let time = item.data.datacon.interval ? item.data.datacon.interval : 1;
        interval = setInterval(() => {
          this.$http.get(item.data.datacon.getUrl)
            .then((res) => {
              item.data.generated = res.data;
            })
            .catch(() => {});
        }, time * 1000)
      }
    },
    generateScreenShot() {
      let that = this;
      return new Promise(function(resolve, reject) {
        let screenRef = that.$refs['screenContainer'].$refs['screen'];
        html2canvas(screenRef, {
          backgroundColor: '#142E48'
        }).then((canvas) => {
          let dataURL = canvas.toDataURL("image/png");
          resolve(dataURL);
        })
      })
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
  &.preview {
    right: 40px;
  }
}

.main-view {
  background: #eeeeee;
  padding: 60px 300px 0 50px;
  overflow: hidden;
  height: calc(100vh - 60px);
}
</style>
