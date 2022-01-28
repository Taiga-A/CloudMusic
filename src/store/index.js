import {
  createStore
} from 'vuex'

import {
  getLoginStatus
} from "../networks/apis/login/login";
import {
  getUserPlaylist
} from "../networks/apis/user/user.js";

export default createStore({
  state: {
    user: {
      nickName: "",
      uid: 0,
      headImgPath: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      bgImgPath: "",
      playList: []
    },
    play: {
      isPlay: false,
      playIndex: 0,
      playList: [],
      changeWay: "next",
    },
    body: {
      path: ["lists"]
    }
  },
  getters: {
    userInfo: (state) => state.user,
    playInfo: (state) => state.play,
    bodyPath: (state) => state.body.path
  },
  mutations: {
    pushBodyPath(state, val) {
      state.body.path.push(val)
    },
    popBodyPath(state) {
      if (state.body.path.length < 2)
        return
      state.body.path.pop()
    },
    changePlaying(state, isPlay) {
      state.play.isPlay = isPlay
    },
    changePlayList(state, playList) {
      state.play.playList = playList
    },
    changeIndex(state, payload = null) {
      if (payload)
        state.play.playIndex = payload;
      else {
        let nextIndex = state.play.playIndex
        switch (state.play.changeWay) {
          case "next":
            nextIndex++
            if (nextIndex >= state.play.playList.length)
              nextIndex = 0
            break;

          default:
            break;
        }
        state.play.playIndex = nextIndex
      }
    },
    changeUserInfo(state, value) {
      state.user.nickName = value.nickName;
      state.user.uid = value.uid;
      state.user.headImgPath = value.headImgPath;
      state.user.bgImgPath = value.bgImgPath;
    },
    changeUserPlayList(state, val) {
      state.user.playList = val
    }
  },

  actions: {
    changeUserInfo(context) {
      getLoginStatus().then(({
        data
      }) => {
        if (data.code != 200) {
          console.log(data);
        } else {
          context.commit("changeUserInfo", {
            nickName: data.profile.nickname,
            uid: data.profile.userId,
            headImgPath: data.profile.avatarUrl,
            bgImgPath: data.profile.backgroundUrl,
          })
          return getUserPlaylist(context.getters.userInfo.uid)
        }
      }).then((res) => {
        context.commit("changeUserPlayList", res.playlist);
      });
    }
  },
  modules: {}
})