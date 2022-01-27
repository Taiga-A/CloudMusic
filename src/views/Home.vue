<template>
  <div class="home_content">
    <el-container>
      <el-header class="home_headbar">
        <HeadBar></HeadBar>
      </el-header>
      <el-main><HomeBody ref="homeBody" @choose-music="chooseMusic"></HomeBody></el-main>
      <el-footer
        ><FootBar ref="player" @music-end="nextMusic"></FootBar
      ></el-footer>
    </el-container>
  </div>
</template>

<script>
import HeadBar from "../components/home/headBar/HeadBar.vue";
import FootBar from "../components/home/footBar/FootBar.vue";
import HomeBody from "../components/home/body/HomeBody.vue";



export default {
  name: "Home",
  components: {
    HeadBar,
    FootBar,
    HomeBody,
  },
  data() {
    return {
      thisMusic: null,
      thisMusicIndex: -1,
      thisMusicList: null,
    };
  },
  methods: {
    getThisMusicIndex() {
      if (!this.thisMusic || !this.thisMusicList) return -1;
      for (let i = 0; i < this.thisMusicList.length; i++) {
        if (this.thisMusicList[i] == this.thisMusic) return i;
      }
      return -1;
    },
    chooseMusic(thisMusic, thisMusicList) {
      this.thisMusic = thisMusic;
      this.thisMusicList = thisMusicList;
      this.thisMusicIndex = this.getThisMusicIndex();
      this.$refs.player.changeMusic(this.thisMusicList[this.thisMusicIndex]);
    },
    nextMusic(dat = 1) {
      this.thisMusicIndex += dat;
      if (
        this.thisMusicIndex < 0 ||
        this.thisMusicIndex >= this.thisMusicList.length
      )
        this.thisMusicIndex = 0;

      this.$refs.player.changeMusic(this.thisMusicList[this.thisMusicIndex]);
    },
  },
  created() {
    this.$store.dispatch("changeUserInfo");
  },
};
</script>


<style>
.home_content {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>