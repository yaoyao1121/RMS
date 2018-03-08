<template>
  <div>
      <div class="header_wrap clear">
        <img :src="logImg" alt=""  class="logo_wrap">
        <div class="header_nav">
            <ul class="clear">  
                <li><i class="icon icon-user"></i><a href="javascript:;">卓新思创</a></li>
                <li><i class="icon icon-user"></i><a href="javascript:;">在线客服</a></li>
                <li><i class="icon icon-user"></i><a href="javascript:;">常见问题</a></li>
                <li @click="passShow"><i class="icon icon-user"></i><a href="javascript:;">安全中心</a></li>
                <li @click="exit"><i class="icon icon-user"></i><a href="jascript:;">退出</a></li>
                <li class="name"><a href="javascript:;">{{userName}}</a></li>
                <li><img :src="userImg" alt=""></li>
            </ul>
        </div>
      </div>
      <ResetPwd v-show="reShow" :dataShow="reShow" @prentPwd="parentHide"></ResetPwd>
        <div class="nav_wrap" >
            <ul class="main_nav">
                <li   ref = "userParentBox"  @mouseover="showAdmin" @mouseout="hideAdmin"><a><i class="icon icon-user"></i>用户管理</a></li>
                <li   ref = "curseParentBox"  @mouseover="showCourse" @mouseout="hideCourse"><a><i class="icon icon-book"></i>课程管理</a></li>
            </ul>
            <div   class="nav_content_wrap" >
                <div ref="listId" class="nav_content" >
                    <div ref="userListId"   @mouseover="showAdmin" @mouseout="hideAdmin" class="one_nav_content_wrap" v-if="adminList">
                      <ul class="one_nav_content">
                          <li  @click="goAdmin"><a><i class="icon icon-user"></i>系统人员</a></li>
                          <li ><a><i class="icon icon-group"></i>学员管理</a></li>
                      </ul>
                    </div>

                    <div ref="courseListId" class="one_nav_content_wrap" v-if="courseList" @mouseover="showCourse" @mouseout="hideCourse">
                      <ul class="one_nav_content">
                        <li ><a><i class="icon icon-th"></i>课程列表</a></li>
                        <li ><a><i class="icon_add icon_plus_add"></i>添加课程</a></li>
                        <li ><a><i class="icon icon-facetime-video"></i>视频管理</a></li>
                      </ul>
                    </div>

                </div>
            </div>
      </div>
  </div>
</template>

<script>
import Vue from "vue";
import ResetPwd from "./resetPwd";
export default {
  components:{ResetPwd},
  data() {
    return {
      logImg: "../static/assets/back_logo.png",
      userImg: "../static/assets/touxiang.jpg",
      userName: "管理员11",
      adminList: false,
      courseList: false,
      reShow:false
    };
  },
  methods: {
    returnInfo() {
      this.$axios({
        url: "/api/Handler/AdminLoginRegHandler?actions=returninfo",
        method: "post",
        data: {}
      }).then(result => {
        this.userName = result.data.success;
      });
    },
    exit() {
      this.$axios({
        url: "/api/Handler/AdminHandler?actions=quit",
        method: "get"
      }).then(result => {
        if (result.data.success) {
          alert("退出成功");
          this.$router.push("/");
        }
      });
    },
    parentHide(val){
        this.reShow=val;
    },
    passShow() {
      this.reShow = true;
      document.body.setAttribute("style", "overflow:hidden");
    },
    showAdmin() {
      this.adminList = true;
    },
    hideAdmin() {
      this.adminList = false;
    },
    showCourse() {
      this.courseList=true;
    },
    hideCourse() {
      this.courseList=false;
    },
    goAdmin() {
      this.$router.push("/sysPerson");
    }
  },
  mounted() {
    this.returnInfo();
  }
};
</script>

