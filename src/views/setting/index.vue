<template>
  <div class="setting-container">
    <el-card class="box-card">
      <div slot="header">
        <!-- 面包屑 -->
        <span>
           <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人设置</el-breadcrumb-item>
          </el-breadcrumb>
        </span>
      </div>

      <!-- 表单 -->
      <el-row>
        <el-col :span="16">
          <div>
            <el-form ref="userDataForm" :model="user" :rules="userProfileRule" label-width="80px">
              <el-form-item label="编号">
                : {{user.id}}
              </el-form-item>
              <el-form-item label="手机">
                : {{user.mobile}}
              </el-form-item>
              <el-form-item label="媒体名称" prop="name"> 
                <el-input v-model="user.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍" prop="intro">
                <el-input type="textarea" v-model="user.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="user.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="onSave">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>

        <!-- 头像 -->
      <el-col :span="5" :offset="3">
        <!--   <label for="avator-ipt"> --> <!-- 用label 绑定 input file   input 框里面 加id="avator-ipt" -->
            <el-avatar :size="100"  shape="square" fit="cover" >
              <img :src="user.photo"/>
            </el-avatar>
            <!-- 间接点击input框  vue里面操作dom-->
            <span style="display:block; margin-top:5px" @click="$refs.file.click()">修改头像</span>
           <!--  </label> -->
            <input
            type="file"
            hidden
            ref="file"
            @change="onFileChange"
            >
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      title="修改用户头像"
      :visible.sync="dialogVisible"
      width="30%"
      @opened="onDialogOpened"
     >
    <!--  @closed="onDialogClosed" -->
      <div class="prviewImage-wrap">
        <img :src="prviewImage" id="image" ref="prview-image" fit="cover">
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="avatorChanged">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile, rewriteUserData,editUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '@/utils/globalbus.js'

export default {
  name: 'setting', 
  components: {},
  props: {},
  data () {
    return {
        user: {
          id: '',
          name: '',
          intro: '',
          photo: '',
          email:'',
          mobile: '',
        },
        userProfileRule:{
          name: [
            {required: true, message: '请输入媒体名称', trigger: 'blur'},
            {min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur'}
          ],

          intro: [
            {required: true, message: '请输入媒体简洁', trigger: 'blur'}
          ],

          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] } 
          ]

        },
        dialogVisible: false, /* 控制上传图片预览的 显示状态 */
        prviewImage: '', /* 图片地址 */

        cropper: null, /* 裁剪器 */
       
      }
  },
  computed: {},
  watch: {},
  created () {
    this.loadgetUserProfile()
  },
  mounted () {},
  methods: {
    onSave() {
      /* 触发表单验证 */
      this.$refs['userDataForm'].validate((valid) => {
        if (!valid) {
          return
        } 

        /* 提交用户数据 */
        /* const { name,intro,email } = this.user */ /* 直接解构 */
        rewriteUserData({
          name: this.user.name,
          intro: this.user.intro,
          email: this.user.email
        }).then(() => {
          /* 更新用户资料 */
          globalBus.$emit('updateuser',this.user)
          
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        })
        .catch((err) => {
            console.log(err,'修改失败');
          })
      })
    },
    /* 用户资料 */
    loadgetUserProfile() {
      getUserProfile().then( res => {
        this.user = res.data.data
      })
    },
    
  /* 改变文件的时候才触发 */
  onFileChange() {
    /* 知识点 const file =this.$refs.file.files[0] 得到关于图片的信息  */
    const file =this.$refs.file
     
    /* blobData 的地址 可以给src 直接预览 知识点 */
    const blobData = window.URL.createObjectURL(file.files[0]) 
    this.prviewImage = blobData

     /* 展示弹出层 预览文件 */
    this.dialogVisible = true

    /* 解决相同文件不触发 */
    this.$refs.file.value = ''
  },

  onDialogOpened () {
     /* 获取dom 操作dom 原生的也可以操作dom*/
    const image = this.$refs['prview-image']
    /* 图片裁切器必须基于img初始化 */
    if(this.cropper) {
      this.cropper.replace(this.prviewImage)
      return
    }
    
    /* 这里有BUG */
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      background:false,
      movable:true,

      viewMode: 1,
    })
  },

  /* 方案二 对话框关闭 销毁 裁剪器cropper  销毁的方法*/
/*   onDialogClosed() {
    this.cropper.destroy()
  } */

  /* 用户头像修改 */
  avatorChanged(file) {
    this.cropper.getCroppedCanvas().toBlob(file=>{
      const fd = new FormData()
      
      fd.append('photo',file)
      // 请求提交
      this.user.photo = window.URL.createObjectURL(file.files[0])
      editUserPhoto(fd).then((res)=>{
       /*  this.user.photo=res.data.data.photo */ /* 后台请求渲染 */
       /* 直接把请求结果的文件 转为 blob 显示出来 后台请求相对较慢 */
        this.dialogVisible = false
        this.$message({
          type:'success',
          message: '修改成功'
          })
        })

        /* 更新用户登录头像 */
         globalBus.$emit('updateuser',this.user)
      })
    }
  }
}
</script>

<style lang="less" scoped>

/* 初始化样式 */
#image {
display: block;
height: 200px;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
