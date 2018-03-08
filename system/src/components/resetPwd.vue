<template>
  <div :style="win">
    <div class="passBox">
      <div class="passHeader">
        <h3>修改密码</h3>
        <span @click="cancel">X</span>
      </div>
      <div class="passCont">
        <p>
          <span>当前密码:</span>
          <input type="text" ref="oldPass" name="oldPass">
        </p>
        <p>
          <span>新密码:</span>
          <input type="text" ref="newPass" name="newPass">
        </p>
        <p>
          <span>确认密码:</span>
          <input type="text" ref="surePass" name="surePass">
        </p>
        <p>
          <button @click="resetPass">确定</button>
          <button @click="cancel">取消</button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
// import Axios from "axios";
  export default {
    props:["dataShow"],
    data() {
      return {
        win: {
          width: window.innerWidth + "px",
          height: window.innerHeight + "px",
          background: "rgba(255,255,255,.6)",
          position: "absolute",
          zIndex: 99999,
          top: 0,
          left: 0
        },
        sonShow:this.dataShow
      }
    },
    methods: {
      cancel(){
          this.$emit("prentPwd",this.sonShow);
          document.body.setAttribute("style","overflow:none")
      },
      resetPass(){
          if(this.$refs.newPass.value == this.$refs.surePass.value){
              this.$axios({
                  url:"/api/Handler/AdminLoginRegHandler?actions=updatePass",
                  method:"post",
                  data:{
                      oldPass:this.$refs.oldPass.value,
                      newPass:this.$refs.newPass.value
                  }
              }).then(result=>{
                  if(result.data.success){
                      alert("修改密码成功");
                      this.cancel();
                      this.$router.push("/");
                  }else{
                      alert("原密码输入错误")
                  }
              })
          }else{
              alert("两次密码不一致，请重新输入")
          }
      }
    }
  }
</script>

<style scoped>
  .passBox {
    width: 400px;
    height: 260px;
    background: white;
    margin: 200px auto;
    border: 5px solid blue;
  }

  .passHeader {
    height: 30px;
    background: blue;
    font-size: 20px;
    color: white;
  }

  .passHeader span {
    float: right;
    margin-top: -20px;

  }

  .passCont {
    padding: 30px 23px;
  }

  .passCont p {
    line-height: 40px;

  }

  .passCont p span {
    text-align: right;
    display: inline-block;
    width: 100px;
  }

  .passCont p input {
    line-height: 20px;
    width: 190px;
    border: 1px solid #ccc;

  }

  .passCont p button {
    width: 100px;
    height: 35px;
    border: none;
    margin: 30px;
    outline: none;
  }


</style>
