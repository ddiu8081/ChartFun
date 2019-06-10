/* eslint-disable */
const Router = require('koa-router');
const userModel = require('../models/user');

const router = new Router();
router.prefix('/user');

router.post('/login', async (ctx, next) => {
  const body = ctx.request.body;
  const user = body.user;
  const pass = body.pass;

  const u = await userModel.findOne().
    where('username').equals(user).
    where('password').equals(pass);
  if (u) {
    ctx.body = {
      errno: 0,
      data: {
        uid: u._id,
        name: u.username
      }
    }
  } else {
    ctx.body = {
      errno: 1,
      errmsg: '用户名或密码错误'
    }
  }
});

router.post('/reg', async (ctx, next) => {
  const body = ctx.request.body;

  // 检查是否存在
  const row = await userModel.findOne().
    where('username').equals(body.user);
  if (row) {
    ctx.body = {
      errno: 2,
      errmsg: '用户名已存在'
    }
  } else {
    const u = await userModel.create({
      username: body.user,
      password: body.pass
    });
    ctx.body = {
      errno: 0,
      data: {
        uid: u._id,
        name: u.username
      }
    }
  }
});

module.exports = router;
