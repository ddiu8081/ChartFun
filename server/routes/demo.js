/* eslint-disable */
const Router = require('koa-router');
const chartModel = require('../models/chart');

const router = new Router();
router.prefix('/demo');

// 返回一个随机
router.get('/percent', async (ctx, next) => {
  ctx.body = {
    columns: ['city', 'percent'],
    rows: [
      {
        city: '南京',
        percent: parseFloat(Math.random().toFixed(2))
      }
    ]
  }
});

router.get('/pv', async (ctx, next) => {
  ctx.body = {
    columns: ['date', 'pv'],
    rows: [
      {
        date: '1/3',
        pv: Math.round(Math.random()*800) + 300,
      }, {
        date: '1/4',
        pv: Math.round(Math.random()*800) + 300,
      }, {
        date: '1/5',
        pv: Math.round(Math.random()*800) + 300,
      }, {
        date: '1/6',
        pv: Math.round(Math.random()*800) + 300,
      }, {
        date: '1/7',
        pv: Math.round(Math.random()*800) + 500,
      }, {
        date: '1/8',
        pv: Math.round(Math.random()*800) + 400,
      }
    ]
  }
});

module.exports = router;
