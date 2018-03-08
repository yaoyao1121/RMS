<template>
<div>
    <fc-header></fc-header>
    <second></second>
</div>
</template>

<script>
import Vue from "vue";
import fcHeader from "./fcHeader"
import Second from "./second"
export default {
  name: "HT",
  components:{fcHeader,Second},
  data() {
    return {
    };
  },
  methods: {
     
      }
  }
</script>
    
<style scoped>
.one_nav_content_wrap{
    top:100px;
}
.updataPass_wrap{
    position: absolute;
    z-index: 999;
    width:600px;
    background: #ffffff;
    left:50%;
    margin-left:-300px;  
    text-align: center; 
    padding-bottom:20px;
}
.updataPass_wrap p{
    margin-top:8px;
}
.updataPass_wrap .rePwd input{
    width:200px;
    height: 32px;
    border:1px solid red;
    background:transparent; 
    margin-left:6px;
}
.updataPass_wrap .rePwd #surePass{
    margin-left:-2px;
}
#sureRe{
    cursor: pointer;
    width:80px;
    height: 35px;
}
</style>
