var audio, angle, rotateImg, rotateTimer;

//更新歌曲url+初始化
function upload(obj) {
    //console.log(obj.files[0].name);
    var songName = document.getElementById("songName");
    songName.value = obj.files[0].name;
    var audio = document.getElementById("audio");
    //解析url对象
    var songUrl = window.URL.createObjectURL(obj.files[0]);
    //console.log(url);
    audio.src = songUrl;

    audio.onload = initAudio();
}

//初始化设置
function initAudio() {
    // 初始化页面
    // document.getElementById("musicAudio").innerHTML=
    //     "<img id='musicAudioPlayAndPause'  onclick='playOrPaused(this);' src='img/u=2796151082,586743915&fm=27&gp=0.jpg'/>"+
    //     "<div id='musicAudioProgressPar'>"+
    //     "<div id='musicAudioProgress'></div>"+
    //     "</div>"+
    //     "<p id='musicAudioTime'><span id='currentTime'>00:00</span><span>&#47;</span><span id='totalTime'>12:00</span></p>";

    //初始化对象
    audio = document.getElementById("audio");
    angle = 0;
    rotateImg = document.getElementById("openUrl");
    //初始化——当前时间
    getCurrentTime();
    //旋转动画初始化
    angle = 0;
    clearInterval(rotateTimer);
    rotateImg.style.WebkitTransform = "rotate(0deg)";
    //初始化音量大小
    audio.volume = 0.3;
    var buttonPosition = document.getElementById("button");
    buttonPosition.style.marginLeft = 60 + "px";
}

//更新进度条当前值
function updateProgressVal() {
    var progressVal = audio.currentTime/audio.duration*140;
    // console.log(progressVal);
    // console.log(audio.duration);
    document.getElementById("musicAudioProgress").style.width = progressVal+"px";
    //开始旋转
}

//更新总时间
function getAllTime() {
    var duration = audio.duration;
    //console.log(duration);
    var totalTime = parseInt(duration/60);
    var seconds = parseInt(duration%60);
    if (totalTime === 0) {
        if (seconds > 9) {
            totalTime = "00:" + seconds;
        } else {
            totalTime = "00:0" + seconds;
        }
    } else {
        var totalTimePre, totalTimeNext;
        if (totalTime > 9) {
                totalTimePre = totalTime;
            } else {
                totalTimePre = "0" + totalTime;
            }
        if (seconds > 9) {
                totalTimeNext = seconds;
            } else {
            totalTimeNext = "0" + seconds;
        }
        totalTime = totalTimePre + ":" + totalTimeNext;
    }
    //console.log(totalTime);
    document.getElementById("totalTime").innerText = totalTime;
    //document.getElementById("totalTime").innerText = totalTime;
}
//更新当前时间
function getCurrentTime(){
    var currentTime = audio.currentTime;
    var totalTime = parseInt(currentTime/60);
    var seconds = parseInt(currentTime%60);
    if(totalTime === 0){
        if(seconds > 9) {
            totalTime = "00:"+seconds;
        } else {
            totalTime = "00:0"+seconds;
        }
    } else {
        var totalTimePre, totalTimeNext;
        if(totalTime > 9){
            totalTimePre = totalTime;
        } else {
            totalTimePre = "0"+totalTime;
        }
        if(seconds > 9) {
            totalTimeNext = seconds;
        } else {
            totalTimeNext = "0" + seconds;
        }
        totalTime = totalTimePre + ":" + totalTimeNext;
    }
    //console.log(totalTime);
    document.getElementById("currentTime").innerText = totalTime;
}

//暂停或播放
var progressTimer;
function playOrPaused() {
    if(audio.paused === true) {
        audio.play();
        progressTimer = window.setInterval(audioProgress,100);
        document.getElementById("musicAudioPlayAndPause").setAttribute("src","img/images.png");
        return;
    }
    audio.pause();
    // retate.style.webkitAnimationPlayState = "running";
    document.getElementById("musicAudioPlayAndPause").setAttribute("src","img/u=2796151082,586743915&fm=27&gp=0.jpg");
}
function audioProgress() {
    if(audio.currentTime <= audio.duration){
        if(audio.played){
            //更新当前时间
            getCurrentTime();getAllTime();
            //更新进度条
            updateProgressVal();
        }
    } else {
        clearInterval(progressTimer);
    }
}

//JS旋转
function RotateImg() {
    if(audio.paused === true) {
        clearInterval(rotateTimer);
        return;
    }
    clearInterval(rotateTimer);
    rotateTimer = setInterval(function() {
        angle++;
        if (angle > 360) { angle = 0; }
        // console.log(rotateImg.style.WebkitTransform);
        // console.log(angle);
        //rotateImg.style.WebkitTransform = "rotate(15deg)";
        rotateImg.style.WebkitTransform =  "rotate(" + angle + "deg)";
    }, 40);

}

//音量调整
function soundSize() {
    var event = event || window.event,
        bow = document.getElementById("bow"),
        buttonPosition = document.getElementById("button");
//            console.log(event.offsetX);
//            console.log(bow.offsetLeft);
//            console.log(bow.innerWidth);
    //点击改变小按钮位置
    var left = event.offsetX,
        level = event.offsetX/200;
    buttonPosition.style.marginLeft = left + "px";
    //改变音量
    console.log(level);
    audio.volume = level;
}