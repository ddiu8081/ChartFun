/* eslint-disable */
const Router = require('koa-router');
const chartModel = require('../models/chart');

const router = new Router();
router.prefix('/chart');

// 获取全部实例列表
router.get('/', async (ctx, next) => {
  const rows = await chartModel.find().select('-chartData');
  ctx.body = {
    errno: 0,
    data: {
      chartList: rows
    }
  }
});

// 获取某一实例列表
router.get('/:id', async (ctx, next) => {
  const item = await chartModel.findById(ctx.params.id);
  ctx.body = {
    errno: 0,
    data: item
  }
});

// 新建可视化图表
router.post('/', async (ctx, next) => {
  const body = ctx.request.body;

  if (!body.title || typeof body.title != 'string') {
    ctx.body = {
      errno: 1,
      errmsg: '格式错误'
    }
    return;
  }

  const result = await chartModel.create({
    title: body.title,
    img: 'https://image.ddiu.site/img/20190603221132.png',
    chartData: {
      "w": 1200,
      "h": 800,
      "bgcolor": "#999999",
      "bgimage": "",
      "bgimagesize": "cover",
      "elements": []
    }
  });

  ctx.body = {
    errno: 0,
    data: result
  }
});

// 更新可视化图表
router.put('/:id', async (ctx, next) => {
  const body = ctx.request.body;

  const item = await chartModel.findById(ctx.params.id);
  item.chartData = body.chartData;
  item.save();
  // chartModel.update({ _id: ctx.params.id }, { $set: { size: 'large' }}, callback);

  ctx.body = {
    errno: 0,
  }
});

module.exports = router;
