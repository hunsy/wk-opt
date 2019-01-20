<template>
  <div id="rolesManager" class="main-box">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-box">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限相关</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="searchModel" class="search-form">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item>
            <el-input placeholder="角色名称" v-model="searchModel.name" class="form-input">
              <template slot="prepend">角色名称</template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" size="medium" @click="doSearch()">查询</el-button>
            <el-button type="success" size="medium" class="handle-tool" @click="addRole">添加角色</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" border fit highlight-current-row empty-text="-">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" width="200" label="角色名称"></el-table-column>
      <el-table-column prop="description" label="角色描述"></el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="success"
              class="handle-btn"
              size="small"
              icon="el-icon-edit"
              @click="handleResource(scope.$index, scope.row.id)"
            >资源管理</el-button>
            <el-button
              type="warning"
              class="handle-btn"
              size="small"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              class="handle-btn"
              size="small"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container flex-center">
      <el-pagination
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <el-dialog
      title="角色表单"
      @click.native="isSearching=false"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      width="50%"
      @closed="clear('form')"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="名称" prop="name" required:true>
          <el-input v-model="form.name" placeholder="角色名称"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="form.description" placeholder="描述"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :disabled="formOnSubmit" type="primary" @click="onSubmit('form')">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="资源管理"
      @click.native="isSearching=false"
      v-if="dialogResourceVisible"
      :visible.sync="dialogResourceVisible"
      width="50%"
    >
      <el-tree
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        :default-checked-keys="checkedKeys"
        :show-checkbox="true"
        @check="checkChange"
        node-key="id"
        :check-strictly="true"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}=>({{data.url}})</span>
        </span>
      </el-tree>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPage,
  saveRole,
  updateRole,
  getRoleInfo,
  roleResources,
  setRoleResources
} from "@/api/role";

import { resourceTree } from "@/api/resources";

export default {
  name: "rolesManager",
  data() {
    return {
      searchModel: {},
      isSearching: false,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      dialogFormVisible: false,
      form: {},
      formOnSubmit: false,
      rules: {
        name: [
          {
            required: true,
            message: "名称不能为空",
            trigger: "blur"
          },
          {
            min: 3,
            max: 32,
            message: "长度在 3 到 32 个字符",
            trigger: "blur"
          }
        ],
        description: [
          {
            max: 128,
            message: "长度在 3 到 32 个字符",
            trigger: ["blur", "change"]
          }
        ]
      },
      treeData: [],
      dialogResourceVisible: false,
      defaultProps: {
        children: "children",
        label: "label"
      },
      checkedKeys: [],
      currentRoleId: ""
    };
  },
  mounted() {
    this.loadPage();
  },
  methods: {
    async doSearch() {
      this.isSearching = true;
      this.loadPage();
      this.isSearching = false;
    },
    async loadPage() {
      const query = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        name: this.searchModel.name
      };
      const data = await getPage(query).catch(e => console.log(e));
      this.tableData = data.dataResult;
      this.total = data.totalNum;
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.loadPage();
    },
    addRole() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    async handleEdit(idx, id) {
      this.form = {};
      const d = await getRoleInfo(id).catch(e => console.log(e));
      this.form = d;
      this.dialogFormVisible = true;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          this.formOnSubmit = true;
          if (this.form.id) {
            const s = await updateRole(this.form).catch(e => {
              console.log(e);
              this.formOnSubmit = false;
            });
          } else {
            const s = await saveRole(this.form).catch(e => {
              console.log(e);
              this.formOnSubmit = false;
            });
          }
          this.dialogFormVisible = false;
          this.loadPage();
          this.formOnSubmit = false;
        } else {
          console.log("validate error");
        }
      });
    },
    clear(formName) {
      this.$refs[formName].resetFileds();
      this.form = {};
    },
    handleResource(idx, id) {
      this.currentRoleId = id;
      this.treeData = [];
      this.checkedKeys = [];
      resourceTree().then(
        data => {
          this.treeData = data;
        },
        error => {
          console.log(error);
        }
      );
      roleResources(id).then(
        data => {
          this.checkedKeys = data;
          this.dialogResourceVisible = true;
        },
        error => {}
      );
    },
    checkChange(data, node) {
      let arr = [];
      let checkeds = node.checkedNodes;
      let halfCheckeds = node.halfCheckedNodes;
      for (let i = 0; i < checkeds.length; i++) {
        let checked = checkeds[i];
        arr.push(checked.id);
      }
      for (let i = 0; i < halfCheckeds.length; i++) {
        let checked = halfCheckeds[i];
        arr.push(checked.id);
      }
      setRoleResources(this.currentRoleId, arr).then(
        res => {},
        error => {
          console.log(error);
        }
      );
    }
  }
};
</script>

<style>
</style>