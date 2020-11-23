<template>
<div class="cover-container">
  <div class="cover-box" @click="showDialog">
    <img :src="url" alt="" class="cover-image">
  </div>
  <el-dialog :visible.sync="dialogVisible">
    <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="素材库" name="first">
      素材组件
    </el-tab-pane>
    
    <!-- 选择上传封面 -->
    <el-tab-pane label="上传图片" name="second">
      <input
      multiple
      type="file"
      ref="file"
      @change="onFileChange"
    >
    <div class="prviewCover-wrap" >
      <el-image
      class="previewCover"
      style="width: 120px; height: 120px"
      :src="previewCover"
      :fit="cover"></el-image>
    </div>
    </el-tab-pane>
    </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ConfirmCover">确 定</el-button>
      </span>
  </el-dialog>

</div>
</template>

<script>
import { uploadImage } from '@/api/images.js'
export default {
  name: 'aticleCover', 
  components: {},
  props: {},
  data () {
    return {
     dialogVisible: false,
     activeName: 'first',
     previewCover: '',
     url: null,
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showDialog(){
      this.dialogVisible=true
    },
    onFileChange() {
      const file = this.$refs.file.files[0]

      const blob = window.URL.createObjectURL(file)

      this.previewCover = blob
      /* 知识点 */
      /* this.$refs.file.value= '' */
    },

    ConfirmCover() {
      
      /* 如果是上传图片操作 */
      if(this.activeName == 'second') {

        let file = this.$refs.file.files[0]

        if(file) {
          let fd = new FormData()
          fd.append('image',file)
          uploadImage(fd).then( res => {
            this.url =res.data.data.url
              // 关闭对话框
            this.dialogVisible= false
              // url地址的值给封面
              // 传给article.image里面

              /* 这里子传父 事件 */
            this.$emit('update-cover',this.url)
          })

        } else {
          this.$message({
            message: '请选择文件',
            type: 'info'
          })
        }

      }
    }
  }
}
</script>

<style lang="less" scoped>
.cover-box{
  width: 120px;
  height: 120px;
  border: 1px solid #333;
  .cover-image {
    width: 100%;
    height: 100%;
  }
}
.previewCover {
  height: 100%;
  width: 100%;
}
.prviewCover-wrap {
  width: 130px;
  height: 130px;
}
</style>