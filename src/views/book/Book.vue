<template>
  <div>
    <div class="text">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in slider" :key="item.id">
         <img class="sliderImg" :src="'https://images.weserv.nl/?url='+item.cover.url" />
        </el-carousel-item>
      </el-carousel>
    </div>     
     <div class="moddle">
    <el-tabs v-model="activeName" :stretch='true' @tab-click="handleClick">
    <el-tab-pane label="虚构类" name="nonfiction"></el-tab-pane>
    <el-tab-pane label="非虚构类" name="fiction"></el-tab-pane>
    </el-tabs>
    </div>
    <div class="book">
       <ul>
   
         <li  v-for="item in book" :key="item.id">
           <el-row :gutter="24">
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                     <img class="bookImg" :src="'https://images.weserv.nl/?url='+item.cover.url" />
                  </div>
                </el-col>
                 <el-col :span="16">
                   <div class="grid-content bg-purple">
                      <div class="title">{{item.title}}</div>
                      <div class="info">{{item.info}}</div>
                      <!-- <div class="score">{{item.rating.value}}</div> -->

                   </div>
                  </el-col>
             </el-row>
        </li>
       </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {

       activeName: 'fiction',
      slider:[],
      book:[]
    };
  },
  methods:{
       handleClick() {
        this.getData(this.activeName);
      },
   getData(type){
      let birdUrl= "https://bird.ioliu.cn/v2?url=";
      let requestUrl =`https://m.douban.com/rexxar/api/v2/subject_collection/book_${type}/items?start=0&count=10`;
      axios.get(birdUrl+requestUrl).then(res=>{
                console.log(res)
                this.slider=res.data.subject_collection_items.slice(0,5)
                this.book=res.data.subject_collection_items
      })
   }
  },
  created() {
    this.getData('fiction');
  },

  mounted() {}
};
</script>
<style scoped>
*{
  margin:0;
  padding:0
}
.text{
   padding-top:1rem;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.sliderImg{
  width:100%;
}
.bookImg{
  width:100%;
  height:100%;
  /* transform:translate(20%); */
}
.title{
font-size:0.5rem;
/* transform:translate(7%) */
}
.info{
font-size:0.25rem;
/* transform:translate(7%); */
}
.moddle{
   margin:10px
}
/* li{
  border-bottom:1px solid black;
  height:3rem;
  list-style:none;
  padding-bottom:1rem;
   padding-top:0.5rem;
} */
</style>