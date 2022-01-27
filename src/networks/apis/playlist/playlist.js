import request from "../../request"

export async function getPlaysFromPlaylist(id) {
  return request({
    url: "/playlist/track/all",
    params: {
      id,
    }
  })
}

export async function getMusicById(id) {
  if(!id)
    return
  return request({
    url: "/song/url",
    params: {
      id,
    }
  })
}