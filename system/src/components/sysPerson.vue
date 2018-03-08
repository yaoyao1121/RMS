<template>
    <!-- root element -->
   <div>
       <fc-header></fc-header>
       <div class="wrapBread">
           <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>系统人员</el-breadcrumb-item>
            </el-breadcrumb>
       </div>
       <div>
            <el-input  placeholder="请输入内容" style="width:500px;" v-model="searchText"></el-input>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="success" @click="showAdd">添加</el-button>
       </div>
       <div>
           <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="userName"
                    label="用户名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="trueName"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="power"
                    label="后台权限">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="手机号">
                </el-table-column>
                <el-table-column
                    prop="createAt"
                    label="注册日期">
                </el-table-column>
                <el-table-column
                    prop="tokenId"
                    label="操作">
                </el-table-column>
            </el-table>
       </div>
       <div>
            <el-pagination
                layout="prev, pager, next"
                :total="count"
                @current-change="pagestart">
            </el-pagination>
       </div>
       <add-user v-show="reShow" :dataShow="reShow" @prentAdd="parentHide"></add-user> 
   </div>
</template>

<script>
import Vue from "vue";
import fcHeader from "./fcHeader";
import addUser from "./addUser";
export default {
  components: { fcHeader, addUser },
  data() {
    return {
      reShow: false,
      tableData: [],
      pageStart:1,
      searchText: "",
      count:0
    };
  },
  methods: {
    parentHide(val) {
      this.reShow = val;
    },
    showAdd() {
      this.reShow = true;
    },
    showUserInfo() {
      this.$axios({
        url: "/api/Handler/AdminHandler?actions=show",
        method: "get",
        params: {
          pageStart: this.pageStart,
          searchText: this.searchText
        }
      }).then(result => {
          if(result.data.success){
            this.tableData = result.data.data.list;
            this.count=Math.ceil(result.data.data.count/3)*10;
          }else{
              this.tableData=[]
          }
      
      });
    },
    search() {
      console.log(this.searchText);
      this.showUserInfo();
    },
    pagestart(val){
        this.pageStart=val;
        this.showUserInfo();
    }
  },
  mounted() {
    this.showUserInfo();
  }
};
</script>

<style>
.wrapBread {
  color: #ffffff;
  margin: 20px;
}
</style>
