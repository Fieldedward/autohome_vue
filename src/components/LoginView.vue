<template>
  <div class="login">
    <div class="box">
      <i class="el-icon-close" @click="close_login"></i>
      <div class="login_type">
        <span :class="{active: login_type === 'is_normal'}" @click="change_login_type('is_normal')">用户登录</span>
        <span :class="{active: login_type === 'is_seller'}" @click="change_login_type('is_seller')">商家用户登录</span>
      </div>
      <div class="content" v-if="login_type==='is_normal'">

        <div class="nav">
          <span :class="{active: login_method === 'is_pwd'}" @click="change_login_method('is_pwd')">密码登录</span>
          <span :class="{active: login_method === 'is_sms'}"
                @click="change_login_method('is_sms')">短信登录</span>
        </div>
        <el-form v-if="login_method === 'is_pwd'">
          <el-input
              placeholder="用户名/手机号/邮箱"
              prefix-icon="el-icon-user"
              v-model="username"
              clearable>
          </el-input>
          <el-input
              placeholder="密码"
              prefix-icon="el-icon-key"
              v-model="password"
              clearable
              show-password>
          </el-input>
          <el-button type="primary" @click="Mullogin">登录</el-button>
        </el-form>
        <el-form v-if="login_method === 'is_sms'">
          <el-input
              placeholder="手机号"
              prefix-icon="el-icon-phone-outline"
              v-model="mobile"
              clearable
              @blur="check_mobile">
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
          <el-button type="primary" @click="MobileLogin">登录</el-button>
        </el-form>
        <div class="foot">
          <router-link to="/normal/register"><span>立即注册</span></router-link>
        </div>
      </div>
      <div class="content" v-if=" login_type==='is_seller'">
        <h1>欢迎商家登录</h1>

        <div class="nav">
          <span :class="{active: login_method === 'is_pwd'}" @click="change_login_method('is_pwd')">密码登录</span>
          <span :class="{active: login_method === 'is_sms'}"
                @click="change_login_method('is_sms')">短信登录</span>
        </div>
        <el-form v-if="login_method === 'is_pwd'">
          <el-input
              placeholder="商家名/手机号/邮箱"
              prefix-icon="el-icon-user"
              v-model="username"
              clearable>
          </el-input>
          <el-input
              placeholder="密码"
              prefix-icon="el-icon-key"
              v-model="password"
              clearable
              show-password>
          </el-input>
          <el-button type="primary" @click="SellerMullogin">登录</el-button>
        </el-form>

        <el-form v-if="login_method === 'is_sms'">
          <el-input
              placeholder="手机号"
              prefix-icon="el-icon-phone-outline"
              v-model="mobile"
              clearable
              @blur="check_mobile">
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
          <el-button type="primary" @click="SellerMobileLogin">登录</el-button>
        </el-form>

        <div class="foot">
          <router-link to="/normal/register"><span>立即注册</span></router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      mobile: '',
      sms: '',
      login_method: 'is_pwd',
      sms_interval: '获取验证码',
      is_send: false,
      login_type: 'is_normal'
    }
  },
  methods: {
    close_login() {
      this.$router.push({name: 'home'});
    },
    change_login_method(method) {
      this.login_method = method;
    },
    change_login_type(method) {
      this.login_type = method;

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
        if (res.data.code != 100) {
          this.$message.warning(res.data.msg + ",请重新输入")
          this.mobile = ''
        }
      })
    },
    // 发送短信
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
    //  多用户登录
    Mullogin() {
      //  如果用户名和密码都存在
      if (this.username && this.password) {
        this.$axios.post('http://127.0.0.1:8000/user/normal/login/', {
          username: this.username,
          password: this.password
        }).then(res => {
          if (res.data.code === 100) {
            //  将数据存到cookie中
            this.$cookies.set('username', res.data.username, '7d')
            this.$cookies.set('token', res.data.token, '7d')
            this.$cookies.set('icon', res.data.icon, '7d')
            this.$cookies.set('user_id', res.data.user_id, '7d')
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
          message: '用户名或密码不能为空',
          type: 'warning'
        });

      }


    },
    // 商家登录多用户登录
    SellerMullogin() {
      //  如果用户名和密码都存在
      if (this.username && this.password) {
        this.$axios.post('http://127.0.0.1:8000/user/seller/sellerlogin/', {
          username: this.username,
          password: this.password
        }).then(res => {
          if (res.data.code === 100) {
            //  将数据存到cookie中
            this.$cookies.set('username', res.data.username, '7d')
            this.$cookies.set('token', res.data.token, '7d')
            this.$cookies.set('icon', res.data.icon, '7d')
            this.$cookies.set('user_id', res.data.user_id, '7d')

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
          message: '用户名或密码不能为空',
          type: 'warning'
        });
      }
    },
    //  手机号登录
    MobileLogin() {
      //   如果有值
      if (this.mobile && this.sms) {
        this.$axios.post('http://127.0.0.1:8000/user/normal/login2/', {
          mobile: this.mobile,
          code: this.sms
        }).then(res => {

          if (res.data.code == 100) {
            //  将数据保存到cookie中
            this.$cookies.set('username', res.data.username, '7d')
            this.$cookies.set('token', res.data.token, '7d')
            this.$cookies.set('icon', res.data.icon, '7d')
            this.$cookies.set('user_id', res.data.user_id, '7d')

            this.$router.push('/')
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            });
          }
        })
      } else {
        this.$message({
          message: '手机号或验证码不能为空',
          type: 'warning'
        });
      }
    },
    SellerMobileLogin() {
      //   如果有值
      if (this.mobile && this.sms) {
        this.$axios.post('http://127.0.0.1:8000/user/seller/sellerlogin2/', {
          mobile: this.mobile,
          code: this.sms
        }).then(res => {
          if (res.data.code == 100) {
            //  将数据保存到cookie中
            this.$cookies.set('username', res.data.username, '7d')
            this.$cookies.set('token', res.data.token, '7d')
            this.$cookies.set('icon', res.data.icon, '7d')
            this.$cookies.set('user_id', res.data.user_id, '7d')

            this.$router.push('/')
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning'
            });
          }
        })
      } else {
        this.$message({
          message: '手机号或验证码不能为空',
          type: 'warning'
        });
      }
    },


  },


}
</script>


<style scoped>
.login_type span {
  float: left;
  height: 30px;
  width: 120px;
  margin-left: 90px;
  margin-top: 30px;

  /*background-color: azure;*/
  font-size: 20px;
  color: black;

}

.login {
  /*width: 100%;*/
  /*height: 100%;*/
  background-image: url("../../src/assets/img/bens_img/KV.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.login {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
}

.box {
  width: 500px;
  height: 520px;
  background-color: #f5f5f5;
  border-radius: 10px;
  opacity: 0.8;

  position: relative;
  top: calc(50vh - 210px);
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
  margin-top: 80px;
  position: absolute;
  top: 40px;
  width: 380px;
  left: 60px;
}

.nav {
  font-size: 20px;
  height: 38px;
  border-bottom: 2px solid darkgrey;
}

.nav > span {
  margin: 0 20px 0 35px;
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
  margin-top: -30px;
}
</style>