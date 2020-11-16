<template>
  <div class="layout-container">
     <el-container>
  <el-aside width="auto">
    <app-aside :is-collapse=isCollapse /> <!-- 组件标签 -->
  </el-aside>
  <el-container>
    <el-header>
      <div class="index-topnav">
        <div class="topnav-start">
          <i
          :class="[isCollapse ? 'el-icon-s-fold':'el-icon-s-unfold']"  @click="flod"></i>
          <h3>河马系统</h3>
        </div>
        <el-dropdown>
         <div class="avatar-wrap">
          <img :src="user.photo" alt="">
          <span>{{user.name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
         </div>
        <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <i class="iconfont icon-blueberryuserset"></i>
          个人设置
        </el-dropdown-item>
        <!-- 组件默认不识别原生事件 除非内部做了处理 所以这里加.native -->
        <el-dropdown-item @click.native="onLogout">
          <i class="iconfont icon-login"></i>
          退出登录
        </el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-main>
      <!-- 子路由出口 -->
      <router-view />
    </el-main>
  </el-container>
  </el-container>
  </div>
</template>

<script>
import AppAside from '@/layout/components/aside' // 引入组件
import { getUserProfile } from '@/api/user.js'
export default {
  name: 'indexLayout',
  components: {
    AppAside // 注册 组件
  },
  props: {},
  data () {
    return {
      user: {}, // 当前登录用户信息
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {
    // 组件初始化好 请求获取用户资料
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    // 请求参数方法
    loadUserProfile () {
      // 调用
      getUserProfile().then(res => {
        this.user = res.data.data
      }).catch(err => {
        console.log(err, '错误消息')
      })
    },
    flod () { // 折叠导航栏
      this.isCollapse = !this.isCollapse
    },
    onLogout () {
      // console.log('退出');
      // 把用户登录状态清除
      this.$confirm('确定退出账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 跳转到登录页面
        window.localStorage.removeItem('user')
        this.$router.push('/login')

        // 退出成功消息提示
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        // 取消退出消息提示
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .layout-container {
    height: 100%;
  }
  .el-menu-vertical-demo {
        height: 100%;
      }
  .el-container {
    height: 100%;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    border-bottom: 1px solid rgb(114, 109, 109);
    .index-topnav {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .topnav-start {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3 {
      margin-left: 15px;
    }
  }
  .avatar-wrap{
    margin-right: 15px;
    display: flex;
    align-items: center;
    img {
    width: 40px;
    height: 40px;
    border-radius: 15px;
    margin-right: 10px;
    }
  }

  .el-aside {
    background-color: #7e705dc5;
    color: #333;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
</style>
