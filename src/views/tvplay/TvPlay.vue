<template>
  <div class>
    <ul class="list">
      <li  @click="goPlayer(item.id)" class="clearfix" v-for="item in dataList" :key="item.id">
        <div class="left">
          <img :src="item.cover.url"/>
        </div>
        <div class="right">
          <p class="head">{{item.title}}</p>
          <p class="information">{{item.info}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      total:1,
      isContinue:true,
      start:0,
      dataList: []
    };
  },
  methods: {
    listenScroll(){
      let htmlDom = document.documentElement;
      window.onscroll = ()=>{
          let hHeight=htmlDom.clientHeight;
          let scrollHeight = htmlDom.scrollHeight;
          let scrollTop = htmlDom.scrollTop;
          if(hHeight+scrollTop+10>=scrollHeight){
            this.getData()
          }
      }
    },
    goPlayer(id){
       this.$router.push("/tvplayer/"+id)
    },
    getData() {
      if(this.isContinue&&this.total>this.start&&this.start<40){
      let requestUrl =
        `https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items?start=${this.start}&count=10`;
      let birdUrl = "https://bird.ioliu.cn/v2?url=";
      this.isContinue=false;
      axios.get(birdUrl + requestUrl)
        .then(res => {
          console.log(res)
          
          this.dataList=[...(this.dataList),...(res.data.subject_collection_items)];
          this.start += 10;
          this.isContinue=true;
          this.total=res.data.total;
        })
        .catch(function() {
          console.log("error");
        });
    }
    }
  },
  created() {
    this.getData();
    this.listenScroll();
  },

  mounted() {}
};
</script>
<style scoped>
.list .left {
  transform: translateX(-30%);
  float: left;
  width: 40%;
}
.list .right {
  float: left;
  width: 60%;
 /* margin-right: 0.2rem */
}
.list .right .head{
  margin: 0;
  font-size:0.6rem; 
  
}
.list .right .information{
  margin: 0;
  font-size:0.3rem;
  
}
img{
  width:80%;
  margin-left:0.2rem
}
ul{
  z-index:10;
}
li{
  width:100%;
  height:3.5rem;
  border-bottom:1px solid rgba(0, 0, 0, 0.493);
  list-style: none;
}

</style>