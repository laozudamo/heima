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
          :key="index"
          >
          <div class="image-wrap">
        <el-image
          style="height: 200px"
          fit="fit"
          :src="image.url">
        </el-image>
        <div class="image-action">
          <!-- 
            class 样式绑定
            css类名 : 布尔值
           -->
            <el-button type="warning"
            circle
            :icon="image.is_collected ? 'el-icon-star-on' : 'el-icon-star-off' "
            @click="onIsCollect(image)"
            size="small"
            :loading="image.loading">
            </el-button>

            <el-button type="danger"
            icon="el-icon-delete"
            circle size="small"
            :loading="image.deleteLoadStatus"
            @click="onDeleteImage(image)"
            ></el-button>
          <!-- <i :class="{
            'el-icon-star-on' : image.is_collected,
            'el-icon-star-off' : !image.is_collected
          }"
          @click="onIsCollect(image)"
          ></i> -->
          <!-- <i :class="[image.is_collected ? 'el-icon-star-on' : 'el-icon-star-off']"></i> -->
          <!-- <i class="el-icon-delete"></i> -->
        </div>
        </div>
      </el-col>  
    </el-row>
  </div>

  <!-- 对话框 上传 -->
  <el-dialog
    title="上传图片"
    :visible.sync="dialogUp"
    width="20%">

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
    :total="totalCount"
    :page-size="pageSize"
    @current-change="onCurrentChange"
    :current-page.sync="page"
    />
</el-card>
  </div>
</template>

<script>
import { getImages, collectImage,deleteImage} from '@/api/images'
export default {
  name: 'indexMaterial', 
  components: {},
  props: {},
  data () {
    const user =JSON.parse(window.localStorage.getItem('user'))
    return {
      radio: 'false',
      images:[],
      page:1,
      pageSize:10,
      totalCount: 0,
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
    loadgetImages (page) {
      getImages({
        collect: this.radio,
        page:this.page,
        per_page:this.pageSize
      }).then(res => {
        const results = res.data.data.results
        results.forEach(image => {
          image.loading=false
          
          image.deleteLoadStatus=false
        })
        this.images = results
        this.totalCount = res.data.data.total_count
       /*  console.log(res) */
      }).catch(err => {
        console.log(err)
      })
    },

    onCollectChange(value) {
      this.loadgetImages(1,value)
    },

    onUploadSuccess() {
      // 关闭对话框
      this.dialogUp=false
      // 更新素材列表
      this.loadgetImages(this.radio)
    },
    /* 切换页面 */
    onCurrentChange(page){
      this.loadgetImages(page)
    },

    /* 收藏 */
    onIsCollect(image) {
      image.loading=true

      collectImage(image.id, !image.is_collected).then(res=>{
        image.is_collected = !image.is_collected
        image.loading=false
      })
    },
    /* 删除 */
    onDeleteImage(image){
       image.deleteLoadStatus=true
      deleteImage(image.id).then(res=>{
        this.loadgetImages(this.page)
         image.deleteLoadStatus=false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.tab-box {
  display: flex;
  justify-content: space-between;
}

.image-wrap {
  position: relative;
}
.image-action{
  position: absolute;
  height: 40px;
  bottom: 1px;
  left: 0px;
  width: 100%;
  background-color: rgba(	119,136,153,.8);
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #fff;
}

</style>