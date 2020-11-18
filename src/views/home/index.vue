<template>
  <div class="home-container">
    <el-card class="filter-card">
  <div slot="header" class="clearfix">
    <span>
      <!--面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/article' }">内容管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!--/面包屑导航 -->
    </span>
  </div>
    <!-- 表单 -->
  <div class="text-item">
    <div class="home-form">
      <el-form ref="form" label-width="40px" size="small">
      <el-form-item label="状态">
        <el-radio-group v-model="status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
          <el-radio :label="4">已删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="channelId" placeholder="请选择频道">
          <!-- 遍历频道出来 选哟绑定key-->
          <el-option :value="null" label="全部" />
          <el-option v-for="(item,index) in channels"
          :key="index"
          :label="item.name"
          :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <!-- format 显示在输入框中的格式value-format绑定值的格式。不指定则绑定值为 Date 对象 -->
        <el-date-picker
          v-model="rangeDate"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
          format="yyyy年MM月dd日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
          :disabled="loading"
          @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
    <!-- /表单 -->
    </el-card>
      <!-- el-table-column 设置表格列
      witdh 设置表格宽度
      label 设置表格列的标题
      prop 设定渲染字段

      表格列默认只能渲染普通文本
      如果需要展示图片 按钮需要自定义表格列模板-->
    <el-card class="data-item">
      <div slot="header" class="clearfix">
        <span>根据筛选条件查询到{{totalCount}}条结果</span>
      </div>
      <el-table
        class="index-home-table"
        size="small"
        :data="articles"
        style="width: 100%"
        v-loading="loading">
        <el-table-column
          label="封面">
          <template slot-scope="scope">
            <el-image
            :src="scope.row.cover.images[0]"
            fit="cover"
            lazy
            class="article-cover">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline">加载失败</i>
              </div>
             <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          <!--   <img v-if="scope.row.cover.images[0]"
            :src="scope.row.cover.images[0]" alt="" class="article-cover">
            <img v-else src="./no-cover.jpg" alt="" class="article-cover"> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          label="状态">
          <!-- 如果想要在当前模板页获取当前遍历数据
          要在template 上面声明 -->
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type"> {{articleStatus[scope.row.status].text}} </el-tag>
             <!-- 也可以用color设置Tag颜色 -->
          <!--   <el-tag v-if="scope.row.status === 0" color="#fff">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <!-- 如果需要自定义内容 需要把内容放在template -->
          <!-- 这里面不需要加this -->
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-edit"
                circle
                @click="$router.push('/publish?id='+scope.row.id)" 
               ></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                circle
                @click="onDeleteArticle(scope.row.id)"
               ></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- /数据列表 -->

    <!-- 表单分页 -->
    <!--  total 计算总页面 total 按照每页10条数据
    page-size 默认每页10条    -->
    <el-pagination
      background
      layout="prev, pager, next"
      class="paging"
      :current-page.sync="page"
      :disabled="loading"
      :page-size="pageSize"
      @current-change='onCurrentChange'
      :total="totalCount">
    </el-pagination>
    <!-- /表单分页 -->
    </el-card>
    <!-- 数据列表 -->

  </div>
</template>

<script>
import {
  getArticles,
  getArticleChannels,
  deleteArticle
} from '@/api/article.js'
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      articles: [], // 文章数据列表
      articleStatus: [
        { status: 0, text: '草稿', type: 'warning' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'danger' },
        { status: 4, text: '已删除', type: 'info' }
      ],
      totalCount: 0, /* 总数据条数 */
      pageSize: 20, // 每页大小
      status: null, // 查询文章状态
      channels: [], // 频道
      channelId: null, // 查询文章频道
      rangeDate: null, // 范围日期
      loading: true, // 数据加载
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles(1),
    this.loadChannels()
  },
  mounted () {},
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      getArticles({
        // 这里传递参数 可以写成 page 属性和参数同名
        page: page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        /* 这里切记需要判断 如果不判断清空内容后 里面rangeDate变为null
         begin_pubdate begin_pubdate 传参就会出现报错 无法查询 */
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始日期
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 结束日期
      }).then(res => {
        // 解构赋值
        // total_count: totalCountnumber 重命名
        const { results, total_count: totalCountnumber } = res.data.data
        this.articles = results
        this.totalCount = totalCountnumber
        this.loading = false
      /*   this.articles = res.data.data.results
        this.totalCount=res.data.data.total_count */
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },

    loadChannels () { /* 获取频道 */
      getArticleChannels().then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '获取频道出现错误')
      })
    },

    onCurrentChange (page) {
      this.loadArticles(page)
    },

    onDeleteArticle (articleId) { // 删除文章
      deleteArticle(articleId.toString()).then(res => {
        // 删除成功 调用重新加载当前页页面文章
        this.loadArticles(this.page)
        // console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }

  }
}
</script>

<style lang="less" scoped>
  .filter-card {
    margin-bottom: 30px;
  }
  .paging {
    margin-top: 30px;
  }
   .index-home-table {
     margin-top: -20px;
   }
   .article-cover {
     width: 100px;
     height: 80px;
     background-size: cover;
   }
   .image-slot {
     line-height: 80px;
     color:#DCDCDC;
   }

</style>
