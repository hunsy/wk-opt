<template>
  <div id="login">
    <div class="login-body">
      <div class="login-logo-body">
        <img src="@/assets/img/logo.png" class="logo">
      </div>
      <div class="login-title">微课管理系统OPT</div>

      <el-form :model="userinfo" :rules="rules" ref="userinfoForm">
        <el-form-item prop="username">
          <el-input placeholder="用户账号" v-model="userinfo.username" class="form-input">
            <template slot="prepend">
              <font-awesome-icon icon="user"/>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="用户密码"
            v-model="userinfo.password"
            type="password"
            class="form-input"
          >
            <template slot="prepend">
              <font-awesome-icon icon="lock"/>
            </template>
          </el-input>
        </el-form-item>

        <el-button type="primary" class="login-btn" @click="doLogin('userinfoForm')">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "element-ui";

export default {
  name: "login",
  data() {
    return {
      userinfo: {},
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    doLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch("Login", this.userinfo).then(
            data => {
              this.$router.push({ name: "navSel" });
            },
            err => {
              this.$notify.error({
                title: "错误",
                message: "登录失败"
              });
              this.$refs[formName].resetFields();
            }
          );
        }
      });
    }
  }
};
</script>

<style lang="less">
#login {
  position: fixed;
  left: 0;
  top: 0;
  min-height: 100%;
  width: 100%;
  background-color: #efefee;
}
.login-body {
  margin: 0 auto;
  max-width: 450px;
  // background-color: #ddd;
  // border: 1px solid #ddd;
  // border-radius: 5px;
  padding: 30px 20px;
  margin-top: 45px;
  .login-logo-body {
    text-align: center;
    padding: 5px;
    .logo {
      width: 75px;
      height: 75px;
      border: 1px solid transparent;
      border-radius: 50%;
    }
  }
  .login-title {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    font-family: Courier, "Courier New", monospace;
    color: gray;
    margin-bottom: 15px;
  }

  .form-input {
    margin-bottom: 15px;
  }

  .login-btn {
    width: 100%;
    margin-top: 15px;
  }
}
</style>
