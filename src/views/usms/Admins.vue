<template>
  <div id="usmsAdmins">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-box">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>USMS管理员管理</el-breadcrumb-item>
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
              type="warning"
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row.id)"
            >编辑</el-button>
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

      <login-dialog :dialogShow="loginDialogShow"></login-dialog>
    </div>
  </div>
</template>

<script>
import { getPage } from "@/api/usms/admin";
import LoginDialog from "./compontents/LoginDialog";

export default {
  name: "usmsAdmins",
  components: {
    LoginDialog
  },
  data() {
    return {
      searchModel: {},
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      loginDialogShow: false
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
        console.log("--", e);
      });
      this.tableData = data.dataResult;
      this.total = data.totalNum;
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.loadPage();
    }
  }
};
</script>

<style>
</style>
