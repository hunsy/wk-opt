<template>
  <div id="usmsProductInventory">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-box">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>USMS产品实例管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="searchModel" class="search-form">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-form-item>
            <el-input placeholder="产品名称" v-model="searchModel.name" class="form-input">
              <template slot="prepend">产品名称</template>
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
      <el-table-column prop="name" label="名称" width="150"></el-table-column>
      <el-table-column prop="model" label="型号"></el-table-column>

      <el-table-column prop="sn" label="SN" width="150"></el-table-column>
      <el-table-column prop="mac" label="MAC"></el-table-column>
      <el-table-column prop="createdTime" label="创建时间"></el-table-column>
      <el-table-column prop="soldTime" label="销售时间"></el-table-column>
      <el-table-column prop="activateTime" label="激活时间"></el-table-column>
      <el-table-column prop="cancleTime" label="注销时间"></el-table-column>
      <el-table-column prop="status" label="产品状态"></el-table-column>
      <el-table-column label="操作" fixed="right" width="250">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row.id)"
            >编辑</el-button>

            <el-button
              v-if="scope.row.status != 1"
              type="success"
              size="mini"
              icon="el-icon-edit"
              @click="handleSell(scope.$index, scope.row.id)"
            >销控</el-button>
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
      title="销控管理"
      v-if="dialogSellVisiable"
      :visible.sync="dialogSellVisiable"
      width="50%"
      :modal-append-to-body="false"
    >
      <el-form ref="sellForm" :model="sellForm" label-width="150px">
        <el-form-item label="商户" class="search-popup-container" prop="lecturerId">
          <el-autocomplete
            width="100%"
            v-model="sellForm.merchantName"
            :fetch-suggestions="searchMerchant"
            @select="handleSelect"
            placeholder="请输入商户账号（手机号码）"
          >
            <template slot-scope="{ item }">
              <div>
                <span>{{ item.mobile }}</span>
                <span>{{ item.name }}</span>
              </div>
            </template>
          </el-autocomplete>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSellVisiable = false">取 消</el-button>
        <el-button type="primary" @click="saveSell('sellForm')">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInventoryPage } from "@/api/usms/product";
import {
  getPage as getMerchantPage,
  saveMerchantProduct
} from "@/api/usms/merchant";

export default {
  name: "usmsProductInventory",
  data() {
    return {
      searchModel: {},
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      dialogSellVisiable: false,
      sellForm: {}
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
      const data = await getInventoryPage(query).catch(e => {
        console.log("--", e);
      });
      this.tableData = data.dataResult;
      this.total = data.totalNum;
    },
    handleCurrentChange(pageNo) {
      this.pageNo = pageNo;
      this.loadPage();
    },
    handleSell(idx, id) {
      this.sellForm = {};
      this.sellForm.productInventoryId = id;
      this.dialogSellVisiable = true;
    },
    async searchMerchant(queryString, cb) {
      const data = await getMerchantPage({ mobile: queryString }).catch(e => {
        console.log(e);
      });
      if (data) {
        cb(data.dataResult);
      }
    },
    handleSelect(item) {
      console.log("item", item);
      this.sellForm.merchantId = item.id;
      this.sellForm.merchantName = item.name;
      this.sellForm.merchantMobile = item.mobile;
    },
    async saveSell(saveFrom) {
      const data = await saveMerchantProduct(this.sellForm).catch(e => {
        console.log(e);
        this.dialogSellVisiable = false;
      });
      if (data) {
        this.dialogSellVisiable = false;
        this.loadPage();
      }
    }
  }
};
</script>

<style>
</style>
