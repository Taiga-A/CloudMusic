<template>
  <div class="home_body_content" ref="home_body">
    <PlayList
      v-if="path[path.length-1] == 'lists'"
      :playList="playList"
      @play-list-click="choosePlayList"
    ></PlayList>
    <Plays
      v-if="path[path.length-1] == 'plays'"
      :listInfo="chooseListInfo"
      @choose-music="chooseMusic"
    ></Plays>
  </div>
</template>

<script>
import PlayList from "./playList/PlayList.vue";
import Plays from "./plays/Plays.vue";

export default {
  name: "HomeBody",
  data() {
    return {
      chooseListInfo: 0,
    };
  },
  components: {
    PlayList,
    Plays,
  },
  computed: {
    playList() {
      return this.$store.getters.userInfo.playList;
    },
    path() {
      return this.$store.getters.bodyPath
    }
  },
  methods: {
    choosePlayList(info) {
      this.chooseListInfo = info;
      this.path.push("plays");
    },
    chooseMusic(row, thisMusicList) {
      this.$emit("choose-music", row, thisMusicList);
    },
  },
  updated() {
    this.$refs.home_body.scrollTo(0,0)
  }
};
</script>

<style>
.home_body_content {
  left: 0;
  width: 100%;
  position: absolute;
  top: 60px;
  bottom: 80px;
  overflow: auto;
  scroll-behavior: smooth;
  padding-bottom: 20px;
}
/* 滚动条 */
::-webkit-scrollbar {
  width: 10px;
  background-color: rgb(255, 255, 255);
}
::-webkit-scrollbar:hover {
  background-color: #ddd;
}
/* 滑块儿 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: 0 0 6px #999;
  background-color: #777;
}
</style>