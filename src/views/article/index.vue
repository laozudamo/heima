<template>
  <div class="article-container">
     <el-radio-group v-model="radio">
    <el-radio :label="1">备选项</el-radio>
    <el-radio :label="2">备选项</el-radio>
    <el-radio :label="3">备选项</el-radio>
  </el-radio-group>
  <div v-for="(item,a) in radio"
  :key='a' >
  {{item}}
    dwadw
  </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
       radio: 3
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
