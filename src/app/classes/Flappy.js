import { entityList, ctx, canvas, pressedKeys, human } from "../../index";

export class Flappy {
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
            ph = entityList.Pipes[i].gapHeight;
            if (fx > px - pw/2 - fw/2 && fx < px + pw/2 + fw/2 && (fy > py + ph/2 - fh/2 || fy < py - ph/2 + fh/2)) {
                this.die();
            }
            
        }
        if (pressedKeys[32] === true && human) {
            this.jump();
        }
        if (this.position.y < 0 + this.width / 2) {//ceiling check
            this.velocity.y *= -0.5;
            this.position.y = 0 + this.width / 2;
        }

    }
    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.position.x -this.width/2, this.position.y - this.height/2, this.width, this.height);
    }
    die() {
        this.position.y = 100;
        this.velocity.y = 0;
    }
}
