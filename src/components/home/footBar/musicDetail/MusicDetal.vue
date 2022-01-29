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
              lyricFY: lyric.haveFy,
              lyricNoFY: !lyric.haveFy,
            }"
          >
            {{ item.text }}<br />
            {{ item.fy }}
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
      lyric: { lyric: [], haveFy: false },
    };
  },
  computed: {
    musicAuthors() {
      return this.musicData ? formatAuthor(this.musicData.ar) : "";
    },
    nowIndex() {
      if (!(this.lyric instanceof Lyric)) return -1;
      return this.lyric.getIndex(this.nowTime + 0.1);
    },
    lyricTopPx() {
      if (this.lyric.haveFy) return this.nowIndex * -120;
      return this.nowIndex * -80;
    },
  },
  watch: {
    id: {
      handler(newVal) {
        if (newVal != 0)
          getLyric(newVal).then((res) => {
            this.lyric = new Lyric(res.lrc.lyric, res.tlyric && res.tlyric.lyric || "");
          });
      },
      immediate: true,
    },
  },
};
</script>

<style>
:root {
  --lyricFyBoxHeight: 120px;
  --lyricNofyBoxHeight: 80px;

  --lyricInitFontSize: 18px;
  --lyricNormalFontSize: 16px;
}

.home_footbar_detial_content {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100% - 80px);
}

/***************************************************   详情 */
.home_footbar_detial_content > .detial {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  margin-left: 30px;
}

.home_footbar_detial_content > .detial .img {
  width: 300px;
  height: 300px;
  margin-bottom: 40px;
  margin-top: -50px;
}

.home_footbar_detial_content > .detial .text {
  text-align: center;
  padding: 20px;
}

.home_footbar_detial_content > .detial .text .name {
  font-size: 22px;
}

.home_footbar_detial_content > .detial .text .author {
  color: #666;
  font-size: 14px;
  margin-top: 10px;
}
/***************************************************   歌词 */
.home_footbar_detial_content > .lyric {
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.home_footbar_detial_content > .lyric > .point {
  position: relative;
  width: 100%;
  height: 30%;
}

.home_footbar_detial_content > .lyric .lyric_content {
  position: absolute;
  width: 100%;
  transition: all 0.5s ease-in-out;
}

/* 选中 */
.home_footbar_detial_content > .lyric .lyricInit {
  animation-name: lyricInitAnm;
}

/* 共同 */
.home_footbar_detial_content > .lyric .lyricBoth {
  text-align: center;
  animation-duration: 0.4s;
  animation-fill-mode: both;
}

/* 普通 */
.home_footbar_detial_content > .lyric .lyricNormal {
  animation-name: lyricOutitAnm;
}

/* 翻译 */
.home_footbar_detial_content > .lyric .lyricFY {
  height: var(--lyricFyBoxHeight);
  line-height: 35px;
}

/* 没翻译 */
.home_footbar_detial_content > .lyric .lyricNoFY {
  height: var(--lyricNofyBoxHeight);
}

@keyframes lyricOutitAnm {
  from {
    font-size: var(--lyricInitFontSize);
    color: #333;
  }
  to {
    font-size: var(--lyricNormalFontSize);
    color: #999;
  }
}

@keyframes lyricInitAnm {
  from {
    font-size: var(--lyricNormalFontSize);
    color: #999;
  }
  to {
    font-size: var(--lyricInitFontSize);
    color: #222;
  }
}
</style>