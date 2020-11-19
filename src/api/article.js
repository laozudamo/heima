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
    url: `/mp/v1_0/articles?target=${articleId}`
    /*  params:{
      target:articleId
    } */
  })
}

/* 新建文章 */
function addArticles (data, draft = false) {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      draft // query 参数  true 为草稿 默认false 用params
    },
    data
  })
}

/* 获取指定文章 */
function getCurrentArticle (articleId) {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}

/* 编辑文章 */
function reEditArticle (articleId, data, draft = false) {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      draft
    },
    data
  })
}
/* export 需要加逗号 */
export { getArticles, getArticleChannels, deleteArticle, addArticles, getCurrentArticle, reEditArticle }
