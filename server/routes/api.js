/* eslint-disable */
const Router = require('koa-router');
const path = require('path');

const router = new Router();

router.prefix('/api')

router.post('/uploadfile', async (ctx, next) => {
  const file = ctx.request.files.file; // 获取上传文件
  const newFileName = file.path.split('/').pop(); // 取新的文件名
  return ctx.body = {
    success: true,
    url: `http://localhost:3000/upload/${newFileName}`,
  };
});

module.exports = router;
