<template>
  <div>
    <el-input
      placeholder="电话号码"
      v-model="user"
      class="login_input_margin"
      clearable
    >
    </el-input>
    <div class="login_codebox_codesend">
      <el-input
        placeholder="验证码"
        v-model="code"
        class="login_input_margin"
        clearable
      >
      </el-input>
      <el-button
        :type="sendType"
        @click="send"
        v-loading="isSending"
        :disabled="codeTime > 0"
        plain
        >{{ buttonText }}</el-button
      >
    </div>
    <el-button :loading="isLogining" @click="login" class="login_button">登录</el-button>
  </div>
</template>

<script>
const phoneExp = /^[0-9]{5,13}$/;

import { sendLoginCode, codeLogin } from "@/networks/apis/login/login";

export default {
  name: "CodeLoginBox",
  data() {
    return {
      user: "",
      code: "",
      sendType: "primary",
      codeTime: 0,
      buttonText: "发送验证码",
      isSending: false,
      isLogining: false,
    };
  },
  methods: {
    send() {
      if (!phoneExp.test(this.user)) {
        this.$message({ message: "请输入正确的手机号码", type: "warning" });
        return;
      }
      this.isSending = true;
      sendLoginCode(this.user)
        .then(() => {
          this.$message({
            message: "验证码发送成功",
            type: "success",
          });
          this.isSending = false;
          this.codeTime = 60;
          this.sendType = "info";
          this.buttonText = "60s";
          let timer = setInterval(() => {
            this.codeTime--;
            this.buttonText = `${this.codeTime}s`;
            if (this.codeTime == 0) {
              clearInterval(timer);
              this.buttonText = "发送验证码";
            }
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          this.isSending = false;
          this.$message("登陆失败，请重试");
        });
    },
    
    login() {
      if (!phoneExp.test(this.user)) {
        this.$message({ message: "请输入正确的手机号码", type: "warning" });
        return;
      }
      if (this.code.length < 4) {
        this.$message({ message: "请输入正确的验证码", type: "warning" });
        return;
      }
      this.isLogining = true;
      codeLogin(this.user, this.code)
        .then((res) => {
          if (res.code != 200) {
            this.isLogining = false;
            this.$message({
              message: "验证码错误",
              type: "warning",
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
.login_codebox_codesend {
  display: flex;
  align-items: center;
}

.login_codebox_codesend button {
  border-radius: 0 4px 4px 0;
  width: 120px;
}

.login_codebox_codesend input {
  border-radius: 4px 0 0 4px;
}
</style>