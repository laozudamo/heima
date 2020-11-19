<template>
  <div material-container>
    <el-card class="box-card">
  <div slot="header">
    <span>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
      </el-breadcrumb>
    </span>
  </div>

  <!-- tab切换 -->
  <div class="tab-box">
      <el-radio-group v-model="radio" size="mini" @change="onCollectChange">
        <el-radio-button label="false">全部</el-radio-button>
        <el-radio-button label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="pain" size="small"  @click="dialogUp = true">上传素材</el-button>
  </div>

  <!-- 素材列表 -->
  <div>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :xs="12" :sm="6"  :lg="4"   v-for="(image,index) in images"
          :key="index" >
        <el-image
          style="height: 200px"
          fit="cover"
          :src="image.url" />
      </el-col>  
    </el-row>
  </div>

  <!-- 对话框 上传 -->
  <el-dialog
    title="上传图片"
    :visible.sync="dialogUp"
    width="35%">

  <!-- 图片上传 
    配置 headers 
  -->
  <el-upload
    drag
    name="image"
    :headers="upLoadHeader"
    :on-success="onUploadSuccess"
    multiple
    action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
    >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>

  <!-- /图片上传 -->
    
  </el-dialog>

  <!-- 分页器 -->
  <el-pagination
    layout="prev, pager, next"
    :current-page.sync="page"
    :page-size="20"
    :page="page"
    />
</el-card>
  </div>
</template>

<script>
import { getImages } from '@/api/images'
export default {
  name: 'indexMaterial', 
  components: {},
  props: {},
  data () {
    const user =JSON.parse(window.localStorage.getItem('user'))
    return {
      radio: 'false',
      images:[],
      iscollect:false,
      page:1,
      pageSize:20,
      dialogUp:false,
      upLoadHeader:{
        Authorization:`Bearer ${user.token}`
      },
      dialogUpImage: false,
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadgetImages(false)
  },
  mounted () {},
  methods: {
    /* 加载图片 */
    loadgetImages (collect=false) {
      getImages({
        collect,
        page:this.page,
        per_page:this.pageSize
      }).then(res => {
        this.images = res.data.data.results
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },

    onCollectChange(value) {
      this.loadgetImages(value)
    },

    onUploadSuccess() {
      // 关闭对话框
      this.dialogUp=false
      // 更新素材列表
      this.loadgetImages(false)
    }
  }
}
</script>

<style lang="less" scoped>
.tab-box {
  display: flex;
  justify-content: space-between;
}


</style>