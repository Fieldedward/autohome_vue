<template>
  <div>
    <Header/>
    <div v-if="orders_list.length===0">订单为空</div>
    <div v-for="order in orders_list">
      <OrderDetail :order="order"></OrderDetail>
      <br>
    </div>
  </div>
</template>

<script>
import Header from "@/components/HeaderView";
import OrderDetail from "@/components/OrderDetailView";
export default {
  name: "GetUserOrderView",
  data() {
    return {
      user_id: '',
      orders_list: [],
    }
  },
  components: {
    Header,
    OrderDetail,
  },
  created() {
    this.user_id = this.$route.params.user_id
    this.$axios.get(`http://127.0.0.1:8000/order/getorders/?user_id=${this.user_id}`, {
      headers: {'Authorization': 'jwt ' + this.$cookies.get('token')}
    }).then(res => {
      this.orders_list = res.data.orders
    })
  },

}
</script>

<style scoped>

</style>