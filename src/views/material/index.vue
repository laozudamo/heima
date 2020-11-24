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
   <!--  -->
   <image-list />
</el-card>
  </div>
</template>

<script>
import ImageList from '@/components/imageList.vue'
export default {
  name: 'indexMaterial',
  components: {
    ImageList
  },
  created () {},
  data: function () {
    return {
      return: {}
    }
  }

}
</script>

<style lang="less" scoped>

</style>
