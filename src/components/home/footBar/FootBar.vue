<template>
  <div class="home_footbar_content">
    <MusicDetail></MusicDetail>
    <div class="menu">
      <div class="context">
        <el-image
          style="width: 100px; height: 100px"
          :src="musicData ? musicData.al.picUrl : imageData"
          @click="musicDetail"
          fit="cover"
        ></el-image>
        <div class="text">
          {{ musicData ? musicData.name : "暂无更多" }}<br /><span>{{
            musicAuthors
          }}</span>
        </div>
      </div>
      <FootBarPlayMenu
        @changeIndex="changeIndex"
        :isPlaying="isPlaying"
      ></FootBarPlayMenu>
      <div class="home_footBar_slider">
        <div class="slider">
          <el-slider
            v-model="nowTime"
            :max="maxTime"
            @change="musicChangeLong"
            @mousedown="mouseOnSlider()"
          ></el-slider>
        </div>
        <div class="text">
          <span>{{ `${formateTime(nowTime)} / ${formateTime(maxTime)}` }}</span>
        </div>
      </div>
      <audio
        ref="audio"
        @canplay="audioCanPlay"
        @timeupdate="audioListen"
        @ended="changeIndex(1)"
        :src="audioSrc"
        autoplay
      ></audio>
    </div>
  </div>
</template>

<script>
import FootBarPlayMenu from "./FootBarPlayMenu.vue";
import MusicDetail from "./musicDetail/MusicDetal.vue"

import { formatAuthor } from "@/util/formatter.js";
import { getMusicById } from "@/networks/apis/playlist/playlist.js";

import defultImage from "@/assets/defultImage.png";

export default {
  name: "FootBar",
  data() {
    return {
      isPlaying: false,
      points: [],
      nowRealTime: 0.0,
      maxTime: NaN,
      isOk: false,
      timer: null,
      musicData: null,
      audioSrc: "",
      imageData: defultImage,
      isChange: false,
      isDetail: false,
    };
  },
  components: {
    FootBarPlayMenu,
    MusicDetail,
  },
  computed: {
    musicAuthors() {
      return this.musicData ? formatAuthor(this.musicData.ar) : "";
    },
    nowTime: {
      get: function () {
        return parseInt(this.nowRealTime);
      },
      set: function (val) {
        this.nowRealTime = val;
      },
    },
  },
  methods: {
    musicDetail() {},
    changeMusic(data) {
      this.musicData = data;
      this.nowTime = 0;
      getMusicById(data.id).then(({ data }) => {
        if (data[0].url == null) {
          this.$message({
            message: "歌曲已失效,下一首",
            type: "warning",
          });
          this.$emit("music-end");
          return;
        }
        this.audioSrc = data[0].url;
      });
    },
    audioCanPlay() {
      this.isPlaying = true;
      this.maxTime = parseInt(this.$refs.audio.duration);
    },
    audioListen() {
      if (!this.$refs.audio || this.isChange) return;
      this.nowTime = this.$refs.audio.currentTime;
    },
    changeIndex(dat) {
      if (!dat) {
        if (this.isPlaying) this.$refs.audio.pause();
        else this.$refs.audio.play();
        this.isPlaying = !this.isPlaying;
      } else {
        this.isPlaying = false;
        this.$refs.audio.pause();
        this.$emit("music-end", dat);
      }
    },
    musicChangeLong(val) {
      if (!this.musicData) return;
      this.$refs.audio.currentTime = val;
      this.nowTime = val;
      this.isChange = false;
    },
    formateTime(time) {
      if (isNaN(time)) return "00:00";
      const h = parseInt(time / 3600);
      const minute = parseInt((time / 60) % 60);
      const second = Math.ceil(time % 60);

      const hours = h < 10 ? "0" + h : h;
      const formatSecond = second > 59 ? 59 : second;
      return `${hours > 0 ? `${hours}:` : ""}${
        minute < 10 ? "0" + minute : minute
      }:${formatSecond < 10 ? "0" + formatSecond : formatSecond}`;
    },
    mouseOnSlider() {
      this.isChange = true;
    },
  },
};
</script>

<style>
.home_footbar_content {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  box-shadow: #666 0 2px 5px;
  transition: all 0.2s ease-out;
  background: #fff;
}

.home_footbar_content > .menu {
  border-top: #666 solid 0.25px;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: 80px;
  display: flex;
  width: 100%;
}

.home_footbar_content .context {
  position: absolute;
  display: flex;
  left: 10px;
  bottom: -30px;
}

.home_footbar_content .context .text {
  margin-left: -15px;
}

.home_footbar_content .context img {
  width: 60px;
  height: 60px;
  cursor: pointer;
  transition: all 0.5s ease-out;
}

.home_footbar_content .context img:hover {
  transform: scale(1.01);
  box-shadow: #333 0 0 8px;
}

.home_footbar_content .context span {
  color: #666;
  font-size: 12px;
}

.home_footBar_slider {
  width: 80%;
  display: flex;
  align-items: center;
  margin-top: -10px;
}

.home_footBar_slider .slider {
  width: 90%;
}

.home_footBar_slider .text {
  font-size: 14px;
  margin-left: 20px;
  color: #666;
  display: inline;
  white-space: nowrap;
}
</style>