const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

entityList = {Flappies: [], Pipes: []};

class Flappy {
    constructor() {
        this.position = {x: 50, y: 100};
        this.velocity = {x: 0, y: 0};
        this.width = 50;
        this.height = 50;
        this.jumpVelocity = 10;
        this.drag = 0.9;
        this.gravity = 1;
        
    }
    jump() {
        this.velocity.y = -this.jumpVelocity;
        
    }
    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.x *= this.drag;
        this.velocity.y += this.gravity;
        this.velocity.y *= this.drag;
        if (this.position.y > canvas.height - this.height/2) {
            this.die();
        }
        let fx = this.position.x;
        let fy = this.position.y;
        let fw = this.width;
        let fh = this.height;
        let px;
        let py;
        let pw;
        let ph;
        for (let i = 0; i < entityList.Pipes.length; i++) {
            px = entityList.Pipes[i].position.x;
            py = entityList.Pipes[i].position.y;
            pw = entityList.Pipes[i].width;
            ph = entityList.Pipes[i].heightGap;
            if (fx > px - pw - fw && fx < px + pw + fw || fy > py - ph - fh && fy < py + ph + fh) {
                this.die();
            }
            
        }
    }
    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    die() {
        this.position.y = 100;
        this.velocity.y = 0;
    }
}

class Pipes {
    constructor() {
        this.width = 50
        this.gapHeight = 200
        this.position = {x: canvas.width + this.width, y: 400};
        this.velocity = {x: -2, y: 0};
    }
    update() {
        this.position.x += this.velocity.x
        this.velocity.y += this.velocity.y
    }
    draw() {
        ctx.fillStyle = "green";
        //top
        ctx.fillRect(this.position.x, -1000, this.width, this.position.y-this.gapHeight/2);
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
    flappy.update();
    flappy.draw();
    pipe.update();
    pipe.draw();
    if (pressedKeys[32] === true) {
        flappy.jump();
        console.log("pressed")
    }
}

pressedKeys = {}

window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }
    


setInterval(main, 20);