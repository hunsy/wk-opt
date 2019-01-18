<template>
  <div class="menu_page">
    <el-menu
      mode="vertical"
      class="el-menu-vertical-demo"
      :default-active="$route.path"
      :collapse="false"
      background-color="#324057"
      text-color="#fff"
      active-text-color="#ff6428"
      :router="true"
    >
      <el-menu-item
        index="dashboard"
        :class="{ 'is_active' : $route.path === '/dashboard'}"
        :style="{ 'color: rgb(255, 100, 40); background-color: rgb(50, 64, 87);' : $route.path === '/dashboard'}"
      >
        <font-awesome-icon icon="tachometer-alt"/>
        <span slot="title">概览</span>
      </el-menu-item>

      <el-menu-item index="appsManager">
        <font-awesome-icon icon="list-alt"/>
        <span slot="title">应用管理</span>
      </el-menu-item>

      <el-submenu index="auth">
        <template slot="title" class="menu-title">
          <font-awesome-icon icon="cogs"/>
          <span>权限相关</span>
        </template>
        <el-menu-item index="adminsManager">&nbsp;&nbsp;&nbsp;&nbsp;
          <font-awesome-icon icon="cog"/>
          <span>管理员管理</span>
        </el-menu-item>

        <el-menu-item index="rolesManager">&nbsp;&nbsp;&nbsp;&nbsp;
          <font-awesome-icon icon="cog"/>
          <span>角色管理</span>
        </el-menu-item>

        <el-menu-item index="resourcesManager">&nbsp;&nbsp;&nbsp;&nbsp;
          <font-awesome-icon icon="cog"/>
          <span>权限资源管理</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "menuPage",
  data() {
    return {
      isDropdown: false,
      lefeMenuList: []
    };
  },
  mounted() {
    console.log(11111111);
  },
  computed: {},
  methods: {}
};
</script>

<style lang="less">
.menu_page {
  position: fixed;
  top: 70px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 0;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.menu-title {
  text-align: left;
}

.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
.el-menu {
  border-right: none;
  .el-menu-item {
    padding-left: 20px !important;
  }
}
.hiddenDropdown,
.hiddenDropname {
  display: none;
}
.router-link-active {
  li {
    .el-submenu__title {
      color: #ff6428 !important;
    }
  }
}
</style>
