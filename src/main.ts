function flappyClick() {
    window.location.href = "./flappy.html";
}
function drivingClick() {
    window.location.href = "./driving.html";
}
function drawTrackClick() {
    window.location.href = "./drawTrack.html";
}

const button1 = document.getElementById("FlappyButton");
button1.addEventListener("click", flappyClick);
  
const button2 = document.getElementById("DrivingButton");
button2.addEventListener("click", drivingClick);

const button3 = document.getElementById("DrawTrackButton");
button3.addEventListener("click", drawTrackClick);
  