<style>
.nav_wrap {
  height: 50px;
  /* background:url(../static/assets/images/white_opacity_bg.png); */
}
/*导航*/
.main_nav {
  width: 1100px;
  margin: 0 auto;
  color: #fff;
  line-height: 50px;
  height: 50px;
  font-size: 14px;
}
.main_nav li {
  float: left;
  padding: 0 30px;
  position: relative;
  cursor: pointer;
}
.main_nav i {
  margin-right: 8px;
}
.main_nav li a {
  color: #fff;
  position: relative;
}
.main_nav li a .icon {
  top: 0;
  border: none;
  left: -20px;
}
.main_nav li a::before,
.main_nav li a::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  opacity: 0;
  border: 2px solid #fff;
  -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
  transition: transform 0.3s, opacity 0.1s;
  -webkit-transition-timing-function: cubic-bezier(0.17, 0.67, 0.05, 1.29);
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.05, 1.29);
}
.main_nav li a::before {
  top: -14px;
  left: -50px;
  border-width: 2px 0 0 2px;
  -webkit-transform: translate3d(23px, 10px, 0);
  transform: translate3d(23px, 10px, 0);
}

.main_nav li a::after {
  right: -28px;
  bottom: -16px;
  border-width: 0 2px 2px 0;
  -webkit-transform: translate3d(-23px, -10px, 0);
  transform: translate3d(-23px, -10px, 0);
}

.main_nav .now a::after {
  opacity: 1;
  opacity: 0\0; /* IE8 或 IE9*/
  -webkit-transform: translate3d(-15px, -5px, 0);
  transform: translate3d(-15px, -5px, 0);
}
.icon_add {
  font-family: FontAwesome;
  font-weight: normal;
  font-style: normal;
  text-decoration: inherit;
  display: inline;
  position: absolute;
  top: 2px;
  left: 0;
  width: auto;
  height: 12px !important;
  border-left: 4px solid;
  line-height: normal;
  vertical-align: baseline;
  background-image: none !important;
  background-position: 0% 0%;
  background-repeat: repeat;
}
.icon_plus_add:before {
  content: " ";
  position: absolute;
  width: 12px;
  border-top: 4px solid;
  left: -8px;
  top: 4px !important;
}
.main_nav .now {
  _background-color: #263066; /*only for IE6*/
  +background-color: #263066; /*only for IE7*/
  background-color: #263066\0; /* IE8 或 IE9*/
}
.main_nav .now a::before {
  opacity: 1;
  opacity: 0\0; /* IE8 或 IE9*/
  -webkit-transform: translate3d(15px, 5px, 0);
  transform: translate3d(15px, 5px, 0);
}
.nav_content_wrap {
  position: relative;
  height: 0;
  top:0;
  /* background:url(../static/assets/images/black_opacity_bg.png); */
  z-index: 999;
}
.nav_content_wrap_now {
  opacity: 1;
  position: relative;
  min-height: 400px;
  /* background:url(../static/assets/images/black_opacity_bg.png); */
  z-index: 999;
}
.nav_moveout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 150px;
  display: none;
}
.nav_content {
  /* height: 50px !important; */
}

.one_nav_content_wrap {
  opacity: 1;
  margin: 0 auto;
  background: #fff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* display: none; */
}
.one_nav_content_wrap li a {
  position: relative;
  padding-left: 20px;
}
.one_nav_content_wrap li {
  color: #000;
}
.one_nav_content_wrap li:hover {
  color: #fff;
}
.one_nav_content_wrap li a .icon {
  top: 0;
  border: none;
  left: -15px;
}
.now.one_nav_content_wrap {
  border-bottom: 1px solid #fff;
}
.one_nav_content {
  overflow: hidden;
  padding: 44px 0 36px 0;
  width: 1140px;
  margin: 0 auto;
}
.one_nav_content li {
  float: left;
  width: 167px;
  height: 40px;
  line-height: 40px;
  padding: 0 40px;
  position: relative;
  cursor: pointer;
  border: 1px solid #ededed;
  color: #69696d;
  margin: 0 34px 20px 0;
  font-size: 14px;
}
.one_nav_content i {
  margin-right: 8px;
  color: #4c5c9c;
}
.one_nav_content li:hover {
  background: #4c5c9c;
  transition: all 0.5s ease 0s;
}
.one_nav_content li:hover,
.one_nav_content li:hover i {
  color: #fff;
  transition: all 0.5s ease 0s;
}
</style>
