<template>
  <div :style="win">
    <div class="passBox">
      <div class="passHeader">
        <h3>管理员添加</h3>
        <span @click="cancel">X</span>
      </div>
      <div class="passCont">
        <p>
          <span>用户名：</span>
          <input type="text" ref="userName" name="userName">
        </p>
        <p>
          <span>姓名:</span>
          <input type="text" ref="trueName" name="trueName">
        </p>
        <!-- <p>
          <span>密码:</span>
          <input type="text" ref="password" name="password">
        </p> -->
        <p>
          <span>手机号:</span>
          <input type="text" ref="phone" name="phone">
        </p>
        <p>
          <span>权限选择:</span>
          <select ref="powerCode">
              <option value="0">系统管理员</option>
              <option value="1">课程管理员</option>
          </select>
        </p>
        <p>
          <button @click="sureAdd">确定</button>
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
          this.$emit("prentAdd",this.sonShow);
          document.body.setAttribute("style","overflow:none")
      },
      sureAdd(){
          this.$axios({
              url:"/api/Handler/AdminLoginRegHandler?actions=add",
              method:"post",
              data:{
                  username:this.$refs.userName.value,
                  password:"123456",
                  truename:this.$refs.trueName.value,
                  powerCode:this.$refs.powerCode.value
              }
          }).then(result=>{
              if(result.data.success){
                  cancel();
              }else{
                  alert("添加失败");
              }
          })
      }
    }
  }
</script>

<style scoped>
  .passBox {
    width: 400px;
    height: 300px;
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
