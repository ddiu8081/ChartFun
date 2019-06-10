<template lang="pug">
  div
    el-row(:gutter="20")
      el-col(:span="12")
        el-form(:model="form" :rules="rules" ref="ruleForm" label-width="100px" :hide-required-asterisk="true")
          el-form-item(label="名称" prop="name")
            el-input(v-model="form.name" placeholder="请输入数据源名称" style="width:220px;")
          el-form-item(label="数据文件")
            el-upload(class="upload" ref="fileUpload" drag action="/" :on-change="importExcel" :on-exceed="onFileExceed" :on-remove="onFileRemove" :auto-upload="false" :limit="1")
              i.el-icon-upload
              .el-upload__text 将文件拖到此处，或<em>点击上传</em>
              .el-upload__tip(slot="tip") 请上传 Excel 表格文件，其中第一行为表头
          el-form-item(label="选择维度" prop="dimension")
            el-select(v-model="form.dimension" placeholder="请选择" @change="form.metrics = []")
              el-option(v-for="item in form.columnsRaw" :label="item" :value="item")
          el-form-item(label="选择指标" prop="metrics")
            el-checkbox-group(v-model="form.metrics")
              el-checkbox(
                v-for="item in form.columnsRaw"
                :label="item"
                :disabled="item == form.dimension")
          el-form-item
            el-button(type="primary" @click="onSubmit('ruleForm')") 提交
</template>

<script>
/* eslint-disable */
import XLSX from 'xlsx';
export default {
  props: ['user'],
  data () {
    return {
      form: {
        name: '',
        data: [],
        columnsRaw: [],
        dimension: '',
        metrics: []
      },
      rules: {
        name: [
          { required: true, message: "请输入数据源名称", trigger: "change" }
        ],
        data: [
          { type: "array", required: true, min: 1, message: "请上传数据", trigger: "change" }
        ],
        dimension: [
          { required: true, message: "请选择维度", trigger: "change" }
        ],
        metrics: [
          { type: "array", required: true, min: 1, message: "请选择指标", trigger: "change" }
        ],
      }
    };
  },
  computed: {
    newData() {
      // 生成 columns 字段
      let columns = this.form.metrics.concat();
      columns.unshift(this.form.dimension);
      let data = {
        columns,
        rows: this.form.data
      }
      return data;
    }
  },
  methods: {
    onSubmit () {
      var that = this;
      that.$refs["ruleForm"].validate(valid => {
        if (valid) {
          that
            .$confirm("确定提交吗？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              center: true
            })
            .then(() => {
              console.log(this.newData);
              this.$http
                .post('/connect/', {
                  name: this.form.name,
                  data: this.newData,
                  uid: this.user.uid
                })
                .then(res => {
                  const { errno, data } = res.data;
                  if (errno === 0) {
                    this.$message({
                      type: 'success',
                      message: '保存成功'
                    });
                    this.$router.push('/console/data');
                    // this.editChart(data._id);
                  }
                })
                .catch(() => {});
            })
            .catch(() => { });
        } else {
          return false;
        }
      });
      // this.$router.push('/console/data')
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
      this.form.data = [];
    },
    importExcel (file) {
      const types = file.name.split('.')[1];
      const fileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].some(item => item === types);
      if (!fileType) {
        this.$message.error('格式错误！请重新选择！');
        this.form.data = [];
        this.$refs["fileUpload"].clearFiles();
        return;
      }
      this.file2Xce(file).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
          this.form.data = tabJson[0].sheet;
          this.form.columnsRaw = Object.keys(tabJson[0].sheet[0]);
          // this.$refs["ruleForm"].validateField(['scores']);
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
    },
  },
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
