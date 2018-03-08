<template>
<div>
    <bg-canvas class="canvas"></bg-canvas>
    <div class="content_wrap"> 
        <img :src="urlImg" alt=""/>
        <form action="" method>
            <li><span class="font icon icon-user"></span><input type="text" placeholder="用户名"   name="userName" ref="userName" id="userName"></li>
            <li><span class="font icon icon-lock"></span><input type="password" placeholder="密码" name="password" ref="password" id="pwd"></li>
            <li><span class="font icon icon-lock"></span><input type="text" placeholder="验证码" name="veri" ref="veri" id="checkveri" >
            <Veri id="veri"></Veri>
            </li>
            <li class="clear">
                <input type="button" value="忘记密码" id="forget">
                <input type="button" @click="login" value="登录" id="load" @keydown.tab="enter">
            </li>
        </form>
    </div>
</div>  
</template>

<script>
import Vue from "vue";
import $http from "vue-resource";
import Axios from "axios";
import bgCanvas from "./bgCanvas";
import Veri from "./veri";
Vue.use($http);
// Axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
export default {
    components:{
      bgCanvas,Veri
  },
  name: "load",
  data() {
    return {
      urlImg: "../static/assets/back_logo.png"
    };
  },
  methods: {
      login(){
          var that=this;
        Axios({
            url:"/api/Handler/AdminLoginRegHandler?actions=checkveri",
            method:"get",
            params:{
                veri:this.$refs.veri.value
            }
        }).then(result=>{
            if(result.data.success){
                Axios({
                    url:"/api/Handler/AdminLoginRegHandler?actions=login",
                    method:"post",
                    data:{
                        userName:that.$refs.userName.value,
                        password:that.$refs.password.value
                    }
                }).then(result=>{
                    if(result.data.success){
                        alert("登录成功");
                        //原生js跳转
                        // window.location.href="/#/HT";
                        //vue  路由跳转
                        that.$router.push("/HT");
                    }else{
                        alert("密码错误，请重新输入")
                    }
                    
                })
            }else{
                alert("验证码错误，请重新输入")
            }
        })
      },
      enter(ev){
          console.log(ev)
          if(ev.keyCode=="13"){
              this.login();
          }
      }
  }
};
</script>

<style>
.canvas{
    position:fixed;
    top:0;
    left:0;
}
.content_wrap {
    position:relative;
    z-index: 999;
  width: 600px;
  margin: 200px auto 0;
  text-align: center;
}
.content_wrap .font{
    color: white;
    width: 39px;
    height: 40px;
    text-align: center;
    line-height: 38px;
    border: 1px solid red;
    border-right: 0;
    vertical-align: middle;
    display: inline-block;
}
.content_wrap form>li{
    margin-top:20px;
    list-style: none;
}
#userName,#pwd,#checkveri{
    width: 500px;
    height: 40px;
    padding-left: 10px;
    border: 1px solid red;
    background: transparent;
}
#checkveri{
    width:390px;
}
#veri{
    vertical-align: middle;
    margin-left:15px;
    display:inline-block;
}
#forget,#load{
    width:120px;
    height: 35px;
    color:white;
}
#forget{
    float: left;
    background:#3CADCF;
}
#load{
    float: right;
    background:#5CB95C;
}
</style>
