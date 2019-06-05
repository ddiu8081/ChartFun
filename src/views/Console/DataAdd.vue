<template lang="pug">
  div
    el-row(:gutter="20")
      el-col(:span="12")
        el-form(:model="form" :rules="rules" ref="ruleForm" label-width="100px" :hide-required-asterisk="true")
          el-form-item(label="名称" prop="name")
            el-input(v-model="form.name" placeholder="请输入数据源名称" style="width:220px;")
          el-form-item(label="数据文件" prop="data")
            el-upload(class="upload" ref="fileUpload" drag action="/" :on-change="importExcel" :on-exceed="onFileExceed" :on-remove="onFileRemove" :auto-upload="false" :limit="1")
              i.el-icon-upload
              .el-upload__text 将文件拖到此处，或<em>点击上传</em>
              .el-upload__tip(slot="tip") 请上传 Excel 表格文件，其中第一行为表头
          el-form-item
            el-button(type="primary" @click="onSubmit('ruleForm')") 提交
      //- el-col.data-preview(:span="10" v-if="form.scores.length")
      //-   .tips
      //-     i.el-icon-view
      //-     span 待上传的数据（{{form.scores.length}}条）
      //-   el-table(:data="form.scores" max-height="460" border style="width: 100%;")
      //-     el-table-column(label="学号" prop="学号")
      //-     el-table-column(label="姓名" prop="姓名")
      //-     el-table-column(label="成绩" prop="成绩")
</template>

<script>
/* eslint-disable */
import XLSX from 'xlsx';
export default {
  data () {
    return {
      subjects: [],
      form: {
        name: '',
        scodatares: [],
      },
      rules: {
        name: [
          { required: true, message: "请输入数据源名称", trigger: "change" }
        ],
        data: [
          { type: "array", required: true, min: 1, message: "请上传分数数据", trigger: "change" }
        ],
      }
    };
  },
  methods: {
    onSubmit () {
      var that = this;
      // that.$refs["ruleForm"].validate(valid => {
      //   if (valid) {
      //     that
      //       .$confirm("确定提交吗？", "提示", {
      //         confirmButtonText: "确定",
      //         cancelButtonText: "取消",
      //         type: "warning",
      //         center: true
      //       })
      //       .then(() => {
      //         if (this.$route.params.id) {
      //           // 修改
      //           that.$http
      //             .put(
      //               this.GLOBAL.serverUrl + "steps/" + this.$route.params.id,
      //               that.ruleForm
      //             )
      //             .then(function () {
      //               that.$router.push("/steps");
      //               that.$message({
      //                 type: "success",
      //                 message: "修改成功!"
      //               });
      //             });
      //         } else {
      //           // 提交
      //           that.$http
      //             .post(this.GLOBAL.serverUrl + "submit", that.form)
      //             .then(function (result) {
      //               console.log(result);
      //               that.$router.push("/submit");
      //               that.$message({
      //                 type: "success",
      //                 message: "添加成功!"
      //               });
      //             });
      //         }
      //       })
      //       .catch(() => { });
      //   } else {
      //     return false;
      //   }
      // });
      this.$router.push('/console/data')
    },
    // insertRow () {
    //   this.ruleForm.detail_array.push({});
    // },
    // deleteRow (index) {
    //   this.ruleForm.detail_array.splice(index, 1);
    //   this.generateFormData();
    // },
    onFileExceed () {
      this.$message.error('上传文件超出数量限制！');
    },
    onFileRemove () {
      this.$refs["fileUpload"].clearFiles();
      this.form.scores = [];
    },
    importExcel (file) {
      const types = file.name.split('.')[1];
      const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types);
      if (!fileType) {
        this.$message.error('格式错误！请重新选择！');
        this.form.scores = [];
        this.$refs["fileUpload"].clearFiles();
        return;
      }
      this.file2Xce(file).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
          this.form.scores = tabJson[0].sheet;
          this.$refs["ruleForm"].validateField(['scores']);
          // xlsxJson就是解析出来的json数据,数据格式如下
          // [
          //   {
          //     sheetName: sheet1
          //     sheet: sheetData
          //   }
          // ]
        }
      })
    },
    file2Xce(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader()
        reader.onload = function(e) {
          const data = e.target.result
          this.wb = XLSX.read(data, {
            type: 'binary'
          })
          const result = []
          this.wb.SheetNames.forEach((sheetName) => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            })
          })
          resolve(result)
        }
        reader.readAsBinaryString(file.raw)
        // reader.readAsBinaryString(file) // 传统input方法
      })
    }
  },
  mounted () {
    this.$http
      .get(this.GLOBAL.serverUrl + "subject")
      .then(response => {
        this.subjects = response.data;
      });
    if (this.$route.params.id) {
      this.$http
        .get(this.GLOBAL.serverUrl + "steps/" + this.$route.params.id)
        .then(response => (this.ruleForm = response.data));
    }
  }
};
</script>

<style>
.upload {
  width: 300px;
}
.data-preview {
  padding: 10px;
  background-color: #f9f9f9;
}
.data-preview .tips {
  margin: 8px 4px 12px;
  color: #909399;
  font-size: 16px;
}
.data-preview .tips span {
  margin-left: 4px;
  font-size: 14px;
}
</style>