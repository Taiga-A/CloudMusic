import request from "../request";

export async function getLyric(id) {
  return request({
    url: "/lyric",
    id,
  })
}