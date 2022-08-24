import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/components/LoginView";
import RegisterView from "@/components/RegisterView";
import GetUserOrderView from "@/views/GetUserOrderView";
import Carshow from "@/views/Carshow";
import CarInfoView from "@/views/CarInfoView";
import Gobuy from "@/components/Gobuy";
import paysuccess from "@/views/paysuccess";
import UserInfoView from "@/views/UserInfoView";
import UserView from "@/components/UserView";
import UpdateIcon from "@/components/UpdateIcon";
import UpdateUserInfo from "@/components/UpdateUserInfo";
import SubmitApprovalCarView from "@/views/SubmitApprovalCarView";
import OrderDetailView from "@/components/OrderDetailView";


Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView
    },
    {
        path: '/normal/login',
        name: 'normal_logon',
        component: LoginView
    },
    {
        path: '/normal/register',
        name: 'norma_register',
        component: RegisterView
    },
    {
        path: '/carshow',
        name: 'carshow',
        component: Carshow
    },
    {
        path: '/carinfo/:pk',
        name: 'carinfo',
        component: CarInfoView
    },
    {
        path: '/pay/success',
        name: 'paysuccess',
        component: paysuccess
    },
    {
        path: '/test',
        name: 'test',
        component: OrderDetailView
    },

    {
        path: '/buy',
        name: 'buy',
        component: Gobuy
    },
    {

        path: '/orders/:user_id',
        name: 'orders',
        component: GetUserOrderView
    },
    {
        path: '/userinfo',
        name: 'userinfo',
        component: UserInfoView,
        children: [
            {
                path: '/user',
                name: 'user',
                component: UserView
            },
            {
                path: '/updateicon',
                name: 'updateicon',
                component: UpdateIcon
            },
            {
                path: '/updateuserinfo',
                name: 'updateuserinfo',
                component: UpdateUserInfo
            },
        ]
    },
    {


        path: '/seller/approval',
        name: 'approval',
        component: SubmitApprovalCarView
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
