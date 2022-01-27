<template>
  <div class="home_foot_play_menu_content">
    <div class="menu">
      <div @click="changeIndex(-1)">
        <img src="../../../assets/player/up.png" alt="" />
      </div>
      <div @click="changeIndex(0)">
        <img v-if="isPlaying" src="../../../assets/player/stop.png" alt="" />
        <img v-else src="../../../assets/player/play.png" alt="" />
      </div>
      <div @click="changeIndex(1)">
        <img src="../../../assets/player/down.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FootBarPlayMenu",
  props: {
    isPlaying: Boolean
  },
  methods: {
    changeIndex(val) {
      this.$emit("changeIndex", val)
    }
  }
}
</script>

<style>
.home_foot_play_menu_content .menu {
  display: flex;
}

.home_foot_play_menu_content .menu div {
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 50%;
  background: #fff;
  padding: 5px;
  margin: 10px 10px 0 10px;
}

.home_foot_play_menu_content .menu img {
  width: 100%;
  height: 100%;
  transition: all 0.2s ease-out;
}

.home_foot_play_menu_content .menu img:hover {
  transform: scale(1.08);
}

.home_foot_play_menu_content .menu img:checked {
  transform: scale(1.02);
}

</style>