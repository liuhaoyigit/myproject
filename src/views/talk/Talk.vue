<template>
  <div class="text">
    <ul>
      <li class="clearfix" v-for="(item,index) in talkList" :key="index">
        <div class="left">
          <img class="img1" src="../../assets/tx.jpg" />
          <div class="question">{{item.question}}</div>
        </div>
        <div class="right">      
          <div class="answer">{{item.answer}}</div> 
          <img class="img2" src="../../assets/AI.jpg" />
        </div>
      </li>
    </ul>
    <div class="talk">
      <input v-model="inpVal" type="text" @keyup.13="send" placeholder="请输入内容" />
      <button @click="send">发送</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import md5 from "md5";
export default {
  data() {
    return {
      inpVal: "",
      talkList: []
    };
  },
  methods: {
    answer() {
      console.log(this);
    },
    timeStamp() {
      //生成时间戳
      let timer = new Date();
      let time = Date.parse(timer);
      time = time.toString().substr(0, 10);
      time = Number.parseInt(time);
      return time;
    },
    nonceStr() {
      //16进制随机字符串
      let num = Math.random();
      num = num.toString(16);
      num = num.substr(2);
      return num;
    },
    sign(obj) {
      //生成签名
      let arr = Object.keys(obj).sort();
      let str = "";
      arr.map(function(val) {
        str += `${val}=${encodeURI(obj[val])}&`;
      });
      str += "app_key=Nw5rkuayHUvc4F6I";
      str = md5(str).toUpperCase();
      return str;
    },
    send() {
      let birdUrl = "https://bird.ioliu.cn/v2?url=";
      let thisUrl = "https://api.ai.qq.com/fcgi-bin/nlp/nlp_textchat";
      let params = {
        app_id: 2157046393,
        time_stamp: this.timeStamp(),
        nonce_str: this.nonceStr(),
        session: 10041,
        question: this.inpVal
      };
      let sign = this.sign(params);
      params.sign = sign;

      axios
        .get(birdUrl + thisUrl, {
          params
        })
        .then(res => {
          let obj = {
            question: this.inpVal,
            answer: res.data.data.answer
          };
          this.talkList.push(obj);
          this.inpVal = "";
        });
    }
  },
  created() {
    this.answer();
  },

  mounted() {}
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  position: relative;
}
.text {
  position: fixed;
  position: relative;
  padding-top: 1rem;
  padding-right:0;
  margin-right:0;
  width: 100%;
  height: 100vh;
  background-image: url(../../assets/yue.jpg);
  padding-bottom: 0;
}
.talk {
  background-color: aqua;
  display: flex;
  text-align: center;
  width: 100%;
  height: 1rem;
  position: fixed;
  bottom: 1rem;
}
button {
  background-color: gray;
  height: 0.5rem;
  width: 1rem;
  transform: translate(50%, 50%);
}
input {
  transform: translate(10%, 40%);
  width: 65%;
  height: 0.5rem;
}
.yh .ai {
  display: block;
  height: 0.5rem;
}

.img1 {
  border-radius: 50%;
  height: 10%;
  width: 10%;
}
.img2 {
  border-radius: 50%;
  height: 10%;
  width: 10%;
}
.question {
  background-color:rgba(105, 158, 255, 0.815);
  border-radius: 5%;
  width: 60%;
  font-size:0.5rem;
}
.answer {
  background-color:rgba(255, 251, 0, 0.596);
  border-radius: 5%;
  width: 60%;
  font-size:0.5rem;
  margin-left:2rem;
}
.left{
  display:flex;
   top:0.5rem;
   border-bottom:0.3rem;
   /* border:1px black solid; */
}
.right
{
  top:0.7rem;
  display:flex;
  /* transform: translateX(30%); */
    /* border:1px black solid; */
    
}
</style>