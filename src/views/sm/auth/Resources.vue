<template>
  <div id="resourcesManager" class="main-box">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-box">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限相关</el-breadcrumb-item>
      <el-breadcrumb-item>权限资源管理</el-breadcrumb-item>
    </el-breadcrumb>

<div class="tree-box">
    <el-tree
      :data="treeData"
      :props="defaultProps"
      accordion
      @node-click="handleNodeClick"
      ref="tree2"
      :filter-node-method="filterNode"
      default-expand-all
    >
      <div slot-scope="{ node, data }" class="custom-tree-node">
        <span>{{ node.label }}=>({{data.url}})</span>
        <span>
          <el-button type="text" size="mini" @click="() => next(data)">添加下级资源</el-button>
          <el-button type="text" size="mini" @click="() => edit(node, data)">编辑资源</el-button>
        </span>
      </div>
    </el-tree>
</div>
    <el-dialog
      title="资源表单"
      @click.native="isSearching=false"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      width="50%"
      @closed="clear('form')"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="名称" prop="name" required:true>
          <el-input v-model="form.name" placeholder="资源名称"></el-input>
        </el-form-item>

        <el-form-item label="URL">
          <el-input v-model="form.url" placeholder="URL"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :disabled="formOnSubmit" type="primary" @click="onSubmit('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  saveResource,
  updateResource,
  getResourceInfo,
  resourceList,
  getResourcePage,
  resourceTree
} from "@/api/resources";

export default {
  name: "resourcesManager",
  data() {
    return {
      searchModel: {},
      dialogFormVisible: false,
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
        ]
      },
      form: {},
      formOnSubmit: false,
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      filterText: ""
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  mounted() {
    this.loadTree();
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    async loadTree() {
      const data = await resourceTree().catch(e => {
        console.log(e);
      });
      this.treeData = data;
    },
    addResource() {
      this.form = {};
      this.dialogFormVisible = true;
    },
    async handleEdit(idx, id) {
      this.form = {};
      const data = await getResourceInfo(id).catch(error => {
        console.log(error);
      });

      this.form = data;
      this.dialogFormVisible = true;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          console.log("提交表单");
          if (this.form.id) {
            await updateResource(this.form).catch(error => {
              this.dialogFormVisible = false;
            });
          } else {
            await saveResource(this.form).catch(error => {
              console.log(44, error);
            });
          }
          this.dialogFormVisible = false;
          this.loadTree();
        } else {
          console.log("validate error");
        }
      });
    },
    clear(formName) {
      this.$refs[formName].resetFields();
      this.form = {};
    },
    handleNodeClick(data) {},
    next(data) {
      this.form = {};
      this.form.parentId = data.id;
      this.dialogFormVisible = true;
    },
    async edit(node, data) {
      this.form = {};
      const d = await getResourceInfo(data.id).catch(e => {
        console.log(e);
      });
      this.form = d;
      this.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.tree-box {
  padding: 10px 20px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  padding-top:7px;
  padding-bottom: 7px; 
}
</style>