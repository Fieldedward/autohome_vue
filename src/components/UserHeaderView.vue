<template>
  <div class="head">
    <div class="logo">
      <h1 style="text-align: center;margin-left: 40px;margin-top: 50px;text-shadow: #999999;color:#111315">哈哈车城</h1>
    </div>
    <div class="nav">

      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
               text-color="F0FFFF">
        <el-submenu index="1" style="margin-top: 30px;width: 100px;height: 30px">
          <template slot="title" style="background-color: #f8f8f8;" >探索车型</template>
          <el-menu-item index="1-1">轿车</el-menu-item>
          <el-menu-item index="1-2">SUV</el-menu-item>
          <el-menu-item index="1-3">轿跑车&敞篷跑车</el-menu-item>
          <el-menu-item index="1-4">MPV</el-menu-item>
          <el-menu-item index="1-5">纯电动车</el-menu-item>
          <el-menu-item index="1-6">插电式混合动力</el-menu-item>

        </el-submenu>
        <el-submenu index="2" style="margin-top: 30px;width: 100px;height: 30px">
          <template slot="title">官方商城</template>
          <el-menu-item index="2-1">购新车</el-menu-item>
          <el-menu-item index="2-2">买二手</el-menu-item>
          <el-menu-item index="2-3">找售后</el-menu-item>
          <el-menu-item index="2-4">买互联</el-menu-item>

        </el-submenu>
        <el-submenu index="3" style="margin-top: 30px;width: 100px;height: 30px">
          <template slot="title">车主服务</template>
          <el-menu-item index="3-1">服务指南</el-menu-item>
          <el-menu-item index="3-2">保养维修及救援</el-menu-item>
          <el-menu-item index="3-3">选装配件及精品</el-menu-item>
          <el-menu-item index="3-4">EQ客户服务</el-menu-item>

        </el-submenu>
        <el-submenu index="4" style="margin-top: 30px;width: 100px;height: 30px">
          <template slot="title">科技创新</template>
          <el-menu-item index="4-1">设计美学</el-menu-item>
          <el-menu-item index="4-2">动力与效能科技</el-menu-item>
          <el-menu-item index="4-3">智能科技</el-menu-item>
          <el-menu-item index="4-4">豪华体验科技与工艺</el-menu-item>
          <el-menu-item index="4-5">奔驰制造</el-menu-item>

        </el-submenu>
        <el-submenu index="5" style="margin-top: 30px;width: 100px;height: 30px">
          <template slot="title">奔驰天下</template>
          <el-menu-item index="5-1">品牌天地</el-menu-item>
          <el-menu-item index="5-2">品牌互动</el-menu-item>
          <el-menu-item index="5-3">客户承诺</el-menu-item>
          <el-menu-item index="5-4">企业社会责任</el-menu-item>
          <el-menu-item index="5-5">Mercedes me</el-menu-item>

        </el-submenu>
      </el-menu>



    </div>
    <div class="login">
      <div v-if="username && username.length>0">
        <el-avatar shape="square" size="medium" :src="squareUrl" style="vertical-align: middle"></el-avatar>&nbsp;
          <span>{{ username }}</span>&nbsp;
          <span class="line">|</span>&nbsp;
          <span @click="handleLogout">注销</span>
        </div>

      <div v-else>
        <router-link to="/normal/login"><span>登录&nbsp;&nbsp;</span></router-link>
        <span class="line">|</span>
        <router-link  to="/normal/register"><span>&nbsp;&nbsp;注册</span></router-link>
      </div>
    </div>
  </div>

</template>

<script>
import LoginView from "@/components/LoginView";
import RegisterView from "@/components/RegisterView";

export default {
  name: "UserHeaderView",
  data() {
    return {
      url_path: sessionStorage.url_path || '/', // 定义了一个变量标志当前所在的路径
      is_login: false,
      is_register: false,
      username: '',
      is_search_tip: true,
      // LoginUrl: normal/login,
      activeIndex: '1',
      squareUrl:'',
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
  },
  created() {
    sessionStorage.url_path = this.$route.path;
    this.url_path = this.$route.path;
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
  height: 100px;
  background-color: #f8f5f5;
  margin:0;
}


.head {
  color: #0a1010;
  height: 100px;
  background-color: #f5f1f1;
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
  height: 90px;
  width: 700px;
  float: left;
  margin-left:200px;
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