<template>
  <div>

    <div style="width: 70%;margin-top: 5%">
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-dynamic"
      >
        <el-form-item
            style="width: 49%"
            label="昵称修改"
            :prop="rules.name"
        >
          <el-input v-model="ruleForm.name" :placeholder='user_info.username'></el-input>
        </el-form-item>

        <el-form-item
            style="width: 49%"
            label="手机修改"
            prop="mobile"
        >
          <el-input v-model="ruleForm.mobile" :placeholder='user_info.mobile'></el-input>
        </el-form-item>

        <el-form-item
            style="width: 49%"
            prop="email"
            label="修改邮箱"
        >
          <el-input v-model="ruleForm.email" :placeholder='user_info.email'></el-input>
        </el-form-item>

        <el-button type="primary" @click="submitForm('ruleForm')">提交修改</el-button>


      </el-form>
    </div>

  </div>
</template>

<script>

export default {
  name: "UpdateUserInfo",
  components: {},
  data() {
    return {
      user_info: '',
      ruleForm: {
        name: '',
        mobile: '',
        email: '',
      },
      rules: {
        name: [
          {required: true, message: '请注意昵称长度在3~15个字符', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur'},
          {validator:checkusername, trigger: 'blur'},
        ],
        mobile: [
          {required: true, message: '请输入正确的手机号格式', trigger: 'blur'},
          {min: 3, max: 11, message: '长度在 3 到 11个字符', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱地址', trigger: 'blur'},
          {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
        ]
      },
    }
  },
  methods: {
    checkusername(rule, value, callback){

    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

  },
  created() {
    this.$axios({
      url: `http://127.0.0.1:8000/user/display/${this.$cookies.get('user_id')}/`,
      method: 'get',
      headers: {
        'Authorization': 'jwt ' + this.$cookies.get('token')
      },
    }).then(res => {
      this.user_info = res.data
      console.log(this.user_info)
    })
  },
}
</script>

<style scoped>

</style>