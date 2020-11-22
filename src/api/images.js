/* 素材请求相关模块 */
import request from '@/utils/request'

/* 上传图片 */
function uploadImage (data) {
  return request({
    method: 'POST',
    // 正常的文件上传接口要求 Content-Type 设置为 multipart/form-data
    // 一般文件上传的接口都要求把请求头中的 Content-Type 设置为 multipart/form-data，但是我们使用 axios 上传文件的话不需要手动设置，你只要给 data 一个 FormData 对象即可。
    // new FormData()
    url: '/mp/v1_0/user/images',
    data
  })
}

/* 请求图片 */
function getImages (params) {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}

/* 收藏图片 */
function collectImage(imageID,collect) {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/user/images/${imageID}`,
    data:{
      collect
    }
  })
}

/* 删除图片 */
function deleteImage(imageID) {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/user/images/${imageID}`,
  })
}
export { uploadImage, getImages, collectImage, deleteImage}
