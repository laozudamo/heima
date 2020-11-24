<template>
  <div class="fans-container">
    <el-card>
      <div slot="header">
        <span>
          <!--面包屑导航 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
          </el-breadcrumb>
          <!--/面包屑导航 -->
        </span>
      </div>
      <div class="card-box">
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="粉丝列表" name="first">
              <el-row>
                <el-col :xs="8" :sm="6" :md="4" :lg="3"
                >
                <div class="fansProfile">
                  <img src="粉丝头像" alt="">
                  <p>fansName</p>
                  <el-button>关注</el-button>
                </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="粉丝画像" name="second">画像</el-tab-pane>
          </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>

import { getFansList } from '@/api/fans.js'
export default {
  name: 'fansIndex',
  components: {},
  props: {},
  data () {
    return {
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadFansList()
  },
  mounted () {},
  methods: {
    loadFansList () {
      getFansList().then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
