import request from '@/utils/request.js'

function getFansList (params) {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followerss',
    params
  })
}

export { getFansList }
