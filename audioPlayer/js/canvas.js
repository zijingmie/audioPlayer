// var body = document.getElementsByTagName("body");
// body.push("<canvas id='canvas'>Canvas not supported.</canvas>");

window.onload = function() {
    var canvas = document.getElementById("canvas");
    //创建 context 对象
    var cxt = canvas.getContext("2d");
    //宽度高度
    var width, height;
    //同时随机产生小圆点数量
    var num = 80;
    //存储数据位置
    var data = {};

    init();
    setInterval(function draw() {
        cxt.clearRect(0,0,width,height);
        for(var i = 0; num > i; i++)
        {
            data[i].x+= data[i].cx;
            data[i].y+= data[i].cy;
            if(data[i].x > width || 0 > data[i].x) {
                data[i].cx = -data[i].cx;
            }
            if(data[i].y > height || 0 > data[i].y) {
                data[i].cy = -data[i].cy;
            }
            Circle(data[i].x,data[i].y);
            for(var j = i+1; num > j; j++) {
                if((50*50) > ((data[i].x-data[j].x)*(data[i].x-data[j].x)+(data[i].y-data[j].y)*(data[i].y-data[j].y))) {
                    line(data[i].x,data[i].y,data[j].x,data[j].y);
                }
            }
            //document.onmouseover = mouseMove(event,data[i].x,data[i].y);
        }
    },30);

    function init(){
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        for(var i = 0; num > i; i++) {
            data[i] = { x: Math.random()*width,
                y: Math.random()*height,
                cx: Math.random()*2-1,
                cy: Math.random()*2-1};
            Circle(data[i].x,data[i].y);
        }
    }
    //做小圆点
    function Circle(x,y) {
        //save()和restore()相互匹配出现，作用是用来保存画布的状态和取出保存的状态
        cxt.save();
        cxt.fillStyle = "blue";
        cxt.beginPath();
        cxt.arc(x,y,0.5,0,Math.PI*2,false);
        cxt.closePath();
        cxt.fill();
        cxt.restore();
    }
    //画线
    function line(x1,y1,x2,y2) {
        var color = cxt.createLinearGradient(x1,y1,x2,y2);
        color.addColorStop(0,"#aaa");
        color.addColorStop(1,"#333");
        cxt.save();
        cxt.strokeStyle = color;
        cxt.beginPath();
        cxt.moveTo(x1,y1);
        cxt.lineTo(x2,y2);
        cxt.closePath();
        cxt.stroke();
        cxt.restore();
    }
};