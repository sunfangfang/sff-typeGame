function game(){
    this.clientw=document.documentElement.clientWidth;
    this.clienth=document.documentElement.clientHeight;
    this.letterArr=(function(){
        var leeter=[];
        for(var i=65;i<91;i++){
            var str=String.fromCharCode(i);
            leeter.push(str);
        }
        return leeter;
    })();
    //this.letterArr=["A","B","C","D","E","F","G","H","I","J","K"];
    this.letterLen=5;
    this.speed=3;
    this.spans=[];
    this.currArr=[];
    this.currPosArr=[];
    this.die=10;
    this.sore=0;
    this.currSore=0;
    this.num=10;
    this.soreEle=document.getElementsByClassName("sore")[0].getElementsByTagName("span")[1];
    this.dieEle=document.getElementsByClassName("die")[0].getElementsByTagName("span")[1];
    //this.step=10;
    this.aa=1;
}
game.prototype={
    play:function(){
        //将字母显示到body里面
        this.getLetter(this.letterLen);
        this.move();
        this.key();
    },
    key:function(){
        var that=this;
        document.onkeydown=function(e){
            var ev=e||window.event;
            var code=String.fromCharCode(ev.keyCode);
            for(var i=0;i<that.spans.length;i++){
                if(that.spans[i].innerHTML==code){
                    document.body.removeChild(that.spans[i]);
                    that.spans.splice(i,1);
                    that.currArr.splice(i,1);
                    that.currPosArr.splice(i,1);
                    that.getLetter(1);
                    that.sore++;
                    that.currSore++;
                    that.soreEle.innerHTML=that.sore;
                    if(that.currSore%that.num==0){
                        that.aa++;
                        alert("第"+that.aa+"关");
                        that.next();
                    }
                    break;
                }
            }
        }
    },

    next:function(){
        clearInterval(this.t);
        for(var i=0;i<this.spans.length;i++){
            document.body.removeChild(this.spans[i]);
        }
        this.spans=[];
        this.currArr=[];
        this.currPosArr=[];
        this.speed++;
        this.letterLen++;
        this.currSore=0;
        this.num+=10;
        this.play();
    },

    move:function(){
        var that=this;
        this.t=setInterval(function(){
            for(var i=0;i<that.spans.length;i++){
                var top=that.spans[i].offsetTop+that.speed;
                that.spans[i].style.top=top+"px";
                if(top>that.clienth){
                    document.body.removeChild(that.spans[i]);
                    that.spans.splice(i,1);
                    that.currArr.splice(i,1);
                    that.currPosArr.splice(i,1);
                    that.getLetter(1);
                    that.die--;
                    that.dieEle.innerHTML=that.die;
                    if(that.die==-1){
                        that.pause();
                        hide.style.display="block";
                        hide.style.background="url(images/over.png)";
                    }
                }
            }
        },60)
    },
    restart:function(){
        hide.style.display="none";
        clearInterval(this.t);
        for(var i=0;i<this.spans.length;i++){
            document.body.removeChild(this.spans[i]);
        }
        this.spans=[];
        this.currArr=[];
        this.currPosArr=[];
        this.speed=3;
        this.letterLen=5;
        this.currSore=0;
        this.num=10;
        this.aa=1;
        this.soreEle.innerHTML=0;
        this.dieEle.innerHTML=10;
        this.play();
    },
    pause:function(){
        clearInterval(this.t);
    },
    continue:function(){
        this.move();
    },
    getLetter:function(num){
        //先获取到指定的字母
        var arr=this.getRand(num);
        var posArr=[];
        //var eleArr=[];
        for(var i=0;i<arr.length;i++){
            var span=document.createElement("span");
            var rand=Math.floor(Math.random()*6+1);
            span.style.background="url(./images/"+rand+".png)";
            span.style.color="white";
            span.innerHTML=arr[i];
            var x=(200+(this.clientw-300)*Math.random());
            var y=(100*Math.random());
            var width=75;
            var height=200;
            while (this.check1(this.currPosArr,x,width)){
                x=(200+(this.clientw-300)*Math.random());
            }
            posArr.push({minx:x,maxx:x+width});
            this.currPosArr.push({minx:x,maxx:x+width});
            span.style.cssText="width:"+width+"px;height:"+height+"px;position:absolute;left:"+x+"px;top:"+y+"px;color:#fff;font-size:30px;background:url(./images/"+rand+".png);background-size:cover;text-align:center;line-height:70px";
            document.body.appendChild(span);
            // eleArr.push(span);
            this.spans.push(span);
        }
        // return eleArr;

    },
    check1:function(arr,x,width){
        for(var i=0;i<arr.length;i++){
            if(!(x+width<arr[i].minx||arr[i].maxx+width<x)){
                return true;
            }
        }
        return false;
    },
    getRand:function(num){
        var arr=[];
        for(var i=0;i<num;i++) {
            var rand = Math.floor(this.letterArr.length * Math.random());
            while(this.check(this.currArr,this.letterArr[rand])){
                rand = Math.floor(this.letterArr.length * Math.random());
            }
            arr.push(this.letterArr[rand]);
            this.currArr.push(this.letterArr[rand]);
        }
        return arr;
    },
    check:function(arr,val){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==val){
                return true;
            }
        }
        return false;
    }

}