import { entityList, ctx, canvas, pressedKeys, globals } from "../../sharedGlobals";
import { flappyDeathCheck } from "../actions/deathCheck";

interface FlappyInterface {
    position: {[key: string]: number};
    velocity: {[key: string]: number};
    width: number;
    height: number;
    jumpVelocity: number;
    drag: number;
    gravity: number;
}

export class Flappy implements FlappyInterface {
    position: { [key: string]: number; };
    velocity: { [key: string]: number; };
    width: number;
    height: number;
    jumpVelocity: number;
    drag: number;
    gravity: number;

    constructor() {
        this.position = {x: 50, y: canvas.height/2};
        this.velocity = {x: 0, y: 0};
        this.width = 50;
        this.height = 50;
        this.jumpVelocity = 21;
        this.drag = 0.9;
        this.gravity = 3;
        
    }
    jump():void {
        this.velocity.y = -this.jumpVelocity;
        
    }
    update():void {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.x *= this.drag;
        this.velocity.y += this.gravity;
        this.velocity.y *= this.drag;
        
        
        if (globals.human) {
            if (flappyDeathCheck(this.position.x, this.position.y, this.width, this.height)) {
                this.die();
            }
            if (this.position.y < 0 + this.width / 2) {//ceiling check
                this.velocity.y *= -0.5;
                this.position.y = 0 + this.width / 2;
            }
        }

        if (pressedKeys[32] === true && globals.human) {
            this.jump();
        }

    }
    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.position.x -this.width/2, this.position.y - this.height/2, this.width, this.height);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.position.x- this.width/2, this.position.y - this.height/2);
        ctx.lineTo(this.position.x + this.width/2, this.position.y - this.height/2);
        ctx.lineTo(this.position.x + this.width/2, this.position.y + this.height/2);
        ctx.lineTo(this.position.x - this.width/2, this.position.y + this.height/2);
        ctx.closePath();
        ctx.stroke()

    }
    die() {
        this.position.y = 100;
        this.velocity.y = 0;
    }
}
