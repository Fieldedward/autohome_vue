<template>
  <div class="home">
    <HeaderView></HeaderView>
    <BannerView></BannerView>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import HeaderView from "@/components/HeaderView";
import BannerView from "@/components/BannerView";

export default {
  name: 'HomeView',
  components: {
    HeaderView,
    HelloWorld,
    BannerView,
  },

}
</script>
