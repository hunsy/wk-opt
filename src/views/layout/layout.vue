
<template>
  <div id="layout">
    <el-container>
      <el-header>
        <header-nav></header-nav>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <aside-nav></aside-nav>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//全局的布局页面
import { HeaderNav, AsideNav } from "./components";
export default {
  name: "layout",
  components: {
    HeaderNav,
    AsideNav
  },
  mounted() {}
};
</script>
<style lang="less">
.el-main {
  background-color: white;
  min-height: 100%;
  padding: 0px;
}
</style>
