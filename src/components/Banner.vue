<template>
  <swiper :options="swiperOption">
    <swiper-slide><a href="javascript:;"><img src="/static/21.jpg" alt="" class="img"></a></swiper-slide>
    <swiper-slide><a href="javascript:;"><img src="/static/17.jpg" alt="" class="img"></a></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>

  export default {
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true
          }
        }
      }
    },
    mounted(){

    }
  }
</script>
<style>
  .swiper-container{
    margin: 75px auto 0!important;
  }
  .img{
    width: 100%;
  }
</style>