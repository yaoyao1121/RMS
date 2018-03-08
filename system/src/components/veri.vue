<template>
    <div>
        <canvas id="canvas" @click="changeVeri" width="92px" height="35px"></canvas>
    </div>
</template>

<script>
import Axios from "axios"
export default {
    data(){
        return{
            canvas:"",
            ctx:"",
            width:"",
            height:"",
            color:""
        }
    },
    methods:{
        /*需求：
            1.获取元素
            2.绘制绘图环境 2d环境
            3.绘制矩形
            4.绘制小圆点
                4.1 填充颜色
                4.2 开启路径
                4.3 绘制小圆   arc() 
                4.4 关闭路径
            5.绘制干扰线
                5.1 填充颜色
                5.2 开启路径
                5.3 绘制细线
                5.4 关闭路径
            6.绘制文字
                6.1 填充颜色
                6.2 开启路径 
                6.3 绘制文字  font
                6.4 改变样式
                6.5 关闭路径*/
        randomNum(min,max){
            return Math.ceil(Math.random()*(max-min)+min)
        },
        randomColor(min,max){
            var r= this.randomNum(min,max);
            var g= this.randomNum(min,max);
            var b= this.randomNum(min,max);
            return "rgb("+r+","+g+","+b+")";
        },
        drawPic(txt){
            this.ctx.fillStyle=this.randomColor(200,250)
            this.ctx.beginPath();
            this.ctx.clearRect(0,0,this.width,this.height);
            this.ctx.fillRect(0,0,this.width,this.height);
            //绘制小圆点
            for(var i=0;i<40;i++){
                this.ctx.fillStyle=this.randomColor(180,250);
                this.ctx.beginPath();
                this.ctx.arc(this.randomNum(0,this.width),this.randomNum(0,this.height),1.5,0,Math.PI*2);
                this.ctx.fill();
                this.ctx.closePath();
            }
            //绘制干扰线
            for(var i=0;i<10;i++){
                this.ctx.strokeStyle=this.randomColor(180,250);
                this.ctx.beginPath();
                this.ctx.moveTo(this.randomNum(0,this.width),this.randomNum(0,this.height));
                this.ctx.lineTo(this.randomNum(0,this.width),this.randomNum(0,this.height));
                this.ctx.stroke();
                this.ctx.lineWidth=0.3;
                this.ctx.closePath();
            }
            //绘制文字
            for(var i=0;i<4;i++){
                //得到后台返回的文字
                var returnTxt=txt[i];
                this.ctx.fillStyle=this.randomColor(50,160);
                this.ctx.beginPath();
                this.ctx.font=this.randomNum(18,23)+'px Aria';
                var x=10*i+10;
                var y=this.randomNum(18,20);
                var deg=this.randomNum(-5,5);
                this.ctx.rotate(deg*Math.PI/180);
                this.ctx.fillText(returnTxt,x,y);
                this.ctx.rotate(-deg*Math.PI/180);
                this.ctx.closePath();
                // console.log(deg*Math.PI/180)
            }
            return
        },
        changeVeri(){
             var that=this
             Axios({
                url:"/api/Handler/AdminLoginRegHandler?actions=veri",
                method:"get"
             }).then(function(result){
                  that.drawPic(result.data.data);
             })
        }
    },
    mounted(){
        this.canvas=document.getElementById("canvas");
        this.ctx=this.canvas.getContext("2d");
        this.width=this.canvas.width;
        this.height=this.canvas.height;
        this.changeVeri();  
    }
    
}
</script>

<style>

</style>
