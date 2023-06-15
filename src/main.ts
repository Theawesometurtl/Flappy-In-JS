
if (localStorage.getItem("preTrained") === null) {
    localStorage.setItem("preTrained", JSON.stringify(true));
}

if (JSON.parse(localStorage.getItem("preTrained")) === false) {
    const trainingCheckbox = document.getElementById("checkbox") as HTMLInputElement;
    trainingCheckbox.checked = true;
}


function flappyClick() {
    window.location.href = "./flappy.html";
}
function drivingClick() {
    window.location.href = "./driving.html";
}
function drawTrackClick() {
    window.location.href = "./drawTrack.html";
}
function circularRaceTrack() {
    window.location.href = "./customSimulation.html";
    localStorage.setItem("barrier", JSON.stringify([[[220,88], [524,38], [844,67], [896,147], [963,375], [888,603], [734,631], [411,604], [266,478], [164,297], [244,81]], [[414,212], [540,166], [680,206], [727,313], [736,398], [653,495], [483,456], [375,401], [437,187], ]]));
    localStorage.setItem("checkpoint", JSON.stringify([[320,152], [790,176], [636,520]]));
}
function Maze() {
    window.location.href = "./customSimulation.html";
    localStorage.setItem("barrier", JSON.stringify([[[412,401], [324,399], [322,346], [427,349], [448,353], [448,417], [445,465], [289,457], [240,454], [239,340], [242,285], [361,293], [357,213], [247,213], [207,227], [193,160], [300,145], [376,145], [488,158], [520,33], [644,56], [644,56], [768,23], [830,47], [822,65], [735,71], [715,142], [627,144], [548,146], [560,212], [636,215], [759,226], [843,266], [800,370], [748,345], [756,466], [752,588], [600,619], [469,609], [260,629], [264,552], [428,540], [533,533], [608,569], [666,448], [668,397], [655,363], [521,397], [540,489], [445,468], ]]));
    localStorage.setItem("checkpoint", JSON.stringify([[355, 379], [300, 589]]));
}

function trainingToggle() {
    const trainingCheckbox = document.getElementById("checkbox") as HTMLInputElement;
    if (!trainingCheckbox.checked) {
        localStorage.setItem("preTrained",JSON.stringify(true)); 
    } else {
        localStorage.setItem("preTrained", JSON.stringify(false));
    }
    console.log(localStorage.getItem("preTrained"));
}

const button1 = document.getElementById("FlappyButton");
button1.addEventListener("click", flappyClick);
  
const button2 = document.getElementById("DrivingButton");
button2.addEventListener("click", drivingClick);

const button3 = document.getElementById("DrawTrackButton");
button3.addEventListener("click", drawTrackClick);

const button4 = document.getElementById("CircularRaceTrack");
button4.addEventListener("click", circularRaceTrack);

const trainingCheckbox = document.getElementById("checkbox");
trainingCheckbox.addEventListener("change", trainingToggle);

// const button5 = document.getElementById("Maze");
// button5.addEventListener("click", Maze);
