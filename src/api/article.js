import request from '@/utils/request.js'

/* 获取文章列表 */
//  body 参数使用data传递
//  Query 参数使用 paramss
//  headers 参数使用headers 传递
function getArticles (params) {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // params: abc  getArticle(abc) 这个只是形参
    // es6 属性名和属性值相等的时候 getArticle(params) params 和 data 一样
    params
  })
}
/* 获取文章频道 */
function getArticleChannels () {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
/* 删除文章 */
function deleteArticle (articleId) {
  return request({
    method: 'DELETE',
    // 文章路径参数要在url中传递
    // :xxx 形式 需要传递参数
    url: `/mp/v1_0/articles/:${articleId}`
  })
}

/* export 需要加逗号 */
export { getArticles, getArticleChannels, deleteArticle }
