import request from '@/utils/request.js'

function getArticles (params) {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // params: abc  getArticle(abc) 这个只是形参 es6 属性名和属性值相等的时候 getArticle(params) params 和 data 一样
    params
  })
}
//  body 参数使用data传递
//  Query 参数使用 paramss
//  headers 参数使用headers 传递
export { getArticles }
