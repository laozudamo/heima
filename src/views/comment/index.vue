<template>
  <div comment-container>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
           <!--面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/comment' }">评论管理</el-breadcrumb-item>
          </el-breadcrumb>
          <!--/面包屑导航 -->
        </span>
      </div>

      <!-- table -->
       <el-table
        :data="articles"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数">
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数">
        </el-table-column>
        <el-table-column
          label="评论状态">
          <template slot-scope="scope">
            {{scope.row.comment_status ? "正常" : "关闭"}}
          </template>
        </el-table-column>
       
       <!-- 操作 -->
        <el-table-column
          prop="address"
          label="操作">

        <template slot-scope="scope">
           <el-switch
           :disabled="scope.row.statusDisabled"
           @change="onStatusChange(scope.row)"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
        </el-table-column>
      </el-table>
        
      <!-- 分页器  使用步骤
      page-size 页面大小
      total 数据总条数
      @current-change 当前页码改变 -->
      <div class="Pagination">
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size.sync="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCommentCount">
          </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getArticles, editComment } from '@/api/article'
export default {
  name: 'indexcomment', 
  components: {},
  props: {},
  data () {
    return {
      articles: [{
        title:'',
        total_comment_count: 0,
        fans_comment_count: 0,
        totalCount:0,
      }],
      pageSize:20,
      page:1,
      totalCommentCount:0
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles(1)
  },
  mounted () {},
  methods: {
    /* 加载文章 */
    loadArticles(page=1) {
      /* 激活页码和请求一致 */
      this.page=page
      getArticles({
        page,
        per_page:this.pageSize,
        response_type: 'comment'
      }).then(res => {
       const results = res.data.data.results
       results.forEach(article=>{
         article.statusDisabled = false
       })
        this.articles=results
        this.totalCommentCount=res.data.data.total_count
      })
    },
    /* 修改评论 */
    onStatusChange(article){
      article.statusDisabled = true
      editComment(article.id.toString(), !article.comment_status).then(res=>{
        article.statusDisabled = false
        this.$message({
          type: 'success',
          message: article.comment_status ? '开启评论' : '关闭评论'
        })
      })
    },
    
    handleCurrentChange(page) {
      this.loadArticles(page)
    },

    handleSizeChange() {
      this.loadArticles(1)
    }
  }
}
</script>

<style lang="less" scoped>
.Pagination {
  margin-top: 20px;
}
</style>