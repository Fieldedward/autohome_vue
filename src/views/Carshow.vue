<template>

  <div class="carshow">
    <HeaderView @headergetcars="headergetcars"></HeaderView>
    <div style="margin:0 auto;width: 1200px">
      <div>
        <el-row>
          <el-col :span="8" class="center">
            <el-input
                v-model="search"
                @focus="focus"
                @keyup.enter.native="searchHandler"
                placeholder="搜索"
            >
              <el-button slot="append" icon="el-icon-search" id="search" @click="searchHandler(search)"></el-button>
            </el-input>

          </el-col>
        </el-row>
      </div>

      <div class="carshow_right" style="float: left;">
        <el-row>
          <div class="order" style="width: 100%;margin-top:20px;float: left;text-align: left;border: #999999 solid 1px">
            <h1>品牌：
              <span @click="filtercar('search','奔驰')">奔驰</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span href="" @click="filtercar('search','宝马')">宝马</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span @click="filtercar('search','沃尔沃')">沃尔沃</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span @click="filtercar('search','兰博基尼')">兰博基尼</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span @click="filtercar('search','理想')">理想</span>&nbsp;&nbsp;&nbsp;&nbsp;

            </h1>
            <h1>价格：
              <span @click="filterprice('price','8-10')">8-10万</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span @click="filterprice('price','10-20')">10-20万</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span @click="filterprice('price','20-30')">20-30万</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span @click="filterprice('price','30-50')">30-50万</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span @click="filterprice('price','50-80')">50-80万</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span @click="filterprice('price','80-99999')">80万以上</span>&nbsp;&nbsp;&nbsp;&nbsp;
            </h1>

          </div>
          <div class="order" style="width: 100%;margin-top:5px;float: left;text-align: left;border: #999999 solid 1px">
            <h1>排序：
              <span @click="filterprice('ordering','orders')">默认</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span @click="filterprice('ordering','price')">价格</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span @click="filterprice('ordering','popular')">人气</span>&nbsp;&nbsp;&nbsp;&nbsp;
            </h1>
          </div>
        </el-row>
        <div>
          <el-row>
            <el-col :span="6" v-for="car in car_list" :key="car.name">
              <el-card :body-style="{ padding: '0px' }" class="course_card">
                <img :src="car.img_url_list" class="image" @click="gocarinfo(car.id)">
                <div style="padding: 20px;">
                  <div style="text-align: left;color: #999;font-size: 14px;margin: 0">
                    <a>{{ car.name }}</a>/
                    <a>{{ car.second_car_name }}</a>/
                    <a>{{ car.energy_type_name }}</a>/
                    <a>{{ car.factory_name }}</a>/
                    <a>库存：{{ car.stock_num }}</a>
                    <p>{{ car.factory_name }}</p>
                  </div>
                  <div class="bottom clearfix">
                    <time class="time"><span style="color: red">{{ car.price }}万</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                    </time>
                    <el-button type="text" class="button" @click="gocarinfo(car.id)">查看详情</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <div class="course_pagination block">
            <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="filter.page"
                layout="prev, pager, next"
                :total="count">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import HeaderView from "@/components/HeaderView";

export default {
  data() {
    return {
      search: "", //当前输入框的值
      isFocus: false, //是否聚焦
      car_list: [],
      params: {},
      count: 0,
      filter: {
        ordering: 'orders',
        page: 1,
      }
    };
  },
  watch: {
    'filter.page': function () {
      console.log(this.filter)
      this.get_car()
    }
  },
  created() {
    this.get_car()
    this.params = this.$route.params
  },


  methods: {
    handleCurrentChange(val) {
      this.filter.page = val
    },
    focus() {
      this.isFocus = true;
    },
    get_car() {
      this.params = this.$route.query
      let filter_type = Object.keys(this.params)[0]
      let filter_value = Object.values(this.params)[0]
      if (filter_type) {
        this.$axios.get(`http://127.0.0.1:8000/cars/show/?${filter_type}=${filter_value}`, {
          params: this.filter
        }).then(res => {
          this.car_list = res.data.results;
          this.count = res.data.count;
          this.previous = res.data.previous;
          this.next = res.data.next;
        }).catch(() => {
          this.$message({
            message: "获取车辆信息有误，请联系客服工作人员"
          })
        })
      } else {
        this.$axios.get(`http://127.0.0.1:8000/cars/show/`, {
          params: this.filter
        }).then(res => {
          this.car_list = res.data.results;
          this.count = res.data.count;
          this.previous = res.data.previous;
          this.next = res.data.next;
        }).catch(() => {
          this.$message({
            message: "获取车辆信息有误，请联系客服工作人员"
          })
        })
      }

    },
    headergetcars(args) {
      this.car_list = args.results
    },
    filtercar(type, value) {
      this.$set(this.filter, type, value)
      this.$axios.get(`http://127.0.0.1:8000/cars/search/`, {
        params: this.filter
      }).then(res => {
        // this.car_list = res.data.results;
        this.car_list = res.data.code
      }).catch(() => {
        this.$message({
          message: "获取车辆信息有误，请联系客服工作人员"
        })
      })
    },

    filterprice(type, value) {
      this.$set(this.filter, type, value)
      this.get_car()
    },
    gocarinfo(id) {
      this.$router.push(`/carinfo/${id}`)
    },
    searchHandler(value) {
      this.$set(this.filter, 'search', value)
      this.$axios.get(`http://127.0.0.1:8000/cars/search/`, {
        params: this.filter,
      }).then(res => {
        // this.car_list = res.data.results;
        this.car_list = res.data.code
      }).catch(() => {
        this.$message({
          message: "获取车辆信息有误，请联系客服工作人员"
        })
      })
    },
  },

  name: "Carshow",
  components: {
    HeaderView
  }
}
</script>

<style scoped>
.box-card {
  position: fixed;
}

.time {
  float: left;
  font-size: 18px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 200px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.course {
  margin-left: 20px;
  margin-right: 20px;
}

.course_card {
  margin: 10px;
}


.order h1 {
  margin-left: 60px;
  color: #090707;


  font-size: 16px;

}

a {
  color: #8d8282;
}

.left {
  margin-left: 200px;
}

.center {
  margin-top: 15px;
  float: right;
  margin-left: 500px;
}

#search {
  background-color: #0e0e0c;
  border-radius: 0%;
}

.search-title {
  color: #bdbaba;
  font-size: 15px;
  margin-bottom: 5px;
}

.remove-history {
  color: #bdbaba;
  font-size: 15px;
  float: right;
  margin-top: -22px;
}

#search-box {
  width: 300px;
  height: 200px;
  margin-top: 0px;
  padding-bottom: 20px;
}

</style>