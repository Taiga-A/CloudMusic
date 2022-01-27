<template>
  <div class="login_content">
      <LoginBox></LoginBox>
  </div>
</template>

<script>
import LoginBox from "../components/Login/LoginBox.vue"

export default {
    name: 'Login',
    data() {
        return {

        }
    },
    methods: {

    },
    components: {
        LoginBox,
    }

}
</script>

<style>
.login_content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

</style>