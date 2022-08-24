<template>
  <button @click="gobuy" class="buy">buy</button>
</template>

<script>
export default {
  name: "Gobuy",
  data() {
    return {}
  },
  methods: {
    gobuy() {
      this.$axios.post('http://127.0.0.1:8000/order/buy/', {
            "subject": "好东西",
            "price": "54.90",
            "car_id": 5
          },
          {headers: {'Authorization': 'jwt ' + this.$cookies.get('token')}}
      ).then(res => {
        if (res.data.code == 100) {
          let pay_url = res.data.pay_url
          console.log(res.data.pay_url)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped>


</style>