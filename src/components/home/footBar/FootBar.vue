<template>
  <div class="home_footbar_content" :style="isDetail?'height:100%':'heging:80px'">
    <MusicDetail v-if="isDetail" :musicData="musicData" :nowTime="nowRealTime" :id="musicData.id"></MusicDetail>
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
          <span>{{ times }}</span>
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

import { formatAuthor, formateTime} from "@/util/formatter.js";
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
    times() {
      return `${formateTime(this.nowTime)} / ${formateTime(this.maxTime)}`;
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
    musicDetail() {
      if(!this.musicData)
        this.isDetail = false
      else
        this.isDetail = !this.isDetail
    },
    changeMusic(data) {
      this.musicData = data;
      this.nowTime = 0;
      getMusicById(data.id).then(({ data }) => {
        if (data[0].url == null) {
          this.$message({
            message: "歌曲已失效",
            type: "warning",
          });
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
      if(!this.musicData) return
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
    
    mouseOnSlider() {
      this.isChange = true;
    },
  },
};
</script>

<style>
.home_footbar_content {
  z-index: 10;
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
  left: 15px;
  bottom: -30px;
}

.home_footbar_content .context .text {
  margin-left: -15px;
}

.home_footbar_content .context img {
  width: 60px;
  height: 60px;
  cursor: pointer;
  transition: all 0.3s ease-out;
  box-shadow: #666 0 0 2px;
}

.home_footbar_content .context img:hover {
  transform: scale(1.01);
  box-shadow: #666 0 0 5px;
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