(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1549db1b"],{"2c6b":function(t,n,e){},a0cd:function(t,n,e){"use strict";var a=e("2c6b"),c=e.n(a);c.a},c938:function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("el-row",{attrs:{gutter:36}},[t._l(t.chartList,function(n){return e("el-col",{key:n._id,attrs:{span:6}},[e("el-card",{attrs:{"body-style":{padding:"0px"},shadow:"hover"},nativeOn:{click:function(e){return t.editChart(n._id)}}},[e("img",{staticClass:"image",attrs:{src:n.img}}),e("div",{staticStyle:{padding:"14px"}},[e("span",[t._v(t._s(n.title))]),e("el-dropdown",{staticStyle:{float:"right"}},[e("i",{staticClass:"el-icon-more"}),e("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[e("el-dropdown-item",{nativeOn:{click:function(e){return t.editChart(n._id)}}},[t._v("编辑")]),e("el-dropdown-item",{nativeOn:{click:function(e){return t.renameChart(n)}}},[t._v("重命名")]),e("el-dropdown-item",{nativeOn:{click:function(e){return t.deleteChart(n._id)}}},[t._v("删除")]),e("el-dropdown-item",{attrs:{divided:""},nativeOn:{click:function(e){return t.editChart(n._id)}}},[t._v("查看统计")])],1)],1)],1)])],1)}),e("el-col",{attrs:{span:6}},[e("el-card",{attrs:{"body-style":{padding:"0px"},shadow:"hover"},nativeOn:{click:function(n){return t.addNewChart(n)}}},[e("div",{staticClass:"add-card"},[e("i",{staticClass:"el-icon-circle-plus"})])])],1)],2)],1)},c=[],i={data:function(){return{chartList:[],filter:""}},mounted:function(){this.getData()},methods:{getData:function(){var t=this;this.$http.get("/chart").then(function(n){var e=n.data,a=e.errno,c=e.data;0===a&&(t.chartList=c.chartList)}).catch(function(){})},editChart:function(t){this.$router.push("/edit/".concat(t))},addNewChart:function(){var t=this;this.$prompt("输入大屏标题","创建大屏项目",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(n){var e=n.value;t.$http.post("/chart",{title:e}).then(function(n){var e=n.data,a=e.errno,c=e.data;0===a&&(t.$message({type:"success",message:"创建成功"}),t.editChart(c._id))}).catch(function(){})}).catch(function(){})},renameChart:function(t){var n=this;this.$prompt("输入大屏标题","重命名",{inputValue:t.title,confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(e){var a=e.value;n.$http.put("/chart/".concat(t._id),{name:a}).then(function(t){var e=t.data,a=e.errno;e.data;0===a&&(n.$message({type:"success",message:"保存成功"}),n.getData())}).catch(function(){})}).catch(function(){})},deleteChart:function(t){var n=this;this.$confirm("是否删除大屏项目？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){n.$http.delete("/chart/".concat(t)).then(function(t){var e=t.data,a=e.errno;e.data;0===a&&(n.$message({type:"success",message:"已删除"}),n.getData())})}).catch(function(){})}}},r=i,o=(e("a0cd"),e("2877")),s=Object(o["a"])(r,a,c,!1,null,"024277b4",null);n["default"]=s.exports}}]);
//# sourceMappingURL=chunk-1549db1b.726e948b.js.map