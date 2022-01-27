import request from '../../request'

export async function getQrKey() {
  return request({
    method: "get",
    url: '/login/qr/key',
    params: {
      time: Date.parse(new Date())
    }
  })
}

export async function getQrImg(key) {
  return request({
    method: "get",
    url: '/login/qr/create',
    params: {
      key,
      qrimg: true,
    }
  })
}

export async function isQrReady(key) {
  return request({
    url: '/login/qr/check',
    method: 'get',
    params: {
      key,
      time: Date.parse(new Date())
    }
  })
}

export async function phoneLogin(phone, pswMd5) {
  return request({
    url: '/login/cellphone',
    method: 'post',
    params: {
      time: Date.parse(new Date())
    },
    data: {
      phone,
      md5_password: pswMd5,
    }
  })
}

export async function emailLogin(email, pswMd5) {
  return request({
    url: '/login',
    method: 'post',
    params: {
      time: Date.parse(new Date())
    },
    data: {
      email,
      md5_password: pswMd5,
    }
  })
}

export async function sendLoginCode(phone) {
  return request({
    url: '/captcha/sent',
    method: 'post',
    params: {
      time: Date.parse(new Date())
    },
    data: {
      phone,
    }
  })
}

export async function codeLogin(phone, code) {
  return request({
    url: '/login/cellphone',
    method: 'post',
    params: {
      time: Date.parse(new Date())
    },
    data: {
      phone,
      captcha: code
    }
  })
}

export async function getLoginStatus() {
  return request({
    url: "/login/status",
    params: {
      time: Date.parse(new Date())
    },
  })
}