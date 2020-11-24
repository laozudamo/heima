<template>
<!-- 路由模式 -->
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="rgb(26 45 64)"
      text-color="#fff"
      router
      :collapse="isCollapse"
      active-text-color="#ffd04b">
      <el-menu-item index="/">
        <i class="iconfont icon-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="iconfont icon-calendar-alt"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/material">
        <i class="iconfont icon-file"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="iconfont icon-paper-plane"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="iconfont icon-smile-fill"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="iconfont icon-food"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/setting">
        <i class="iconfont icon-cog-fill"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
      <el-menu-item index="/echarts">
        <i class="el-icon-s-data"></i>
        <span slot="title">Echarts</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'Aside',
  components: {},
  props: ['is-collapse'], // 父组件传值给子组件 props 接收
  data () {
    return {
      // isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 18px;
  margin-right: 8px;
}

</style>
