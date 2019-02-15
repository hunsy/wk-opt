<template>
  <div id="loginDialog">
    <el-dialog title="新增课程" v-if="dialogShow" width="50%" :modal-append-to-body="false">
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
    </el-dialog>
  </div>
</template>

<script>
import { login } from "@/api/usms/admin";

export default {
  props: {
    dialogShow: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      userinfo: {},
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    doLogin(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const data = await login(this.userinfo).cacth(e => {
            this.$notify.error({
              title: "错误",
              message: "登录失败"
            });
            this.$refs[formName].resetFields();
          });
          console.log(data);

          if (data) {
            this.dialogShow = false;
          }

          // this.$store.dispatch("Login", this.userinfo).then(
          //   data => {
          //     this.$router.push({ name: "navSel" });
          //   },
          //   err => {
          //     this.$notify.error({
          //       title: "错误",
          //       message: "登录失败"
          //     });
          //     this.$refs[formName].resetFields();
          //   }
          // );
        }
      });
    }
  }
};
</script>

<style>
</style>
