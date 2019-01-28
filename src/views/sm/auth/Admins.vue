<template>
  <div id="adminsManager" class="main-box">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-box">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限相关</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="searchModel" class="search-form">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item>
            <el-input placeholder="管理员昵称" v-model="searchModel.nickName" class="form-input">
              <template slot="prepend">管理员昵称</template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" size="medium" @click="doSearch()">查询</el-button>
            <el-button type="success" size="medium" class="handle-tool" @click="addAdmin">添加管理员</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="tableData" border fit highlight-current-row empty-text="-">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="avatarUrl" width="150" label="头像">
        <template slot-scope="scope">
          <img
            v-if="scope.row.avatarUrl"
            :src="scope.row.avatarUrl | patchImgHttp"
            width="40"
            height="40"
          >
          <!-- <img v-else :src="user_default" width="70" height="70" /> -->
        </template>
      </el-table-column>
      <el-table-column prop="username" width="200" label="用户名"></el-table-column>
      <el-table-column prop="nickName" width="100" label="昵称"></el-table-column>
      <el-table-column prop="mobile" width="200" label="手机"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column label="操作" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="success"
              size="mini"
              icon="el-icon-edit"
              @click="handleRole(scope.$index, scope.row.id)"
            >角色管理</el-button>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="mini"
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
      title="管理员表单"
      @click.native="isSearching=false"
      v-if="dialogFormVisible"
      :visible.sync="dialogFormVisible"
      width="50%"
      @closed="clear('form')"
      :modal-append-to-body='false'
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-form-item label="账号" prop="username" required:true>
          <el-input v-model="form.username" placeholder="账号" :disabled="!!form.id"></el-input>
        </el-form-item>

        <el-form-item label="昵称" prop="nickName" required:true>
          <el-input v-model="form.nickName" placeholder="昵称"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="邮箱"></el-input>
        </el-form-item>

        <el-form-item label="号码" prop="mobile" required:true>
          <el-input v-model="form.mobile" placeholder="号码"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button :disabled="formOnSubmit" type="primary" @click="onSubmit('form')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 穿梭框,角色管理 -->
    <el-dialog
      title="角色管理"
      v-if="dialogTransferVisible"
      :visible.sync="dialogTransferVisible"
      width="50%"
      @closed="clearTransfer()"
      :modal-append-to-body='false'
    >
      <el-transfer
        :titles="transferTitles"
        v-model="roleIds"
        :data="roles"
        :button-texts="[ '移除角色','添加角色']"
        @change="transferChange"
      ></el-transfer>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPage,
  getAdminInfo,
  saveAdmin,
  updateAdmin,
  getAdminRoles,
  addRole,
  rmRole
} from "@/api/admin";
import { roleList } from "@/api/role";

export default {
  name: "adminsManager",
  data() {
    const checkMobile = (rule, value, callback) => {
      const reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      if (value && !reg.test(value)) {
        return callback(new Error("请输入正确的手机号码"));
      } else {
        return callback();
      }
    };

    const checkEmail = (rule, value, callback) => {
      const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      if (value && !reg.test(value)) {
        return callback(new Error("请输入正确的邮箱"));
      } else {
        return callback();
      }
    };
    return {
      searchModel: {},
      isSearching: false,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      dialogFormVisible: false,
      formOnSubmit: false,
      form: {},
      rules: {
        username: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          },
          {
            min: 3,
            max: 32,
            message: "长度在 3 到 32 个字符",
            trigger: "blur"
          }
        ],
        nickName: [
          {
            required: true,
            message: "账号不能为空",
            trigger: "blur"
          },
          {
            min: 3,
            max: 32,
            message: "长度在 3 到 32 个字符",
            trigger: "blur"
          }
        ],
        email: [
          {
            validator: checkEmail,
            trigger: "blur"
          }
        ],
        mobile: [
          {
            validator: checkMobile,
            trigger: "blur"
          }
        ]
      },
      form: {},
      dialogTransferVisible: false,
      roleIds: [],
      roles: [],
      transferTitles: ["可选角色", "已有角色"],
      selectAdminId: ""
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
        nickName: this.searchModel.nickName
      };
      const data = await getPage(query).catch(e => {
        console.log(e);
      });
      this.tableData = data.dataResult;
      this.total = data.totalNum;
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.loadPage();
    },
    addAdmin() {
      this.dialogFormVisible = true;
      this.form = {};
    },
    async loadAdminInfo(id) {
      const data = await getAdminInfo(id).catch(e => {
        console.log("e", e);
      });
      return data;
    },
    async handleEdit(idx, id) {
      this.form = {};
      const d = await this.loadAdminInfo(id);
      this.form = d;
      this.dialogFormVisible = true;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (this.form.id) {
            const s = await updateAdmin(this.form).catch(e => {
              console.log(e);
            });
          } else {
            const s = await saveAdmin(this.form).catch(e => {
              console.log(e);
            });
          }
          this.dialogFormVisible = false;
          this.loadPage();
        } else {
          console.log("validate error");
        }
      });
    },
    handleRole(idx, id) {
      this.roles = [];
      this.roleIds = [];
      this.selectAdminId = id;

      roleList(id).then(
        data => {
          data.forEach((val, index, data) => {
            this.roles.push({
              key: val.id,
              label: val.name,
              disabled: false
            });
          });
        },
        error => {}
      );
      getAdminRoles(id).then(
        data => {
          data.forEach((val, index, data) => {
            this.roleIds.push(val.id);
          });
        },
        error => {
          console.log(error);
        }
      );
      this.dialogTransferVisible = true;
    },
    async transferChange(value, direction, keys) {
      if ("right" == direction) {
        await addRole(this.selectAdminId, keys).catch(e => console.log(e));
      } else if ("left" == direction) {
        await rmRole(this.selectAdminId, keys).catch(e => console.log(e));
      }
    },
    clearTransfer() {
      this.roleIds = [];
      this.roles = [];
    },
    clear(formName) {
      this.$refs[formName].resetFileds();
      this.form = {};
    }
  }
};
</script>

<style lang="less" scoped>
</style>
