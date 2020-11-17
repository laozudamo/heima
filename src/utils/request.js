/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 请求的基础路径

  /* 解决大整数的问题 */
  // Do whatever you want to transform the data
  /* 如果成功 则返回处理后的值 */
  /* 用的时候需要tostring() */
  transformResponse: [function (data) {
    try{
      return JSONbig.parse(data)
    } catch (err) {
      /* 错误 返回原值 */
      console.log(err,'处理大整数错误');
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 所有请求会经过这里
  // console.log('来了老弟');
  // config 配置相关的信息对象 config 是可以修改的
  // return 之后请求会真正发出去
  // 出去之前进行统一配置 获取LocalStorage里面的token 转换字符串
  // console.log(config)
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 发生错误的时候
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器

// 导出请求方法

export default request

// import request from 'request.js'
// request.xxx
// request({
//   method: ,
//   url: ''
// })
