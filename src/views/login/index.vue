<template>
    <div class="login-container">
      <!-- 给表单设置 ref -->
  <el-form ref="login-form" :model="user" class="Indexlogin" :rules="rules">
  <el-form-item prop="mobile">
    <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
  </el-form-item>
  <el-form-item prop="code">
    <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
  </el-form-item>
  <el-form-item prop="agree">
      <el-checkbox v-model="user.agree">我已阅读并同意用户协议</el-checkbox>
  </el-form-item>
  <el-form-item>
    <el-button type="warning" @click="onLogin" class="login-btn" :loading="loginLoading">登录</el-button>
  </el-form-item>
</el-form>
  </div>
</template>
<script>
import { loginBeg } from '@/api/user.js'
export default {
  name: 'login',
  components: {},
  props: {},
  data () {
    // 注意数据不要放错地方了
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false // 同意协议
      },
      loginLoading: false,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { pattern: /^1[3|4|5|7|8]\d{9}$/, message: '请输入正确号码格式', trigger: 'blur' } // 正则表达式 直接写规则
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式', trigger: 'blur' }
        ],
        agree: [
          {
            // 自定义校验规则
            // true 通过 false 失败
            // 验证通过 callback()
            // 验证失败 callback(new Error('错误消息'))
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请勾选用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},

  methods: {
    onLogin () {
      // const user = this.user
      // 获取表单数据
      // 表单验证
      this.$refs['login-form'].validate((valid) => {
        if (!valid) {
          return
        }
        this.login() // this
      })
    },
    login () {
      this.loginLoading = true
      loginBeg(this.user) // 这里的问题
        .then(res => {
        // 将密码存储起来 localStorage.setItem('名字'，数据) 要将对象，数组类格式的转换成JSON字符串格式
          window.localStorage.setItem('user', JSON.stringify(res.data.data))
          // 饿了吗 登录 消息提示
          this.$message({
            message: '恭喜你，登录成功',
            type: 'success'
          })
          this.loginLoading = false// 关闭loading
          // this.$router.push('/') 这也是路由跳转
          this.$router.push({ // 登录成功后 进行路由跳转
            name: 'home'
          })
        })
        .catch(err => {
          this.$message.error(err, '错了哦，这是一条错误消息')
          this.loginLoading = false // 关闭loading 加this
        })
      // 处理后端响应结果
      // 成功
      // 失败
    }
  }
}

</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('./login_bg.jpg') no-repeat;
  background-size: cover;
}
.Indexlogin {
  width: 300px;
  padding: 20px 20px 0px;
  background-color: #fff;
  border-radius: 10px;
}
.login-btn {
  width: 100%;
  margin-bottom: 0px;
}
</style>
