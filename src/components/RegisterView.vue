<template>
  <div class="register">
    <div class="box">
      <i class="el-icon-close" @click="close_login"></i>
      <div class="login_type">
        <span :class="{active: register_type === 'is_normal'}" @click="change_register_type('is_normal')">用户注册</span>
        <span :class="{active: register_type === 'is_seller'}" @click="change_register_type('is_seller')">商家用户注册</span>
      </div>

      <div class="content" v-if="register_type==='is_normal'">
        <div class="nav" style="text-align: center">

        </div>
        <el-form>
          <el-input
              placeholder="手机号"
              prefix-icon="el-icon-phone-outline"
              v-model="mobile"
              clearable
              @blur="check_mobile">
          </el-input>
          <el-input
              placeholder="密码"
              prefix-icon="el-icon-key"
              v-model="password"
              clearable
              show-password>
          </el-input>
          <el-input
              placeholder="验证码"
              prefix-icon="el-icon-chat-line-round"
              v-model="sms"
              clearable>
            <template slot="append">
              <span class="sms" @click="send_sms">{{ sms_interval }}</span>
            </template>
          </el-input>
          <el-button type="primary" @click="HandleRegister">注册</el-button>
        </el-form>
        <div class="foot">

          <router-link to="/normal/login"><span>立即登录</span></router-link>
        </div>
      </div>
      <div class="content" v-if="register_type==='is_seller'">
        <h1>商家注册</h1>
        <div class="nav" style="text-align: center">

        </div>
        <el-form>
          <el-input
              placeholder="商家手机号"
              prefix-icon="el-icon-phone-outline"
              v-model="mobile"
              clearable
              @blur="check_mobile">
          </el-input>
          <el-input
              placeholder="密码"
              prefix-icon="el-icon-key"
              v-model="password"
              clearable
              show-password>
          </el-input>
          <el-input
              placeholder="验证码"
              prefix-icon="el-icon-chat-line-round"
              v-model="sms"
              clearable>
            <template slot="append">
              <span class="sms" @click="send_sms">{{ sms_interval }}</span>
            </template>
          </el-input>
          <el-button type="primary" @click="HandleSellerRegister">注册</el-button>
        </el-form>
        <div class="foot">

          <router-link to="/normal/login"><span>立即登录</span></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterView",
  data() {
    return {
      mobile: '',
      password: '',
      sms: '',
      sms_interval: '获取验证码',
      is_send: false,
      register_type: 'is_normal'
    }
  },
  methods: {
    close_login() {
      this.$router.push('/home');
    },
    change_register_type(method) {
      this.register_type = method;
    },
    check_mobile() {
      if (!this.mobile) return;
      if (!this.mobile.match(/^1[3-9][0-9]{9}$/)) {
        this.$message({
          message: '手机号有误',
          type: 'warning',
          duration: 1000,
          onClose: () => {
            this.mobile = '';
            this.is_send = false;
          }
        });
        return false;
      }
      this.is_send = true;
      this.$axios.post(` http://127.0.0.1:8000/user/sms/mobile_check/?mobile=${this.mobile}`).then(res => {
        if (res.data.code == 100) {
          this.$message.warning("用户名已存在请重新输入")
          this.mobile = ''
        }
      })
    },
    send_sms() {
      if (!this.is_send) return;
      this.is_send = false;
      let sms_interval_time = 60;
      this.sms_interval = "发送中...";
      let timer = setInterval(() => {
        if (sms_interval_time <= 1) {
          clearInterval(timer);
          this.sms_interval = "获取验证码";
          this.is_send = true; // 重新回复点击发送功能的条件
        } else {
          sms_interval_time -= 1;
          this.sms_interval = `${sms_interval_time}秒后再发`;
        }
      }, 1000);
      this.$axios.post(`http://127.0.0.1:8000/user/sms/send_message/`, {mobile: this.mobile}).then(res => {
        this.$message(res.data.msg)
      })
    },
    HandleRegister() {
      if (this.mobile && this.sms && this.password) {
        this.$axios.post('http://127.0.0.1:8000/user/normal/register/', {
          mobile: this.mobile,
          code: this.sms,
          password: this.password
        }).then(res => {
          this.$router.push('/');
        })

      } else {
        this.$message({
          showClose: true,
          message: '手机号或密码或验证码必填',
          type: 'warning'
        })
      }
    },
    HandleSellerRegister() {
      if (this.mobile && this.sms && this.password) {
        this.$axios.post('http://127.0.0.1:8000/user/seller/register/', {
          mobile: this.mobile,
          code: this.sms,
          password: this.password,
          is_seller: 1
        }).then(res => {
          console.log(res.data)
          if (res.data.code === 100) {
            //  跳到登录页面
            this.$router.push('/');
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            })
          }
        })

      } else {
        this.$message({
          showClose: true,
          message: '手机号或密码或验证码必填',
          type: 'warning'
        })
      }
    }

  },

}
</script>

<style scoped>
.login_type span {
  float: left;
  height: 30px;
  width: 130px;
  margin-left: 40px;
  margin-top: 30px;

  /*background-color: azure;*/
  font-size: 20px;
  color: black;

}

.register {
  /*width: 100%;*/
  /*height: 100%;*/
  background-image: url("../../src/assets/img/bens_img/E-ClassL-Sport-Highlights4.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.register {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
}

.box {
  width: 400px;
  height: 520px;
  background-color: white;
  opacity: 0.9;
  border-radius: 10px;
  position: relative;
  top: calc(50vh - 240px);
  left: calc(50vw - 200px);
}

.el-icon-close {
  position: absolute;
  font-weight: bold;
  font-size: 20px;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.el-icon-close:hover {
  color: darkred;
}

.content {
  position: absolute;
  top: 40px;
  width: 280px;
  left: 60px;
}

.nav {
  font-size: 20px;
  height: 38px;
  border-bottom: 2px solid darkgrey;
}

.nav span {
  margin-left: 20px;
  color: darkgrey;
  user-select: none;
  cursor: pointer;
  padding-bottom: 10px;
  border-bottom: 2px solid darkgrey;
}

.nav > span.active {
  color: black;
  border-bottom: 3px solid black;
  padding-bottom: 9px;
}

.el-input, .el-button {
  margin-top: 40px;
}

.el-button {
  width: 100%;
  font-size: 18px;
}

.foot span {
  /*background-color: #42b983;*/
  float: right;
  margin-top: 20px;
  color: orange;
  cursor: pointer;
}

.sms {
  color: orange;
  cursor: pointer;
  display: inline-block;
  width: 70px;
  text-align: center;
  user-select: none;
}

.content h1 {
  margin-top: 30px;
  margin-bottom: -30px;
}

</style>