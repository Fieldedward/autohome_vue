<template>
  <div>
    <HeaderView></HeaderView>
    <div style="width: 100%;background-color: #42b983">

    </div>

    <div class="carinfo">

      <div class="carinfo_left">
        <br><br>
        <el-carousel :interval="5000" arrow="always" height="600px">
          <el-carousel-item v-for="item in 3" :key="item">
            <img :src=car_info.img_url_list alt="">
          </el-carousel-item>
        </el-carousel>

      </div>
      <div class="carinfo_right" style="text-align: left;font-size: 18px">
        <h1>{{ car_info.name }}</h1>
        <p style="color: red;font-size: 36px;font-weight: bold">￥{{ car_info.price }}万</p>

        <div class="car_box">
          <ul>
            <li>车型</li>
            <li>能源类型</li>
            <li>生产方式</li>
            <li>排量</li>
          </ul>
          <ul class="car_li">
            <li>{{ car_info.second_car_name }}</li>
            <li>{{ car_info.energy_type_name }}</li>
            <li>{{ car_info.production_mode_name }}</li>
            <li>{{ car_info.car_info_detail.emission_standard_name }}</li>
          </ul>

        </div>
        <div>
          <div class="car_shop">
            <div style="float: left;background-color: #fff0f0;width: 500px;text-indent:2em">
              <h3>{{ car_info.distributors.name }}</h3>
              <p>地址：{{ car_info.distributors.addr }}</p>
              <p>联系电话：{{ car_info.distributors.tel }}</p>
            </div>
            <div class="img" style="float: right;width: 120px;">
              <img src="../assets/img/Benz.png" alt="">
            </div>
          </div>
        </div>
        <div style="clear: both">
        </div>
        <button style="width: 200px;height: 50px;background-color: orange;margin-top: 30px; " @click="gobuy">立即购买
        </button>
        <!--        <button style="width: 200px;height: 50px;background-color: orange; margin-left:50px">立即抢购</button>-->
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
      </div>
      <div class="cardetail">


      </div>


    </div>


  </div>

</template>

<script>
import HeaderView from "@/components/HeaderView";

export default {
  name: "CarInfoView",
  components: {HeaderView},
  data() {
    return {
      car_info: {},
      tabIndex: 2,
      car_id: 0,
      // 当前选项卡显示的下标
    }

  },

  methods: {
    // 获取车辆id
    get_carid() {
      this.car_id = this.$route.params.pk
    },
    get_carinfo() {
      this.$axios.get(`http://127.0.0.1:8000/cars/show/${this.car_id}/`).then(res => {
        this.car_info = res.data
        console.log(res.data)
      })
    },
    add_car_popular() {
      this.$axios.get(`http://127.0.0.1:8000/cars/car_detail/${this.car_id}/`).then(res => {
      })
    },
    gobuy() {
      let car_data_buy = {
        "subject": this.car_info.name,
        "price": this.car_info.price,
        "car_id": this.car_id,
      }
      this.$axios.post('http://127.0.0.1:8000/order/buy/', car_data_buy,
          {headers: {'Authorization': 'jwt ' + this.$cookies.get('token')}}
      ).then(res => {
        if (res.data.code == 100) {
          let pay_url = res.data.pay_url
          location.href = pay_url
        } else {
          this.$message.error(res.data.msg)
        }
      })

    }

  },
  created() {
    this.get_carid()
    this.get_carinfo()
    this.add_car_popular()
  },

}
</script>

<style scoped>
.car_li {
  font-size: 20px;
  color: black;
  font-weight: bolder;
}

.img img {
  width: 200%;
}

.car_shop {
  margin-top: 30px;
  width: 630px;

  line-height: 50px;


}

.car_box {
  margin-top: 30px;
  /*border: #999999 solid 1px;*/
  background-color: #f8f8f8;
  width: 600px;
  height: 100px;


}

.car_box li {
  margin-top: 10px;
  float: left;
  width: 140px;
  height: 50px;
}

.cardetail {
  width: 1200px;
  margin: 0 auto;
  height: 500px;
}

.carinfo_left {
  margin-left: 50px;
  /*background-color: chartreuse;*/
  width: 660px;
  margin-top: 50px;
  border-radius: 20px;
  height: 500px;
  /*border: #42b983 solid  1px;*/

  float: left;
}

.carinfo_left img {
  width: 100%;
}

.carinfo_right {
  margin-top: 30px;
  margin-left: 20px;
  /*background-color: aqua;*/
  width: 450px;

  float: left;
}

.course-tab {
  width: 100%;
  background: #fff;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px 0 #f0f0f0;

}

.course-tab .tab-list {
  width: 1200px;
  margin: auto;
  color: #4a4a4a;
  overflow: hidden;
}
</style>