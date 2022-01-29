<template>
  <div class="home_body_plays_content">
    <div class="main_context">
      <div class="playListInfo">
        <div class="img">
          <el-image
            :src="listInfo.coverImgUrl"
            :preview-src-list="[listInfo.coverImgUrl]"
          />
        </div>
        <div class="textInfo">
          <div class="title">{{ listInfo.name }}</div>
          <div class="user">
            {{ listInfo.creator.nickname + " " + listCreateDate + "创建" }}
          </div>
          <div class="otherInfo">
            <div>歌曲:{{ listInfo.trackCount }}</div>
            <div>播放次数:{{ listInfo.playCount }}</div>
          </div>
        </div>
      </div>
      <el-divider content-position="center"></el-divider>
      <el-skeleton v-if="isLoading" class="loading" :rows="6" animated />
      <el-table v-else
        :data="listData"
        stripe
        style="width: 100%"
        @row-dblclick="onChooseMusic"
        :v-loading="isLoading"
        highlight-current-row
      >
      <el-table-column
          type="index"
          align="center"
          label=""
          width="60"
        ></el-table-column>
        <el-table-column
          prop="name"
          align="left"
          label="歌曲名称"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="ar"
          :formatter="authorFormatter"
          label="作者"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="alia" align="center" label="描述">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>


import { getPlaysFromPlaylist } from "@/networks/apis/playlist/playlist.js";
import {formatAuthor} from "@/util/formatter.js";



export default {
  name: "Plays",
  props: {
    listInfo: Object,
  },

  data() {
    return {
      isLoading: true,
      listData: [],
    };
  },
  computed: {
    listCreateDate() {
      let date = new Date(this.listInfo.createTime);
      return `${date.getFullYear()}年${
        date.getMonth() + 1
      }月${date.getDate()}日`;
    },
  },
  methods: {
    onChooseMusic(row) {
      this.$emit("choose-music", row, this.listData);
    },
    authorFormatter(e) {
      return formatAuthor(e.ar)
    },
  },
  created() {
    getPlaysFromPlaylist(this.listInfo.id)
      .then((res) => {
        this.isLoading = false;
        console.log("getData!");
        if (res.code != 200) {
          this.$message({
            message: "获取失败",
            type: "error",
          });
          console.log(res);
          return;
        }
        this.listData = res.songs;
      })
      .catch((err) => {
        console.log("err at getPlaysFromPlaylist", err);
      });
  },
};
</script>

<style>
.home_body_plays_content {
  margin: 0;
  display: flex;
  justify-content: center;
}

.home_body_plays_content .main_context {
  width: 900px;
  box-shadow: 0 0 5px #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 700px;
}

.home_body_plays_content .main_context .loading {
  padding: 10px 0 30px 0;
  width: 90%;
}

.home_body_plays_content .playListInfo {
  width: 90%;
  display: flex;
  align-items: center;
}

.home_body_plays_content .playListInfo .img {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
}

.home_body_plays_content .playListInfo img {
  width: 200px;
  height: 200px;
  /* margin: 40px; */
}

.home_body_plays_content .playListInfo .textInfo {
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.home_body_plays_content .playListInfo .textInfo .title {
  font-size: 28px;
  font-weight: bold;
  margin-top: 40px;
}

.home_body_plays_content .playListInfo .textInfo .user {
  margin-top: 20px;
  color: #666;
}

.home_body_plays_content .playListInfo .textInfo .otherInfo {
  position: absolute;
  bottom: 40px;
  text-align: center;
  color: #666;
  font-size: 14px;
}
</style>