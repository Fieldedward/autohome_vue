<template>
    <div class="left">
        <div style="background-color: white">

            <el-container style="height: 800px; border: 1px solid #eee;">

                <el-aside width="200px" style="margin-top: 1%">
                    <div style="width: 190px;background-color: white;padding: 5px;margin: auto">
                        <img v-model="userpic" v-bind:src="userpic" width="150px" height="150px"
                             style="border-radius: 300px;margin-left: 8%">
                        <br>
                        <br>
                        <p style="margin:0 auto;text-align: center" v-model="username">{{ username }}</p>
                    </div>

                    <br>
                    <br>
                    <el-menu :default-openeds="['1',]">
                        <el-submenu index="1">
                            <template slot="title"><i class="el-icon-message"></i>用户中心</template>
                            <el-menu-item-group>
                                <router-link class="alink" to="/user">
                                    <el-menu-item index="1-1">个人信息</el-menu-item>
                                </router-link>
                                <router-link class="alink" to="/updateicon">
                                    <el-menu-item index="1-2">修改头像</el-menu-item>
                                </router-link>
                                <!--                <router-link class="alink" to="/updateuserinfo">-->
                                <!--                  <el-menu-item index="1-3">修改信息</el-menu-item>-->
                                <!--                </router-link>-->
                                <el-menu-item index="1-3" @click="getCoupon">抽取优惠券</el-menu-item>
                                <router-link class="alink" to="/home">
                                    <el-menu-item index="1-4">返回首页</el-menu-item>
                                </router-link>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>


                <el-container style="background-color: white">
                    <el-main>
                        <router-view/>
                    </el-main>
                </el-container>
            </el-container>
        </div>

    </div>


</template>

<script>
    import UserView from "@/components/UserView";

    export default {
        name: "UserInfoView",
        components: {UserView},
        data() {
            return {
                user_info: {},
                user_id: "",
                userpic: '',
                username: '',

            }
        },
        methods: {
            getCoupon() {
                this.$axios.post('http://127.0.0.1:8000/coupon/random/', {
                    user_id: this.user_id
                }).then(res => {
                        if (res.data.code === 117) {
                            this.$message({
                                showClose: true,
                                message: '领取成功，请移步个人信息处查看，或等待2秒自动刷新',
                                type: 'success'
                            });
                            // this.$router.push('/user')
                            let _this = this
                            setTimeout(function () {
                                _this.$router.go(0)
                            }, 2000);
                        } else {
                            this.$message({
                                showClose: true,
                                message: '已经领取过了',
                                type: 'error'
                            });
                        }
                    }
                )
            }
        },
        created() {
            this.username = this.$cookies.get('username')
            this.userpic = this.$cookies.get('icon')
            this.user_id = this.$cookies.get('user_id')
            this.$axios({
                url: `http://127.0.0.1:8000/user/display/${this.user_id}/`,
                method: 'get',
                headers: {
                    'Authorization': 'jwt ' + this.$cookies.get('token')
                },
            }).then(res => {
                this.user_info = res.data
            })
        },
    }
</script>

<style scoped>


    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }

    .alink {

        text-decoration: none;
    }

    .userinfo {

    }

    .userinfo_icon {


        /*background: url("../assets/img/bens_img/homepage-pc.jpg") no-repeat;*/
    }

    .userinfo_icon img {
        width: 100%;
        border-radius: 50%;

    }

    .userinfo_box {
        margin: 0 auto;
        width: 80%;
        background: #f1cbcb;
    }

</style>