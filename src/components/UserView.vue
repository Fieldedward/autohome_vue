<template>
    <div>
        <div class="show">
            <br>
            <p style="margin-left:4%;margin-top: 5%">昵称:<span
                    style="margin-left: 3%;line-height:20px">{{user_info.username}}</span></p>
            <p style="margin-left:4%;margin-top: 5%">手机号:<span
                    style="margin-left: 3%;line-height:20px">{{user_info.mobile}}</span></p>
            <p style="margin-left:4%;margin-top: 5%">邮箱:<span
                    style="margin-left: 3%;line-height:20px">{{user_info.email || '空'}}</span></p>
            <p style="margin-left:4%;margin-top: 5%">认证:<span
                    style="margin-left: 3%;line-height:20px">{{user_info.real_user}}</span></p>
            <p style="margin-left:4%;margin-top: 5%">优惠券:<span
                    style="margin-left: 3%;line-height:20px" v-for="coupon in couponList" v-show="coupon<1">{{coupon}}折</span></p>
        </div>
    </div>


</template>

<script>
    // import HeaderView from "@/components/HeaderView";

    export default {

        name: "UserView",
        // components: {HeaderView},
        data() {
            return {
                user_info: '',
                couponList: '',
            }
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
            })
            // 获取优惠券
            this.$axios.get(`http://127.0.0.1:8000/coupon/random/${this.$cookies.get('user_id')}/`).then(
                res=>{
                    this.couponList = res.data
                }
            )
        }
    }
</script>

<style scoped>
    .body {
        background-color: #ea8c8c;
    }

    .show {
        line-height: 40px;
        margin: 30px;
        width: 400px;
        height: 350px;
        text-align: left;

        /*border: 5px solid lightcyan;*/
        transition: all 1s;
        border-radius: 10px;
        background-color: #e8e2e2;

    }

    /*.show:hover{*/
    /*  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.4);*/
    /*  margin-top: 90px;*/
    /*}*/

</style>