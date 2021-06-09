<template>
  <div>
     <h1>{{playerInfo.title}}</h1>
</div>
</template>

<script>
import axios from'axios';
export default {
  data() {
    return {
     playerInfo:{

     }
    };
  },
  methods:{
    getData(id){
      let requestUrl = 'https://m.douban.com/rexxar/api/v2/tv/'+id;
      let birdUrl='https://bird.ioliu.cn/v2?url=';
      axios.get(birdUrl+requestUrl).then((res)=>{
        this.playerInfo=res.data
      })
    }
  },
  created() {
    this.getData(this.$route.params.id);
  },
  
  mounted() {}
};
</script>
<style scoped>
.text{
  padding-top:1rem;
}

</style>