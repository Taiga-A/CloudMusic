<template>
  <div class="home_footbar_detial_content">
    <div class="detial">
      <div class="img">
        <el-image :src="musicData.al.picUrl" fit="cover"></el-image>
      </div>
      <div class="text">
        <div class="name">
          {{ musicData.name }}
        </div>
        <div class="author">{{ musicAuthors }}</div>
      </div>
    </div>
    <!-- <el-divider direction="vertical" class="divider"></el-divider> -->
    <div class="lyric">
      <div class="point">
        <div class="lyric_content" :style="{ top: lyricTopPx + 'px' }">
          <div
            v-for="(item, index) in lyric.lyric"
            :key="index"
            :class="{
              lyricInit: nowIndex == index,
              lyricNormal: nowIndex != index,
              lyricBoth: true,
            }"
          >
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatAuthor } from "@/util/formatter.js";
import { getLyric } from "@/networks/apis/lyric.js";
import Lyric from "@/util/lyric";

export default {
  name: "MusicDeatil",
  props: {
    nowTime: Number,
    musicData: Object,
    id: Number,
  },
  data() {
    return {
      lyric: { lyric: [] },
    };
  },
  computed: {
    musicAuthors() {
      return this.musicData ? formatAuthor(this.musicData.ar) : "";
    },
    nowIndex() {
      if (!(this.lyric instanceof Lyric)) return -1;
      return this.lyric.getIndex(this.nowTime + 1);
    },
    lyricTopPx() {
      return this.nowIndex * -80;
    },
  },
  watch: {
    id: {
      handler(newVal) {
        console.log("change");
        if (newVal != 0)
          getLyric(newVal).then((res) => {
            this.lyric = new Lyric(res.lrc.lyric);
          });
      },
      immediate: true,
    },
  },
};
</script>

<style>
.home_footbar_detial_content {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100% - 80px);
}

.home_footbar_detial_content > .detial {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
}

.home_footbar_detial_content > .detial .img {
  width: 300px;
  height: 300px;
  margin-bottom: 40px;
  margin-top: -50px;
}

.home_footbar_detial_content > .detial .text {
  text-align: center;
}

.home_footbar_detial_content > .detial .text .name {
  font-size: 22px;
}

.home_footbar_detial_content > .detial .text .author {
  color: #666;
  font-size: 14px;
  margin-top: 10px;
}

.home_footbar_detial_content > .lyric {
  width: 50%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.home_footbar_detial_content > .lyric > .point {
  position: relative;
  width: 100%;
}

.home_footbar_detial_content > .lyric .lyric_content {
  position: absolute;
  width: 100%;
  transition: all 0.5s ease-in-out;
}

.home_footbar_detial_content > .lyric .lyricInit {
  animation-name: lyricInitAnm;
}

.home_footbar_detial_content > .lyric .lyricBoth {
  text-align: center;
  height: 80px;
  animation-duration: 0.4s;
  animation-fill-mode: both;
}

.home_footbar_detial_content > .lyric .lyricNormal {
  animation-name: lyricOutitAnm;
}

.home_footbar_detial_content > .divider {
  position: absolute;
  left: 40%;
  height: 100%;
}

@keyframes lyricOutitAnm {
  from {
    font-size: 22px;
    color: #333;
  }
  to {
    font-size: 16px;
    color: #999;
  }
}

@keyframes lyricInitAnm {
  from {
    /* font-size: 16px; */
  }
  to {
    font-size: 22px;
    color: #333;
  }
}
</style>