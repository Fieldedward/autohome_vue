<template>
  <div style="color: black;width: 550px;height:300px;background-color: #fdf3ec;margin: 10px auto;text-align: left;text-indent: 2em">
    <div class="order-info" style="color: black;margin-top: 10px;position: absolute">
      <br>
      <p class="info" style="margin-top: 10px"><b>订单号：</b><span>{{ order_obj.out_trade_no }}</span></p>
      <p class="info"><b>交易状态：</b><span>{{ order_status }}</span></p>
      <p class="info"><b>订单生成时间：</b><span><span>{{ order_obj.created_time }}</span></span></p>
      <p class="info"><b>订单支付方式：</b><span><span>{{ order_obj.pay_type }}</span></span></p>
      <p class="info"><b>订单价格：</b><span><span>{{ order_obj.price }}万元</span></span></p>
      <button @click="check" class="order" style="height: 30px;background-color: #8fa6c4;border: none;border-radius: 5px">刷新订单状态</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderDetailView",
  props: ['order',],
  methods: {
    check() {
      this.$axios.get('http://127.0.0.1:8000/order/success/', {
        headers: {'Authorization': 'jwt ' + this.$cookies.get('token')},
        params: {'out_trade_no': this.order_obj.out_trade_no}
      }).then(res => {
        this.order_status = res.data.msg
      })
    }
  },
  data(){
    return{
      order_obj:this.order,
      order_status:this.order.order_status,
    }
  },
}
</script>

<style scoped>
.order{
  position: relative;
  left: 200px;
}


</style>