> notice: 2019毕设作品，后续如无必要将不再做功能性更新。

<img src="./public/chartfun.png" width="200"></img>

> Make data reports by dragging and dropping :)

## 特性 / Features

* 通过 Excel 导入数据
* 可视化画布
* 图表、图片、文字、边框支持
* 可拖拽和缩放的组件
* 静态数据、GET接口支持
* 生成公开链接

## 截图 / Screenshot

![image-1](./screenshot/1.png)

![image-2](./screenshot/2.png)

![image-3](./screenshot/3.png)

## 开发 / Develop

### 前端部分：Vue.js

#### Project setup

```
npm install
```

#### Compiles and hot-reloads for development

```
npm run serve
```

#### Compiles and minifies for production

```
npm run build
```

### 后端部分：Node.js + Koa + MongoDB

准备工作：配置并运行 MongoDB 数据库，新建一个空数据库并命名为`chartfun`。无需手动配置表结构，它们会被自动创建。

#### Run web-service

```
node ./server/app.js
```



## 鸣谢 / Thanks

本项目使用了 Vue.js 及以下第三方库：

* [ElemeFE / element](https://github.com/ElemeFE/element)
* [ElemeFE / v-charts](https://github.com/ElemeFE/v-charts)
* [josdejong / jsoneditor](https://github.com/josdejong/jsoneditor)
* [SortableJS / Vue.Draggable](https://github.com/SortableJS/Vue.Draggable)
* [mauricius / vue-draggable-resizable](https://github.com/mauricius/vue-draggable-resizable)
* [kirillmurashov / vue-drag-resize](https://github.com/kirillmurashov/vue-drag-resize)
* [koajs / koa](https://github.com/koajs/koa)

## LICENSE

MIT
