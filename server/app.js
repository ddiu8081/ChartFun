/* eslint-disable */
const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
var cors = require('koa2-cors');

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(koaBody({
  multipart: true, // 支持文件上传
  encoding: 'gzip',
  formidable: {
    uploadDir: path.join(__dirname, '../public/upload/'), // 设置文件上传目录
    keepExtensions: true, // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
  },
}));

router.post('/uploadfile', async (ctx, next) => {
  const file = ctx.request.files.file; // 获取上传文件
  const newFileName = file.path.split('/').pop(); // 取新的文件名
  // // 创建可读流
  // const reader = fs.createReadStream(file.path);
  // let filePath = path.join(__dirname, 'public/upload/') + `/${file.name}`;
  // // 创建可写流
  // const upStream = fs.createWriteStream(filePath);
  // // 可读流通过管道写入可写流
  // reader.pipe(upStream);
  return ctx.body = {
    success: true,
    url: `http://localhost:8080/upload/${newFileName}`,
  };
});

router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.body = 'Hello World router';
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
