<template>
  <div id="app">
       <div>
      <Navagation />
    </div>
    <router-view/>
  </div>
</template>
<script>
import Navagation from '@/components/Navagation.vue'
export default {
  components:{
    Navagation
  }
}
</script>

<style scoped>
.clearfix::after{
  content:"";
  display:block;
  clear:both;
 }
</style>
