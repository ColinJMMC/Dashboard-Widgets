let timer;
let time = 0;
let milliseconds = 0;
let running = false;

const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const timeDisplay = document.getElementById('time');

function updateDisplay() {
    let minutes = String(Math.floor(time / 60)).padStart(2, '0');
    let seconds = String(time % 60).padStart(2, '0');
    let ms = String(milliseconds).padStart(2, '0');
    timeDisplay.textContent = `${minutes}:${seconds}:${ms}`;
}

startStopBtn.addEventListener('click', function() {
    if (running) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
        startStopBtn.className = 'start-button';
    } else {
        timer = setInterval(() => {
            milliseconds++;
            if (milliseconds >= 100) {
                milliseconds = 0;
                time++;
            }
            updateDisplay();
        }, 10);
        startStopBtn.textContent = 'Stop';
        startStopBtn.className = 'stop-button';
    }
    running = !running;
});

resetBtn.addEventListener('click', function() {
    clearInterval(timer);
    time = 0;
    milliseconds = 0;
    updateDisplay();
    startStopBtn.textContent = 'Start';
    startStopBtn.className = 'start-button';
    running = false;
});

const slider = document.getElementById('slider');
const sliderValue = document.getElementById('sliderValue');
const body = document.body;

slider.addEventListener('input', function() {
    sliderValue.textContent = slider.value;
    body.style.fontSize = `${1 + slider.value / 50}rem`;
});

const contentDiv = document.getElementById('content');
const loadBtn = document.getElementById('loadingcontent');

fetch('/JSON/content.json')
    .then(res => res.json())
    .then(data => {
        let index = 0;
        loadBtn.addEventListener('click', function() {
            contentDiv.innerHTML = `<img src="${data.images[index]}" style="width:100%; border-radius: 8px;">`;
            index = (index + 1) % data.images.length;
        });
    });
