<template>
  <div v-bind:class="['header',color]">
    <header>
      <span class="p1">首页</span>
      <p class="p2">{{cname}}</p>
    </header>
    <nav>
      <ul>
        <li v-for="item in navList" v-bind:key="item.id" @click="goPage(item)">{{item.name}}</li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color:"tvplay",
      name:"剧集",
      cname:"影视剧",
      navList:[
        {
          cname:"影视剧",
          id:1001,
          name:"剧集",
          path:"/tvplay",
          color:"tvplay"
        },
         {
           cname:"音乐播放器",
           id:1002,
          name:"音乐",
          path:"/music",
           color:"music"
        },
         {
           cname:"小说",
           id:1003,
          name:"书籍",
          path:"/book",
           color:"book"
        },
         {
           cname:"智能闲聊",
           id:1004,
          name:"聊天",
          path:"/talk",
           color:"talk"
        }
      ]
    };
  },
methods:{
      goPage(item){
        if(this.color!=item.color){
          this.$router.push(item.path)
          sessionStorage.setItem("activeNav",item.color)
          sessionStorage.setItem("activeName",item.cname)
          this.color=item.color
          this.name=item.name
          this.cname=item.cname
        }
      }
},
  created() {
    let activeNav = sessionStorage.getItem("activeNav")
    this.color=activeNav?activeNav:"tvplay"
    let activeName = sessionStorage.getItem("activeName")
    this.cname=activeName?activeName:"影视剧"
  },

  mounted() {}
};
</script>
<style scoped>
*{
    margin:0;
    padding: 0;
}


.header,
nav {
  height: 1rem;
  color: black;
  position: fixed;
  left:0;
  z-index:50;
}
.header {
  width: 100%;
  top: 0;
}
.p1 { 
    left:10px;
  transform: translateY(-50%);
  font-size: 0.5rem;
  top:50%;
  position: absolute;
}
.p2 {
  font-size: 0.7rem;
  text-align:center;
}
nav {
  width: 100%;
  bottom:0;
}
ul {
  display: flex;
  height:1rem;
  align-items: center;
}
ul li {
    flex-grow: 1;
    /* justify-content: space-between; */
  padding: 5px;
  text-align: center;
  font-size: 0.7rem;
  list-style: none;
  border-right: solid 2px black;
   border-top: solid 2px black
}
.tvplay nav,.tvplay header{
   background-color: rgb(0, 89, 255);
}
.music nav,.music header{
    background-color: rgb(255, 0, 0);
}
.book nav,.book header{
    background-color: aqua;
}
.talk nav,.talk header{
    background-color: rgb(21, 255, 0)
}
</style>