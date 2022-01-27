<template>
  <div>
    <el-input
      placeholder="电话号码 / 邮箱地址"
      v-model="user"
      class="login_input_margin"
      clearable
    ></el-input>
    <el-input
      placeholder="密码"
      v-model="password"
      class="login_input_margin"
      show-password
    ></el-input>
    <el-button class="login_button" :loading="isLogining" @click="login"
      >登录</el-button
    >
  </div>
</template>

<script>
import { phoneLogin, emailLogin } from "@/networks/apis/login/login";
import md5 from "md5";

const phoneExp = /^[0-9]{5,13}$/;
const emailExp = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;

export default {
  name: "PasswordLoginBox",
  data() {
    return {
      user: "",
      password: "",
      isLogining: false,
    };
  },
  methods: {
    login() {
      let type = "";

      if (phoneExp.test(this.user)) type = "phone";
      else if (emailExp.test(this.user)) type = "email";
      if (!type) {
        this.$message({
          message: "请输入正确的手机号码或邮箱地址",
          type: "warning",
        });
        return;
      }

      if (this.password == "") {
        this.$message({ message: "请输入密码", type: "warning" });
        return;
      }
      let req = null;
      if (type == "phone") req = phoneLogin(this.user, md5(this.password));
      else req = emailLogin(this.user, md5(this.password));
      this.isLogining = true;
      req
        .then((res) => {
          if (res.code != 200) {
            this.isLogining = false;
            this.$message({
              message: res.message,
              type: "error",
            });
          } else {
            this.isLogining = false;
            this.$message({
              message: "登陆成功",
              type: "success",
            });
            this.$emit("login", res)
            this.$router.replace("/");
          }
        })
        .catch((err) => {
          this.isLogining = false;
          console.log(err);
          this.$message("登陆失败，请重试");
        });
    },
  },
};
</script>

<style>
</style>