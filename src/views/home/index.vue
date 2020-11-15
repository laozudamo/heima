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
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
    <!-- 表单 -->
  <div class="text-item">
    <div class="home-form">
      <el-form ref="form" :model="form" label-width="40px" size="small">
      <el-form-item label="状态">
        <el-radio-group v-model="form.resource">
          <el-radio label="全部"></el-radio>
          <el-radio label="草稿"></el-radio>
          <el-radio label="待审核"></el-radio>
          <el-radio label="审核通过"></el-radio>
          <el-radio label="审核失败"></el-radio>
          <el-radio label="已删除"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="form.date1"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']">
        </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
    <!-- /表单 -->
    </el-card>
      <!-- el-table-column 设置表格列
      witdh 设置表格宽度
      label 设置表格列的标题
      prop 设定渲染字段 -->
    <el-card class="data-item">
      <div slot="header" class="clearfix">
        <span>根据数据查询到多少条结果</span>
      </div>
      <el-table
        class="index-home-table"
        size="samall"
        :data="articles"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="封面">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          prop="name"
          label="操作">
        </el-table-column>
    </el-table>
    <!-- /数据列表 -->

    <!-- 表单分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      class="paging"
      :total="1000">
    </el-pagination>
    <!-- /表单分页 -->
    </el-card>
    <!-- 数据列表 -->

  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
export default {
  name: 'HomeIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      articles: [] // 文章数据列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  methods: {
    loadArticles () {
      getArticles().then(res => {
        this.articles = res.data.data.results
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    onSearch () {

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

</style>
