import request from '@/utils/request.js'

export const loginBeg = data => {
  return request({ // 需要return 出去
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // data 用来设置 POST请求体
    data
  })
}
export const getUserProfile = () => {
  // 这里需要用token 把localStorage里面的取出来
  // const user = JSON.parse(window.localStorage.getItem('user'))
  // console.log(user);
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // 按照接口文档写 Bearer空格token
    // headers: {
    //   Authorization: `Bearer ${user.token}`
    // }
  })
}
/* 修改用户数据 */
export const rewriteUserData = (data) => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}

/* 修改用户头像  这里data 传输formData 对象过来 */
export const editUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}
//  function loginBeg(data){
//   return request({
//      method: 'POST',
//      url: '/mp/v1_0/authorizations',
//      // data 用来设置 POST请求体
//      data
//    })
//  }
//  export { loginBeg }
