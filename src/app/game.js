const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timer=0;
let entityList = {Flappies: [], Pipes: []};



let flappy = new Flappy();
entityList.Flappies.push(flappy);
let pipe = new Pipes();
entityList.Pipes.push(pipe);


function main() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const [key, value] of Object.entries(entityList)) {
        for (let j = 0; j < entityList[key]?.length; j++) {
            //console.log(key, entityList[key][j]);
            entityList[key][j].update();
            try {//I have no clue at all why this part of code will give an error when the enemy is destroyed but this works ig
            entityList[key][j].draw();
            }
            catch (e) {
            }
        }
    }
    if (pressedKeys[32] === true) {
        flappy.jump();
        console.log("pressed")
    }
    timer ++;
    if (timer % 100 === 0) {
        entityList.Pipes.push(new Pipes());
        console.log('new pipes')
    }
}

pressedKeys = {}

window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }
    


setInterval(main, 20);