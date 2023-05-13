const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timer=0;
let entityList = {Flappies: [], Pipes: []};


class Pipes {
    static numOfPipes = 0;
    constructor() {
        this.width = 50
        this.gapHeight = 200
        this.position = {x: canvas.width + this.width, y: 400};
        this.velocity = {x: -6, y: 0};
        Pipes.numOfPipes ++;
        this.pipeNum = Pipes.numOfPipes; 
    }
    update() {
        this.position.x += this.velocity.x
        this.velocity.y += this.velocity.y
        if (this.position.x < 0 - this.width) {
            for (pipe in entityList.Pipes) {
                if (entityList.Pipes[pipe].pipeNum === this.pipeNum) {
                    entityList.Pipes.splice(pipe, 1);
                }
            }
        }
    }
    draw() {
        ctx.fillStyle = "green";
        //top
        ctx.fillRect(this.position.x, 0, this.width, this.position.y-this.gapHeight/2);
        //bottom
        ctx.fillRect(this.position.x, this.position.y + this.gapHeight/2, this.width, canvas.height + 1000);
    }
}

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