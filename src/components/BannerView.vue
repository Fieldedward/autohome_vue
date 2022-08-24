<template>
  <div class="banner">
    <el-carousel :interval="5000" arrow="always" :height="banH +'px'">
      <el-carousel-item v-for="item in imageList">
        <a :href="item.link"><img :src="item.image" alt=""></a>
      </el-carousel-item>
    </el-carousel>
  </div>

</template>

<script>
export default {
  name: "BannerView",
  data() {
    return {
      banH:300,
      imageList:[]
    }

  },
  methods: {
    setbanH() {
      this.banH = 700
    }
  },
  created(){
    this.$axios.get('http://127.0.0.1:8000/home/banners/').then(res=>{
      console.log(res.data)
      this.imageList = res.data
    })
  },
  mounted() {

    this.setbanH()

    window.addEventListener('resize', () => {

      this.setbanH()

    }, false)

  },


}
</script>

<style scoped>


.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  height: inherit;
}

</style>