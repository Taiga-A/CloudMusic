<template>
  <div class="home_headbar_content">
    <div class="home_headbar_user">
      <el-avatar
        :size="40"
        :src="this.$store.getters.userInfo.headImgPath"
        class="home_headbar_userImg"
      ></el-avatar>
      {{ $store.getters.userInfo.nickName }}
    </div>
    <div class="home_headbar_left">
      <el-button v-if="isShowReturn" @click="bodyBack">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeadBar",
  data() {
    return {
      
    };
  },
  computed: {
    isShowReturn() {
      return (this.$store.getters.bodyPath.length > 1)
    } 
  },
  methods: {
    bodyBack() {
      this.$store.commit("popBodyPath")
    }
  }
};
</script>

<style>
.home_headbar_content {
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  box-shadow: #666 0 0 5px;
  background: #fff;
}
.home_headbar_user {
  float: right;
  margin: 10px 30px 0 20px;
  display: flex;
  align-items: center;
}
.home_headbar_left {
  position: relative;
  height: 100%;
}
.home_headbar_left button {
  height: 100%;
  width: 15%;
  border-radius: 0px;
}
.home_headbar_userImg {
  margin-right: 15px;
}
</style>