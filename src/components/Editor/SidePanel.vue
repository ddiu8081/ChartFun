<template lang="pug">
  .panel
    .title(v-if="panelKey === 'layers'") 图层 ({{chartData.elements.length}})
    .title(v-else) {{componentList[panelKey].name}} ({{componentList[panelKey].children.length}})
    .layer-list(v-if="panelKey === 'layers'")
      draggable(
        v-model="chartData.elements"
        @start="handleLayerListDragStart"
        @end="handleLayerListDragEnd"
        ghost-class="ghost")
        transition-group(type="transition" :name="!drag ? 'flip-list' : null")
          .list-item(
            v-for="(item, index) in chartData.elements"
            :key="item.name"
            @click="$parent.$parent.setActiveComponentByIndex(index)"
            :class="{active: index === $parent.$parent.currentElementIndex}")
            .name 图层{{item.name}}
    .component-list(v-else)
      .list-item(v-for="item in componentList[panelKey].children")
        img(:src="item.img")
        .name {{item.name}}
</template>

<script>
import draggable from 'vuedraggable';

export default {
  props: ['panelKey'],
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
      componentList: {
        chart: {
          name: '图表',
          children: [
            {
              id: 1,
              name: '折线图',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/axis7.png',
            }, {
              id: 2,
              name: '柱状图',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/axis2.png',
            }, {
              id: 3,
              name: '条形图',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/axis4.png',
            }, {
              id: 4,
              name: '饼图',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/pie.png',
            }, {
              id: 5,
              name: '环状图',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/ring-graph.png',
            }, {
              id: 6,
              name: '漏斗图',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/funnel.png',
            }, {
              id: 7,
              name: '雷达图',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/graph.png',
            }, {
              id: 8,
              name: '世界地图',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/map-world.png',
            }, {
              id: 9,
              name: '中国地图',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/map-china.png',
            }, {
              id: 10,
              name: '桑基图',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/sankey.png',
            }, {
              id: 11,
              name: '散点图',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/scatter.png',
            }, {
              id: 12,
              name: 'K线图',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/candlestick.png',
            }, {
              id: 13,
              name: '仪表盘',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/gauge.png',
            }, {
              id: 14,
              name: '水球图',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/liquidfill.png',
            }, {
              id: 15,
              name: '词云图',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/word-cloud.png',
            },
          ],
        },
        text: {
          name: '文本',
          children: [
            {
              id: 1,
              name: '文本',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/text.png',
            },
          ],
        },
        picture: {
          name: '图片',
          children: [],
        },
        tools: {
          name: '组件',
          children: [
            {
              id: 1,
              name: '边框',
              img: 'http://ys.kwcnet.com/datav-h5/static/assets/thumbnails/border2.png',
            },
          ],
        },
      },
      layerList: [],
    };
  },
  computed: {
    chartData() {
      return this.$parent.chartData;
    },
  },
  methods: {
    handleLayerListDragStart(e) {
      this.drag = true;
      this.$parent.$parent.setActiveComponentByIndex(e.oldIndex);
      console.log(e);
    },
    handleLayerListDragEnd(e) {
      this.drag = false;
      this.$parent.$parent.setActiveComponentByIndex(e.newIndex);
      console.log(e);
    },
  },
};
</script>

<style lang="scss" scoped>
.panel {
  height: 100%;
  width: 250px;
  display: flex;
  flex-direction: column;
  background: #1e1e1ee9;
}
.title {
  color: #999999;
  padding: 10px 16px 16px;
}
.component-list {
  flex: 1;
  padding: 0 10px 0 16px;
  overflow: scroll;

  .list-item {
    display: inline-block;
    width: 100px;
    background: rgba(255, 255, 255, 0.04);
    margin-right: 10px;
    margin-bottom: 12px;
    opacity: 0.8;
    transition: opacity,background 0.3s ease;
    border: 1px solid transparent;
    text-align: center;
    padding: 5px 0;

    &:hover {
      cursor: pointer;
      opacity: 1;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.1);
      .name {
        color: #999999;
      }
    }

    img {
      width: 90px;
      height: 90px;
    }

    .name {
      height: 20px;
      line-height: 20px;
      font-size: 13px;
      color: #777777;
    }
  }
}

.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: 0.3;
  background: #c8ebfb;
}

.layer-list {
  flex: 1;
  padding: 0;
  overflow: scroll;

  .list-item {
    height: 48px;
    width: 100%;
    line-height: 48px;
    transition: background 0.3s ease;
    border-top: 1px solid rgba(255, 255, 255, 0.02);
    border-bottom: 1px solid rgba(255, 255, 255, 0.02);
    margin-bottom: -1px;
    padding: 0 16px;
    box-sizing: border-box;

    &.active {
      background: rgba(255, 255, 255, 0.04);
      border-right: 6px solid #409eff7d;
    }

    &:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.04);
      .name {
        color: #999999;
      }
    }

    .name {
      color: #777777;
    }
  }
}
</style>
