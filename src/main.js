import Vue from 'vue';
import VueDraggableResizable from 'vue-draggable-resizable';
import VueDragResize from 'vue-drag-resize';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/font/iconfont.css';
import App from './App.vue';
import router from './router';
import store from './store';
import http from './http';

// 需要 mock 数据时请打开注释
import initMock from '../mock';
initMock();

Vue.config.productionTip = false;
Vue.prototype.$http = http;
Vue.use(ElementUI);
Vue.component('vue-draggable-resizable', VueDraggableResizable);
Vue.component('vue-drag-resize', VueDragResize);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
