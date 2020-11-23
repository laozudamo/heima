<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header">
        <span>
          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <!-- 知识点 -->
            <el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章' }}</el-breadcrumb-item>
          </el-breadcrumb>
        </span>
      </div>
      <div>
        <!-- 页面主体 -->
        <el-form :model="article" :rules="rules" label-width="80px" ref="publish-form">
          <el-form-item label="标题" prop="title">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <!-- 富文本 -->
          <el-form-item label="内容" prop="content">
             <el-tiptap
                v-model="article.content"
                :extensions="extensions"
                placeholder="请输入内容"
                height="480px"
                lang=zh
              />
            <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          </el-form-item>
          <!-- 封面 -->
          <el-form-item label="封面" >
            <el-radio-group v-model="article.cover.type">
              <el-radio label="1">单图</el-radio>
              <el-radio label="0">无图</el-radio>
              <el-radio label="3">三图</el-radio>
              <el-radio label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 封面组件 -->
          <el-form-item>
             <article-cover v-for="(item,index) in article.cover.type" :key="index" @update-cover="onUpdateCover(index,$event)"><!-- 只能是$event -->
            </article-cover>
          </el-form-item>

          <el-form-item label="频道" prop="channel_id">
            <el-select v-model="article.channel_id" placeholder="请选择频道">
              <el-option
              v-for="(item, index) in channels"
              :key="index"
              :label="item.name"
              :value="item.id" />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onPublish(false)">发表</el-button>
            <el-button @click="onPublish(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-card>
  </div>
</template>

<script>
import ArticleCover from './components/articleCover'
import { uploadImage } from '@/api/images'

import { addArticles, getArticleChannels, getCurrentArticle, reEditArticle } from '@/api/article'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  TextColor,
  Fullscreen,
  Image,
  HorizontalRule,
  CodeBlock
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'

export default {
  name: 'indexPublish',
  components: {
    'el-tiptap': ElementTiptap, /* 富文本 */
    ArticleCover /* 组件 */
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
        label:0,
        channel_id: null
      },

      channels: [], // 频道 注意不要写里面

      rules: {
        title: [{ required: true, message: '请输入标题名称', trigger: 'blur' },
          { pattern: /.{5,30}/, message: '标题内容请在5-30个字符以内', trigger: 'blur' }],
        content: [{
          validator(rule, value, callback) {
            if(value == '<p></p>' || value == "" ) {
              callback( new Error('请输入文章内容') )
            } else {
              callback()
            }
          } 
        }],
        channel_id: [ {
           required: true, message: '请选择文章频道', 
        }]
      },

      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(), // (use with TodoItem)
        new TextColor(),
        new Fullscreen(),
        new Image({
          // 默认会把图片生成 base64 字符串和内容存储在一起，如果需要自定义图片上传
          uploadRequest (file) {
            // 如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用 FormData
            const fd = new FormData()
            fd.append('image', file)
            // 第1个 return 是返回 Promise 对象
            // 为什么？因为 axios 本身就是返回 Promise 对象
            return uploadImage(fd).then(res => {
              // 这个 return 是返回最后的结果
              return res.data.data.url
            })
          } // 图片的上传方法，返回一个 Promise<url>
        }),
        new HorizontalRule(),
        new CodeBlock()
      ]

    }
  },
  computed: {},
  watch: {},

  created () {

    this.loadArticleChannels()
    // 这里是route的值
    if (this.$route.query.id) {
      getCurrentArticle(this.$route.query.id).then(res => {
        this.article = res.data.data  
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {},
  methods: {

    /* 加载文章频道 */
    loadArticleChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      /*   console.log(res) */
      }).catch(err => {
        console.log(err)
      })
    },

    onPublish (draft = false) {
      // 找到接口
      this.$refs['publish-form'].validate(valid=>{

        if(!valid) {
          return
        }
        /* 验证提交表单 */
        const articleId = this.$route.query.id

      if (articleId) {

        reEditArticle(articleId, this.article, draft).then(res => {
        /*   console.log(res) */
          this.$message({
            message: `${draft ? '存入草稿' : '修改成功'}`,
            type: 'success'
          })

          this.$router.push('/')

        }).catch(() => {

          console.log('修改失败')
        })
      } else {
        /*  发布文章 */
         addArticles(this.article, draft).then(res => {
           /* console.log(res) */
           this.$message({   
             message: draft ? '存入草稿' : '发布成功',
             type: 'success'
           })

           this.$router.push('/')
           })
         }
       })
     // 处理结果
    },
    onUpdateCover(index,url) {
      this.article.cover.images[index] = url
    }
  }
}
</script>

<style lang="less" scoped>

</style>
