/* eslint-disable */
const Router = require('koa-router');
const chartModel = require('../models/chart');

const router = new Router();
router.prefix('/chart');

// 获取全部实例列表
router.get('/', async (ctx, next) => {
  const rows = await chartModel.find({ 'uid': ctx.request.query.uid }).select('-chartData');
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

// 大屏访问量增1
router.get('/view/:id', async (ctx, next) => {
  const item = await chartModel.findById(ctx.params.id);

  item.view = item.view + 1;

  item.save();

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
    img: '',
    uid: body.uid,
    view: 0,
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
  if (body.title) {
    item.title = body.title;
  } else if (body.chartData) {
    item.chartData = body.chartData;
    item.img = body.img;
  }
  item.save();

  ctx.body = {
    errno: 0,
  }
});

// 删除可视化图表
router.delete('/:id', async (ctx, next) => {
  const body = ctx.request.body;

  const item = await chartModel.findById(ctx.params.id);
  item.remove();

  ctx.body = {
    errno: 0,
  }
});

// 复制、导入可视化图表
router.post('/import/:id', async (ctx, next) => {
  const body = ctx.request.body;

  const originItem = await chartModel.findById(ctx.params.id);

  const newItem = await chartModel.create({
    title: body.title ? body.title : originItem.title + '_导入',
    img: originItem.img,
    uid: body.uid,
    view: 0,
    chartData: originItem.chartData
  });

  ctx.body = {
    errno: 0
  }
});

module.exports = router;
