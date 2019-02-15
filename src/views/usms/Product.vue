<template>
  <div id="usmsProduct">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-box">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>USMS产品管理</el-breadcrumb-item>
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
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="model" width="150" label="型号"></el-table-column>
      <el-table-column prop="storeNum" label="储物格数量"></el-table-column>
      <el-table-column prop="status" label="产品状态"></el-table-column>
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
              type="warning"
              size="mini"
              icon="el-icon-edit"
              @click="handleConfig(scope.$index, scope.row.id)"
            >配置信息</el-button>
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
      title="产品配置"
      v-if="dialogConfigVisiable"
      :visible.sync="dialogConfigVisiable"
      width="50%"
      :modal-append-to-body="false"
    >
      <el-table :data="configs" fit highlight-current-row empty-text="-">
        <el-table-column prop="idx" label="格子编号"></el-table-column>
        <el-table-column prop="maxWidth" label="宽(mm)"></el-table-column>
        <el-table-column prop="maxHeight" label="高(mm)"></el-table-column>
        <el-table-column prop="maxQuantity" label="容量"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getPage, getConfigList } from "@/api/usms/product";

export default {
  name: "usmsProduct",
  data() {
    return {
      searchModel: {},
      pageNo: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      dialogConfigVisiable: false,
      configs: []
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
    async handleConfig(index, id) {
      this.configs = [];
      const data = await getConfigList(id).catch(e => {
        console.log(e);
      });
      if (data) {
        this.configs = data;
        this.dialogConfigVisiable = true;
      }
    }
  }
};
</script>

<style>
</style>
