<template>
  <div class="home_body_playlist_content">
    <PlayListItem
      class="item"
      :v-if="playList != []"
      v-for="item in playList"
      :key="item.id"
      v-on:play-list-click="choosePlayList"
      :listInfo="item"
    ></PlayListItem>
  </div>
</template>

<script>
import PlayListItem from "./PlayListItem.vue";
export default {
  name: "PlayList",
  props: {
    playList: Array,
  },
  components: {
    PlayListItem,
  },
  methods: {
    choosePlayList(info) {
      this.$emit("play-list-click", info)
    },
  },
};
</script>

<style>
.home_body_playlist_content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.home_body_playlist_content .item {
  margin: 15px;
}
</style>