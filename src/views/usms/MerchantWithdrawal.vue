<template>
  <div id="usmsMerchantWithdrawal">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-box">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>USMS提现管理</el-breadcrumb-item>
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
      <el-table-column prop="mobile" width="200" label="手机号码（账号）"></el-table-column>
      <el-table-column prop="name" width="100" label="姓名"></el-table-column>
      <el-table-column prop="amount" width="150" label="金额"></el-table-column>
      <el-table-column prop="accountType" label="提取账号类型"></el-table-column>
      <el-table-column prop="account" label="提取账户"></el-table-column>
      <el-table-column prop="startTime" label="开始时间"></el-table-column>
      <el-table-column prop="finishTime" label="结束时间"></el-table-column>
      <el-table-column prop="status" label="提取状态"></el-table-column>
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
  </div>
</template>

<script>
import { getWithdrawalPage } from "@/api/usms/merchant";

export default {
  name: "usmsMerchantWithdrawal",
  data() {
    return {
      searchModel: {},
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: []
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
      const data = await getWithdrawalPage(query).catch(e => {
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
