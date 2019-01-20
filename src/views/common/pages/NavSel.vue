<template>
  <div id="navSelPage">
    <header-nav></header-nav>
    <div class="nav-body">
      <el-row :gutter="12">
        <el-col :span="8" class="nav-item">
          <el-card shadow="hover" class="nav-item">
            <router-link to="/dashboard">系统管理</router-link>
          </el-card>
        </el-col>

        <el-col :span="8" class="nav-item">
          <el-card shadow="hover" class="nav-item">
            <router-link to="/wkDashboard">微课管理</router-link>
          </el-card>
        </el-col>
        <el-col :span="8" class="nav-item">
          <el-card shadow="hover" class="nav-item">鼠标悬</el-card>
        </el-col>

        <el-col :span="8" class="nav-item">
          <el-card shadow="hover" class="nav-item">鼠标悬</el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { HeaderNav } from "@/views/layout/components";
//首页，导航选择页
export default {
  name: "navSelPage",
  data() {
    return {};
  },
  components: {
    HeaderNav
  },
  mounted() {

  },
  methods: {}
};
</script>

<style lang="less" scoped>
#navSelPage {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  background-color: #eee;
  .nav-body {
    margin: 0 auto;
    margin-top: 115px;
    max-width: 600px;
    padding: 10px;
    .nav-item {
      text-align: center;
      margin-bottom: 15px;
      a {
        text-decoration: none;
      }
    }
  }
}
</style>

