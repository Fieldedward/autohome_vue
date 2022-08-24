<template>
  <div class="head">
    <div class="logo">

      <h1 style="text-align: center;margin-left: 20px;margin-top: 50px;text-shadow: #999999;color:aliceblue" @click="gohome">哈哈车城</h1>

    </div>
    <div class="nav">

      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
               text-color="F0FFFF" background-color="black">
        <el-submenu index="1" style="margin-top: 70px;width: 200px;height: 50px">
          <template slot="title" style="background-color: black;">探索车型</template>
          <el-menu-item index="1-1" @click="getcars('car_type','0')">轿车</el-menu-item>
          <el-menu-item index="1-2" @click="getcars('car_type','1')">SUV</el-menu-item>
          <el-menu-item index="1-3" @click="getcars('car_type','2')">轿跑车&敞篷跑车</el-menu-item>
          <el-menu-item index="1-4" @click="getcars('energy_type',0)">纯电动车</el-menu-item>
          <el-menu-item index="1-5" @click="goshowcars">全部车型</el-menu-item>

        </el-submenu>
        <el-submenu index="2" style="margin-top: 70px;width: 200px;height: 50px">
          <template slot="title">我要买车</template>
          <el-menu-item index="2-1" @click="getcars('second_car','0')">购新车</el-menu-item>
          <el-menu-item index="2-2" @click="getcars('second_car','1')">买二手</el-menu-item>

        </el-submenu>
        <el-submenu index="3" style="margin-top: 70px;width: 200px;height: 50px">
          <template slot="title">我要卖车</template>
          <el-menu-item index="3-1" @click="getApprovalCar">提交车辆信息</el-menu-item>
        </el-submenu>
      </el-menu>


    </div>
    <div class="login">
      <div v-if="username && username.length>0">
        <el-avatar shape="square" size="medium" :src="squareUrl" style="vertical-align: middle" @click="gouserinfo"></el-avatar>&nbsp;
        <span @click="gouserinfo">{{ username }}</span>&nbsp;
        <span class="line">|</span>&nbsp;
        <span @click="handleLogout">注销</span>
      </div>

      <div v-else>
        <router-link to="/normal/login"><span>登录&nbsp;&nbsp;</span></router-link>
        <span class="line">|</span>
        <router-link to="/normal/register"><span>&nbsp;&nbsp;注册</span></router-link>
      </div>
    </div>
  </div>

</template>

<script>
import LoginView from "@/components/LoginView";
import RegisterView from "@/components/RegisterView";

export default {
  name: "HeaderView",
  data() {
    return {
      url_path: sessionStorage.url_path || '/', // 定义了一个变量标志当前所在的路径
      is_login: false,
      is_register: false,
      username: '',
      is_search_tip: true,
      // LoginUrl: normal/login,
      activeIndex: '1',
      squareUrl: '',
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleLogout() {
      this.$cookies.set('username', '')
      this.$cookies.set('token', '')
      this.$cookies.set('icon', '')
      this.username = ''
    },
    gohome() {
      this.$router.push('/home')
    },
    goshowcars() {

      if (this.url_path.match('^/carshow')) {
        location.reload()
      } else {
        this.$router.push('/carshow')
      }
    },
    getcars(choice_type, value) {
      if (this.url_path.match('^/carshow')) {
        this.$axios.get(`http://127.0.0.1:8000/cars/show/?${choice_type}=${value}`, {
          params: {ordering: 'orders',}
        }).then(res => {
          // 将获取的车辆的数据传递给展示的页面
          this.$emit("headergetcars",res.data)
        })
      } else {
        this.$router.push(`/carshow/?${choice_type}=${value}`)
      }
    },
    gouserinfo(){
      this.$router.push('/user')
    },
    getApprovalCar(){
      this.$router.push('/seller/approval')
    }
  },
  created() {
    sessionStorage.url_path = this.$route.path;
    this.url_path = this.$route.path;
    this.username = this.$cookies.get('username')
    this.squareUrl = this.$cookies.get('icon')
  },
  mounted() {
    this.username = this.$cookies.get('username')
    this.squareUrl = this.$cookies.get('icon')
  },
  components: {
    LoginView, RegisterView
  }

}
</script>

<style scoped>

.el-menu-demo {
  height: 130px;
  background-color: black;
  margin: 0;
}


.head {
  color: #f0ffff;
  height: 130px;
  background-color: #000000;
}

.logo {
  float: left;
}

/*.nav ul li {*/
/*  color: azure;*/
/*  list-style: none;*/
/*  float: left;*/
/*  width: 100px;*/
/*  margin-top: 80px;*/
/*  !*border: solid red 1px;*!*/
/*  margin-left: 10px;*/
/*  font-family: sans-serif;*/
/*}*/

.nav {
  /*border: solid blue 1px;*/
  height: 120px;
  width: 700px;
  float: left;
  margin-left: 200px;
  font-size: 18px;
  color: azure;

}

.login {
  float: right;
  margin-top: 60px;
  color: azure;
  margin-right: 50px;

}


/*ul {*/
/*  list-style: none;*/
/*  display: flex;*/
/*  flex-wrap: wrap;*/
/*  !* 相对定位-父 *!*/
/*  position: relative;*/
/*}*/

/*.nav_li li {*/
/*  margin: 10px;*/

/*}*/

/*!* 隐藏 *!*/
/*.nav_li ul ul {*/
/*  !* 绝对定位-子 *!*/
/*  position: absolute;*/
/*  background: #CCCCCC;*/
/*  display: none;*/
/*}*/

/*!* 显示 *!*/
/*.nav_li li:hover ul {*/
/*  display: block;*/
/*}*/

</style>