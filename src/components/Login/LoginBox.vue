<template>
  <div class="login_box_content">
    <el-menu
      :default-active="loginType"
      class="el-menu-demo"
      mode="horizontal"
      @select="handSelect"
    >
      <el-menu-item index="password">密码登录</el-menu-item>
      <el-menu-item index="code">验证码登录</el-menu-item>
      <el-menu-item index="image">扫码登录</el-menu-item>
    </el-menu>
    <PasswordLoginBox v-if="loginType == 'password'"></PasswordLoginBox>
    <CodeLoginBox v-if="loginType == 'code'"></CodeLoginBox>
    <ImageLoginBox v-if="loginType == 'image'"></ImageLoginBox>
  </div>
</template>

<script>
import PasswordLoginBox from "./LoginBox/PasswordLoginBox.vue";
import CodeLoginBox from "./LoginBox/CodeLoginBox.vue";
import ImageLoginBox from "./LoginBox/ImageLoginBox.vue"

export default {
  name: "LoginBox",
  components: {
    PasswordLoginBox,
    CodeLoginBox,
    ImageLoginBox,
  },
  data() {
      return {
          loginType: "password"
      }
  },
  methods: {
    handSelect(key) {
      console.log(key);
      this.loginType = key;
    },
  },
  created() {
      console.log("create")
  }
};
</script>

<style>
.login_box_content {
    width: 305px;
}
.login_input_margin {
    margin: 15px 0;
}
.login_button {
    width: 100%;
    margin-top: 10px;
}
</style>