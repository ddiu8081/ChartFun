/* eslint-disable */
const Router = require('koa-router');
const connectModel = require('../models/connect');

const router = new Router();
router.prefix('/connect');

// 获取全部数据源列表
router.get('/', async (ctx, next) => {
  const rows = await connectModel.find({ 'uid': ctx.request.query.uid }).select('-data');
  ctx.body = {
    errno: 0,
    data: {
      connectList: rows
    }
  }
});

// 获取某一数据源详情
router.get('/:id', async (ctx, next) => {
  const item = await connectModel.findById(ctx.params.id);
  ctx.body = {
    errno: 0,
    data: item
  }
});

// 新增数据源
router.post('/', async (ctx, next) => {
  const body = ctx.request.body;

  if (!body.name || !body.data) {
    ctx.body = {
      errno: 1,
      errmsg: '格式错误'
    }
    return;
  }

  const result = await connectModel.create({
    name: body.name,
    data: body.data,
    uid: body.uid,
  });

  ctx.body = {
    errno: 0,
    data: result
  }
});

// 更新可视化图表
router.put('/:id', async (ctx, next) => {
  const body = ctx.request.body;

  const item = await connectModel.findById(ctx.params.id);
  if (body.name) {
    item.name = body.name;
  }
  item.save();

  ctx.body = {
    errno: 0,
  }
});

// 删除可视化图表
router.delete('/:id', async (ctx, next) => {
  const body = ctx.request.body;

  const item = await connectModel.findById(ctx.params.id);
  item.remove();

  ctx.body = {
    errno: 0,
  }
});

module.exports = router;
