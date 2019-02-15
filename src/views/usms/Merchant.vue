<template>
  <div id="usmsMerchant">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-box">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>USMS商户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="searchModel" class="search-form">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item>
            <el-input placeholder="商户姓名" v-model="searchModel.name" class="form-input">
              <template slot="prepend">商户姓名</template>
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
      <el-table-column prop="mobile" width="250" label="手机号码（账号）"></el-table-column>
      <el-table-column prop="name" width="100" label="姓名"></el-table-column>
      <el-table-column prop="amount" width="200" label="金额"></el-table-column>
      <el-table-column prop="withdrawalAmount" label="提取金额"></el-table-column>
      <el-table-column label="操作" width="300" fixed="right">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row.id)"
            >编辑</el-button>

            <el-button
              type="success"
              size="mini"
              icon="el-icon-edit"
              @click="handleThirdAccount(scope.$index, scope.row.id)"
            >支付账号</el-button>
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
      title="支付账号"
      v-if="dialogThirdAccountVisiable"
      :visible.sync="dialogThirdAccountVisiable"
      width="50%"
      :modal-append-to-body="false"
    >
      <el-table :data="thirdAccounts" fit highlight-current-row empty-text="-">
        <el-table-column width="250" label="类型">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">支付宝</span>
            <span v-if="scope.row.type == 2">微信</span>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column width="200" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">新加入</span>
            <span v-if="scope.row.status == 1">已验证</span>
            <span v-if="scope.row.status == 2">注销</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getPage, getThirdAccount } from "@/api/usms/merchant";

export default {
  name: "usmsAdmins",
  data() {
    return {
      searchModel: {},
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      dialogThirdAccountVisiable: false,
      thirdAccounts: []
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
        console.log("--", e);
      });
      this.tableData = data.dataResult;
      this.total = data.totalNum;
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.loadPage();
    },
    async handleThirdAccount(idx, id) {
      this.thirdAccounts = [];
      console.log(id);
      const data = await getThirdAccount(id).catch(e => {
        console.log(e);
      });
      console.log(data);
      if (data) {
        this.thirdAccounts = data;
        this.dialogThirdAccountVisiable = true;
      }
    }
  }
};
</script>

<style>
</style>
