<template>
  <div>
    <el-row v-loading="isLoading" type="flex" class="login_image_qr_content">
      <img
        :src="imageData"
        v-if="status == 801"
        alt="扫码登陆网易云"
        style="display: block"
      />
    </el-row>
    <el-result
      icon="warning"
      v-loading="isLoading"
      v-if="status == 800"
      title="验证码失效"
    >
      <template v-slot:extra>
        <el-button type="text" round @click="newImg">重新加载</el-button>
      </template>
    </el-result>
    <el-result
      icon="success"
      v-loading="isLoading"
      v-if="status == 802"
      title="扫码成功，请授权"
    >
    </el-result>
  </div>
</template>

<script>
import { getQrKey, getQrImg, isQrReady } from "@/networks/apis/login/login";
import defultQrImg from "@/assets/defultQr.png";

export default {
  name: "ImageLoginBox",
  data() {
    return {
      imageData: defultQrImg,
      nowKey: "",
      status: 801,
      isLoading: false,
    };
  },
  methods: {
    newImg() {
      if (this.timeFlag) clearInterval(this.timeFlag);
      this.isLoading = true;
      getQrKey()
        .then(({ data }) => {
          this.nowKey = data.unikey;
          if (this.nowKey) return getQrImg(this.nowKey);
        })
        .then(({ data }) => {
          this.imageData = data.qrimg;
          this.isLoading = false;
          this.status = 801;
          this.timeFlag = setInterval(() => {
            isQrReady(this.nowKey).then((res) => {
              this.status = res.code;
              if (this.status == 800) {
                if (this.timeFlag) clearInterval(this.timeFlag);
              }
              if (this.status == 803) {
                this.$emit("login", res)
                this.$router.replace("/");
              }
            });
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
          this.newImg();
        });
    },
  },
  mounted() {
    this.newImg();
  },
  beforeUnmount() {
    if (this.timeFlag) clearInterval(this.timeFlag);
  },
};
</script>

<style>
.login_image_qr_content {
  justify-content: center;
}
</style>