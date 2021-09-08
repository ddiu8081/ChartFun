<template lang="pug">
  div
    .enter-fullscreen(@click="toggleFullscreen(document)") 切换全屏状态
    .screen(:style="screenStyle" @click.self="handleActivated(-1)" ref="screen")
      .component(
        v-for="(item, index) in chartData.elements"
        :key="index"
        :style="{width: item.w + 'px', height: item.h + 'px', left: item.x + 'px', top: item.y + 'px', zIndex: chartData.elements.length - index}")
        div.filler(
          v-if="item.data.type == 'chart'"
          :style="{width: '100%', height: '100%', backgroundColor: item.bgcolor}")
          ve-map(
            v-if="item.data.settings.type=='map'"
            :width="item.w + 'px'"
            :height="item.h + 'px'"
            :data="item.data.generated"
            :settings="item.data.settings"
            @ready-once="generateData(item)")
          ve-liquidfill(
            v-else-if="item.data.settings.type=='liquidfill'"
            :width="item.w + 'px'"
            :height="item.h + 'px'"
            :data="item.data.generated"
            @ready-once="generateData(item)")
          ve-chart(
            v-else
            :width="item.w + 'px'"
            :height="item.h + 'px'"
            :data="item.data.generated"
            :settings="item.data.settings"
            @ready-once="generateData(item)")
        div.filler(
          v-if="item.data.type == 'text'"
          :style="{width: '100%', height: '100%', backgroundColor: item.bgcolor}")
          div.textcontainer(
            :style="{fontFamily: item.data.datacon.fontFamily, fontWeight: item.data.datacon.bold ? 'bold' : 'normal', fontStyle: item.data.datacon.italic ? 'italic' : 'normal', color: item.data.datacon.color, fontSize: item.data.datacon.fontSize + 'px', textStroke: item.data.datacon.stroke ? item.data.datacon.strokeSize+'px '+item.data.datacon.strokeColor : '0', textShadow: item.data.datacon.shadow ? '5px 5px '+item.data.datacon.shadowBlur+'px '+item.data.datacon.shadowColor : 'none'}"
            v-text="item.data.datacon.text")
        div.filler(
          v-if="item.data.type == 'image'"
          :style="{width: '100%', height: '100%', backgroundColor: item.bgcolor}")
          div.imagecontainer(
            :style="{backgroundImage: `url(${item.data.datacon.img})`, backgroundSize: item.data.datacon.imgSize, opacity: item.data.datacon.opacity}")
            .placeholder(v-show="!item.data.datacon.img")
        div.filler(
          v-if="item.data.type == 'border'"
          :style="{width: '100%', height: '100%', backgroundColor: item.bgcolor}")
          div.bordercontainer(
            :class="'border' + item.data.datacon.borderId"
            :style="{opacity: item.data.datacon.opacity}")
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      chartData: {},
      document: document.documentElement,
       interval:{}
    };
  },
  computed: {
    screenStyle() {
      return {
        width: this.chartData.w + 'px',
        height: this.chartData.h + 'px',
        backgroundColor: this.chartData.bgcolor,
        backgroundImage: `url(${this.chartData.bgimage})`,
        backgroundSize: this.chartData.bgimagesize,
      };
    },
  },
  mounted() {
    this.$http.get('/chart/view/' + this.$route.params.id)
      .then((res) => {
        const { errno, data } = res.data;
        if (errno === 0) {
          this.title = data.title;
          document.title = data.title;
          this.chartData = data.chartData;
        }
      })
      .catch(() => {});
  },
  methods: {
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
         //修复bug 此处interval没有定义导致报错
        clearInterval(this.interval);
        let time = item.data.datacon.interval ? item.data.datacon.interval : 1;
        this.interval = setInterval(() => {
          this.$http.get(item.data.datacon.getUrl)
            .then((res) => {
              item.data.generated = res.data;
            })
            .catch(() => {});
        }, time * 1000)
      }
    },
    toggleFullscreen (element) {
      let ele = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
      if (ele != null) {
        // 关闭全屏
        if (document.exitFullScreen) {
          document.exitFullScreen();
        } else if(document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if(element.msExitFullscreen) {
          element.msExitFullscreen();
        }
      } else {
        // 打开全屏
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if(element.msRequestFullscreen){
          element.msRequestFullscreen();
        } else if(element.webkitRequestFullscreen) {
          element.webkitRequestFullScreen();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.enter-fullscreen {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 80px;
  line-height: 80px;
  background: rgba(0, 0, 0, 0.4);
  color: #ffffff;
  text-align: center;
  font-size: 24px;
  transition: opacity 0.3s ease;
  opacity: 0;
  z-index: 999;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
}

.screen {
  position: relative;
  width: 100%;
  height: 100%;
  .component {
    position: absolute;
  }
  .filler {
    .textcontainer {
      word-wrap: break-word;
    }
    .imagecontainer {
      width: 100%;
      height: 100%;
      .placeholder {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
      }
    }
    .bordercontainer {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      &.border1 {
        border: 50px solid transparent;
        border-image: url('./../../assets/img/borders/1.png') 50;
      }
      &.border2 {
        border: 50px solid transparent;
        border-image: url('./../../assets/img/borders/2.png') 50;
      }
      &.border3 {
        border: 50px solid transparent;
        border-image: url('./../../assets/img/borders/3.png') 50;
      }
    }
  }
}
</style>
