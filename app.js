(function(){
// Global vars
var time = 0, // HH - MM - SS
    displayTime = msToTime(time),
    newtime = 0,
    running = false,
    interval,

    //buttons & holders
    toggleBtn = document.getElementById('toggleTimer'),
    resetBtn = document.getElementById('resetTimer'),
    recordBtn = document.getElementById('recordTimer')
    pastTimes = document.getElementById('recordedTimes')
    timerTime = document.getElementById('timerTime');



//Init functions
addListeners();

// Define functions

function addListeners(){
    toggleBtn.addEventListener('click', function(){
        (!running)? startTimer() : stopTimer();
        running = !running;
    })

    resetBtn.onclick = resetTimer;
    recordBtn.onclick = recordTime;


    document.addEventListener('keypress',function(event){
        switch(event.key){
            case 's':
                (!running)? startTimer() : stopTimer(); running = !running;
                break;
            case 'r':
                resetTimer();
                break;
            case 't':
                recordTime();
                break;
        }
    })
}

function startTimer(){
    time += newtime;
    let startTime = Date.now();
    interval = setInterval(function(){
        newtime =  Math.abs(startTime - Date.now());
        displayTime = msToTime(time+newtime);
        timerTime.innerHTML = displayTime;
    })

}

function stopTimer(){
    clearInterval(interval);
}

function resetTimer(){
    stopTimer();
    running = false;
    time = newtime = 0;
    displayTime = msToTime(time);
    pastTimes.innerHTML='';
    timerTime.innerHTML = displayTime;
}

function recordTime(){
    if(running==true){
        pastTimes.innerHTML += '<li>'+displayTime+'</li>';
    }else {
        alert('Start Timer please');
    }
}

function msToTime(duration) {
    let milliseconds = parseInt((duration%1000)/(1000/60))
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
    return hours + ":" + minutes + ":" + seconds+ ":" + milliseconds;
}

}());