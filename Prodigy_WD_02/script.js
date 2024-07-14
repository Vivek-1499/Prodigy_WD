const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

startBtn.addEventListener('click', () => {
    if (isRunning){
        stopTimer();
    } else{
        startTimer();
    }
});

resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer(){
    isRunning = true;
    startBtn.textContent = 'Stop';
    startTime = Date.now() - elapsedTime;
    timer = setInterval(updateDisplay, 1000 / 60);
}

function stopTimer(){
    isRunning = false;
    startBtn.textContent = 'Start';
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
}

function resetTimer(){
    stopTimer();
    elapsedTime = 0;
    display.textContent = '00:00:00';
    laps = [];
    lapsList.innerHTML = '';
}

function updateDisplay(){
    const time = Date.now() - startTime;
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    display.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number){
    return number.toString().padStart(2, '0');
}

function recordLap(){
    if (isRunning) {
        const time = Date.now() - startTime;
        laps.push(time);
        const lapItem = document.createElement('li');
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);
        lapItem.textContent = `Lap ${laps.length}: ${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
        lapsList.insertBefore(lapItem, lapsList.firstChild);
    }
}