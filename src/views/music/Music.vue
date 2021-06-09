<template>  
   
  <div class="text"> 
    
    <div class="music-auto">
      <aplayer style=" opacity: 0.7;" :music="musicInfo" />
    </div>
    <div class="content">
      <div class="one" style="color:blue">正在播放:{{musicInfo.title}}</div>
      <div class="one" style="color:blue;">演唱:{{musicInfo.artist}}</div>
    </div>
    <div class="music-list">
      <div class="box">
      <div class="head1">序号</div> 
      <div class="head2">歌曲名称</div> 
      <div class="head3">歌手名称</div>
      </div>
       <ul>
         <li @click="musicPlayer(item.id)" v-for="(item,index) in musicList" v-bind:key="item.id">
           <div class="num">{{index+1}}</div>
           <div class="songname">{{item.name}}</div>
           <div class="name">{{item.ar[0].name}}</div>
         </li>
       </ul>
   </div>

</div>
</template>

<script>
import aplayer from 'vue-aplayer';
import axios from 'axios';
export default {
  components:{
    aplayer
  },
  data() {
    return {
      musicInfo:{
        title: '月牙湾',
        artist: 'F.I.R.',
        src: 'http://m10.music.126.net/20200928195913/5170c90d413edf388907ed4e8cb44f68/ymusic/0e0b/550b/030f/9a73e40a80bac68781c14ead44320051.mp3',
        pic: 'http://p1.music.126.net/YoYSITiPZHyBT6lCR8SHBA==/109951163827991091.jpg',
      },
      musicList:[]
    };
  },
  methods:{
    getData(){
      // let thisId="5257929095"
      //  let thisId="5348016049"
        let thisId="5348011138"
      // let thisId="2578068117"
      
      // let thisId="39328953"//酷狗
    //  let thisUrl="http://www.kugou.com/yy/album/single/aid="+thisId ;//酷狗
      let thisUrl="https://bird.ioliu.cn/netease/playlist?id="+thisId;
      axios.get(thisUrl).then((res)=>{
           console.log(res)
           this.musicList=res.data.playlist.tracks
      }) 
    },
    musicPlayer(id){
       let thisUrl="https://bird.ioliu.cn/netease/song?id="+id;
       let musicObj={}; 
      axios.get(thisUrl).then(res=>{
        musicObj={  
        title: res.data.data.name,
        artist: res.data.data.ar[0].name,
        src: res.data.data.mp3.url,
        pic: res.data.data.al.picUrl,
        }
        this.musicInfo=musicObj;
      })
    },
  },
 //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getData();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};

</script>
<style scoped>

*{  
 
  margin: 0;
  padding: 0;
}
.text{
  width:100%;
  height: 100vh;
   background-image: url(../../assets/photo.jpg);
}
.box{
   display:flex;
}
.head1{
  font-size:0.3rem;
  display:inline;
  flex:1;
  background-color:pink;
   opacity: 0.7;
}
.head2{
  font-size:0.3rem;
  display:inline;
  flex:4;
  background-color:pink;
   opacity: 0.7;
}
.head3{
  font-size:0.3rem;
  display:inline;
 flex:4;
 background-color:pink;
  opacity: 0.7;
}
.content{
  font-size:0.7rem;
  width:100%;
  height:3rem;
}
.one{
  font-size:0.6rem;
}
.music-auto{ 
  padding-top:1rem;
  z-index:100;
  }
li{
  display:flex;
  border-top:1px black solid; 
}
li .num{
  flex:1;
  font-size:0.3rem;
  background-color:aqua;
  opacity: 0.7;
}
li .songname{
  border-left:1px black solid;
  font-size:0.3rem;
 flex:4;
 background-color:rgb(105, 233, 105);
  opacity: 0.7;
}
li .name{
  border-left:1px black solid;
  font-size:0.3rem;
  background-color:yellow;
flex:4;
 opacity: 0.7;
}
</style>