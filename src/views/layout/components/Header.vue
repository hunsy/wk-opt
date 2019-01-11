<template>
  <header class="head-nav" id="header_container">
    <el-row style="margin:0 10px;">
      <el-col :span="6" class="logo-container">
        <img src="@/assets/img/aa.png" class="logo" alt>
        <span class="title">微课管理系统OPT</span>
      </el-col>

      <div class="userinfo">
        <img src="@/assets/img/avatar.png" class="avatar" alt>
        <div class="welcome">
          <p class="name comename">
            欢迎 &nbsp;&nbsp;
            <span class="avatarname">{{name}}</span>
          </p>
        </div>
        <span class="username">
          <el-dropdown trigger="click" @command="setDialogInfo">
            <span class="el-dropdown-link">
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">修改信息</el-dropdown-item>
              <el-dropdown-item command="pass">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
        <font-awesome-icon icon="sign-out-alt" @click="logout"/>
      </div>
      <div class="notify-row"></div>
    </el-row>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "headerContainer",
  data() {
    return {
      userinfo: {
        username: "admin"
      }
    };
  },
  computed: {
    ...mapGetters(["name", "userId", "avatar"])
  },
  methods: {
    setDialogInfo() {},
    logout() {
      this.$store.dispatch("Logout").then(
        () => {
          this.$router.push("/login");
        },
        err => {}
      );
    }
  }
};
</script>

<style lang="less">
.logo-container {
  line-height: 60px;
  min-width: 400px;
  .logo {
    height: 50px;
    width: 50px;
    margin-right: 5px;
    vertical-align: middle;
    display: inline-block;
  }
  .title {
    vertical-align: middle;
    font-size: 22px;
    font-family: cursive;
    letter-spacing: 3px;
  }
}
.fa-user {
  position: relative;
  top: -2px;
  margin-right: 4px;
}
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: url("../../../assets/img/zhi001.png");
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  color: #fff;
  .logout {
    vertical-align: middle;
    cursor: pointer;
  }
}
.userinfo {
  line-height: 60px;
  text-align: right;
  float: right;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
  .name {
    line-height: 20px;
    text-align: center;
    font-size: 14px;
  }
  .comename {
    font-size: 12px;
  }
  .avatarname {
    color: #a9d86e;
    font-size: 14px;
  }
}
.username {
  cursor: pointer;
  margin-right: 15px;
  .el-dropdown {
    color: #fff;
  }
}
.border {
  border: 1px solid;
}
.notify-row {
  line-height: 60px;
  float: right;
  margin-right: 20px;
  margin-top: 5px;
}

.top-menu {
  .el-badge__content {
    top: 12px !important;
  }
}

ul.top-menu > li {
  float: left;
  margin-right: 20px;
}
ul.top-menu > li > a {
  color: #3bc5ff;
  font-size: 16px;
  border-radius: 4px;
  -webkit-border-radius: 4px;
  border: 1px solid #f0f0f8 !important;
  padding: 2px 6px 4px 6px;
}
</style>

