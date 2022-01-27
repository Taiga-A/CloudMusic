<template>
  <div class="home_playList_item_content" @click="clickMe">
    <div class="img">
    <img :src="listInfo.coverImgUrl" alt="" />
    </div>
    <div class="home_playList_item_title">
      <div style="padding: 0 10px">
      <h4>{{ listInfo.name }}</h4>
      </div>
      <div>
        <span class="text">创建人:</span>
        <span class="nickName">{{ listInfo.creator.nickname }}</span>
      </div>
      <div class="home_platList_item_Info">
        <div>歌曲:{{ listInfo.trackCount }}</div>
        <div>播放次数:{{listInfo.playCount}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayListItem",
  props: {
    listInfo: Object,
  },
  methods: {
    clickMe() {
      this.$emit("play-list-click", this.listInfo)
    }
  }
};
</script>

<style>
.home_playList_item_content {
  display: inline-block;
  display: flex;
  width: 400px;
  height: 200px;
  border-radius: 5px;
  box-shadow: #666 1px 1px 2px;
  overflow: hidden;
  transition: all ease-out 0.2s;
  cursor: pointer;
}

.home_playList_item_content:hover {
  box-shadow: #666 1px 1px 8px;
}

.home_playList_item_title {
  position: relative;
  width: 100%;
  text-align: center;
}

.home_playList_item_title .text {
  font-size: 13px;
  color: #666;
}

.home_platList_item_Info{
  position: absolute;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  color: #666;
  width: 100%;
  font-size: 12px;
  
}

.home_playList_item_content .img {
  overflow: hidden;
  width: 100%;
}

.home_playList_item_content img {
  height: 100%;
  transition: all 0.5s ease-out;
}

.home_playList_item_content:hover img {
  transform: scale(1.05);
}
</style>