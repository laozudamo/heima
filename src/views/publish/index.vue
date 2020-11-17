<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header">
        <span>
          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>发布文章</el-breadcrumb-item>
          </el-breadcrumb>
        </span>
      </div>
      <div>
        <!-- 页面主体 -->
        <el-form :model="article" :rules="rules" label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input type="textarea" v-model="article.content"></el-input>
          </el-form-item>
          <!-- 封面 -->
          <el-form-item label="封面" prop="resource">

            <el-radio-group v-model="article.cover.type">
              <el-radio label="1">单图</el-radio>
              <el-radio label="0">无图</el-radio>
              <el-radio label="3">三图</el-radio>
              <el-radio label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 组件标签 -->
      <!--     <el-form-item>
            <up-cover />
          </el-form-item>
 -->

          <el-form-item label="频道">
            <el-select v-model="article.channel_id" placeholder="请选择频道">
              <el-option
              v-for="(item, index) in channels"
              :key="index"
              :label="item.name"
              :value="item.id" />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary">立即创建</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-card>
  </div>
</template>

<script>
import { creatArticles, getArticleChannels } from '@/api/article'
 // import UpCover from './components/updialog'
export default {
  name: 'indexPublish', 
  components: {
 /*    UpCover */
  },
  props: {},
  data () {
    return {
      article: { // 文章数据
        title: '',
        content: '',
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 封面图片地址
        },
        channel_id: null
      },

      channels: [], // 频道 注意不要写道里面了

      rules: {
        title: [ { required: true, message: '请输入活动名称', trigger: 'blur' } ],
        content: [ { required: true, message: '请输入活动名称', trigger: 'blur' } ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticleChannels()
    this.onCreatArticles()
  },
  mounted () {},
  methods: {
    onCreatArticles () {

    },

    loadArticleChannels () {
      getArticleChannels().then(res=>{
        this.channels= res.data.data.channels
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>