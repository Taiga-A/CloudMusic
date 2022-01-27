import request from "../../request";


export function getUserPlaylist(uid) {
  return request({
    url: "/user/playlist",
    params: {
      uid,
    }
  })
}