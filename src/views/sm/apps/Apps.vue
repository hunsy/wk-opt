<template>
  <div id="appsManager" class="main-box">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-box">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>应用管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="searchModel" class="search-form">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item>
            <el-input placeholder="应用名称" v-model="searchModel.name" class="form-input">
              <template slot="prepend">应用名称</template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item>
            <el-input placeholder="应用ID" v-model="searchModel.id" class="form-input">
              <template slot="prepend">应用ID</template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" size="medium" @click="doSearch()">查询</el-button>
            <el-button type="success" size="medium" @click="addApp()">添加应用</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" border fit highlight-current-row empty-text="-">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" width="200" label="应用名称"></el-table-column>
      <el-table-column prop="tag" width="200" label="TAG"></el-table-column>
      <el-table-column prop="description" label="应用描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
            <el-button
              type="warning"
              size="small"
              icon="el-icon-delete"
              @click="handleCfg(scope.row.id)"
            >配置信息</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="配置信息" v-if="cfgDialogVisiable" :visible.sync="cfgDialogVisiable" width="50%">
      <p>请输入JSON格式的配置信息</p>
      <codemirror v-model="code" :options="cmOptions"></codemirror>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cfgDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="doCfg()">保存</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="应用表单"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      width="50%"
      @closed="clear('form')"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="名称" prop="name" required:true>
          <el-input v-model="form.name" placeholder="应用名称"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="form.description" placeholder="描述"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPage, getAppInfo, cfg, saveApp, updateApp } from "@/api/apps";

export default {
  name: "appsManager",
  data() {
    return {
      searchModel: {},
      isSearching: false,
      tableData: [],
      code: "",
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: "text/javascript",
        theme: "darcula",
        lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      },
      cfgDialogVisiable: false,
      currentApp: "",
      form: {},
      dialogFormVisible: false,
      formOnSubmit: false,
      rules: {
        name: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur"
          },
          {
            min: 2,
            max: 32,
            message: "长度在 2 到 32 个字符",
            trigger: "blur"
          }
        ],
        description: [
          {
            max: 128,
            message: "长度在 2 到 128 个字符",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    doSearch() {
      this.isSearching = true;
      this.loadPage();
      this.isSearching = false;
    },
    async loadPage() {
      const query = {
        pageNo: 1,
        pageSize: 10,
        name: this.searchModel.name
      };
      const data = await getPage(query).catch(e => {
        console.log(e);
      });
      this.tableData = data.dataResult;
    },
    addApp() {
      this.dialogFormVisible = true;
    },
    async handleCfg(id) {
      this.code = "";
      const d = await this.loadAppInfo(id);
      if (d) {
        this.code = d.cfg;
      }
      this.currentApp = d;
      this.cfgDialogVisiable = true;
    },
    async doCfg() {
      await cfg({ id: this.currentApp.id, cfg: this.code });
      this.cfgDialogVisiable = false;
    },
    async loadAppInfo(id) {
      const data = await getAppInfo(id).catch(e => {
        console.log("e", e);
      });
      return data;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.form.id) {
            const s = await updateApp(this.form).catch(e => {
              console.log(e);
            });
          } else {
            const s = await saveApp(this.form).catch(e => {
              console.log(e);
            });
          }
          this.dialogFormVisible = false;
          this.loadPage();
          // if (this.form.id) {
          //   updateApp(this.form).then(
          //     res => {
          //       console.log(33, res);
          //       this.dialogFormVisible = false;
          //       this.loadPage();
          //     },
          //     error => {
          //       this.dialogFormVisible = false;
          //     }
          //   );
          // } else {
          //   saveApp(this.form).then(
          //     res => {
          //       this.dialogFormVisible = false;
          //       this.loadPage();
          //     },
          //     error => {
          //       console.log(44, error);
          //     }
          //   );
          // }
        } else {
          console.log("validate error");
        }
      });
    }
  }
};
</script>

<style>
</style>
