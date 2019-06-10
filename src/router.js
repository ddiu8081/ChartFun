import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./views/Index.vue'),
      meta: {
        title: 'ChartFun | 一站式数据大屏制作平台',
      },
    },
    {
      path: '/console',
      component: () => import('./components/Console/Index.vue'),
      children: [
        {
          path: 'data',
          component: () => import('./views/Console/Data.vue'),
          meta: {
            title: '数据管理',
          },
        },
        {
          path: 'data/add',
          component: () => import('./views/Console/DataAdd.vue'),
          meta: {
            title: '添加数据源',
          },
        },
        {
          path: 'chart',
          component: () => import('./views/Console/Chart.vue'),
          meta: {
            title: '我的可视化',
          },
        },
        {
          path: '',
          redirect: 'chart',
        },
      ],
    },
    {
      path: '/edit',
      component: () => import('./components/Editor/Index.vue'),
      children: [
        {
          path: ':id',
          component: () => import('./views/Editor/Canvas.vue'),
          meta: {
            title: '大屏编辑',
          },
        },
      ],
    },
    {
      path: '/view/:id',
      name: 'view',
      component: () => import('./views/Viewer/Canvas.vue'),
      meta: {
        title: '大屏查看 | ChartFun',
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
