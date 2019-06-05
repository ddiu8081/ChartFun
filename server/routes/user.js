/* eslint-disable */
const Router = require('koa-router');
const userModel = require('../models/user');

const router = new Router();
router.prefix('/user');

router.get('/login', async (ctx, next) => {
  const req = ctx.request.body;
  const rows = await userModel.find({});
  return ctx.body = {
    success: true,
    row: rows,
  };
});

module.exports = router;
