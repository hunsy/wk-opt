<template>
  <div id="wkDashboard" class="main-box">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-box">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>微课概览</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 头部统计显示 -->
    <el-row :gutter="12" class="dashboard-head-box">
      <el-col :span="3" class="dashboard-head-item">
        <div>上架数量</div>
        <div>23个</div>
      </el-col>

      <el-col :span="3" class="dashboard-head-item">
        <div>上架数量</div>
        <div>23个</div>
      </el-col>

      <el-col :span="3" class="dashboard-head-item">
        <div>上架数量</div>
        <div>23个</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "wkDashboard",
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scope>
.dashboard-head-box {
  padding: 10px 20px;
  .dashboard-head-item {
    padding: 10px;
    text-align: center;
    border: 1px #eee solid;
    border-radius: 5px;
    margin-left: 5px;
    margin-left: 5px;
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
