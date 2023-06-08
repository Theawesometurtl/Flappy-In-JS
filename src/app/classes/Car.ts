import { collisionDetector } from "../actions/deathCheck";
import { ctx, entityList, globals } from "../../sharedGlobals";
import { pythagTheorem } from "../actions/trig";
import { inBetween } from "../actions/deathCheck"


export class Car {
    position: {[key: string]: number};
    velocity: {[key: string]: number};
    angle: number;
    accelleration: number;
    length: number;
    width: number;
    angularVelocity: number;
    angularAcceleration: number;
    drag: number;
    angularDrag: number;
    vertices: number[][];
    vertexCoords: number[][];
    checkpointReached: number;

    constructor(...vertices: number[][]) {
        this.angularDrag = 0.85;
        this.position = {x: globals.checkpoints[0][0], y: globals.checkpoints[0][1]};
        this.velocity = {x: 0, y: 0};
        this.angle = 0;
        this.accelleration = 0.6;
        this.length = 4;
        this.width = 10;
        this.angularVelocity = 0;
        this.angularAcceleration = 3;
        this.drag = .8;
        this.vertices = [[this.length, this.width], [-this.length, this.width], [-this.length, -this.width], [this.length, -this.width]];
        this.vertexCoords = [];
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertexCoords[i] = [];
            this.vertexCoords[i][0] = this.vertices[i][0] + this.position.x;
            this.vertexCoords[i][1] = this.vertices[i][1] + this.position.y;
        }
        this.checkpointReached = 0;
    }

    draw() {
        ctx.strokeStyle = 'purple';
        ctx.lineWidth = 1;
        ctx.fillStyle = 'white';

       ctx.beginPath();
       
       
       ctx.moveTo(this.vertexCoords[0][0], this.vertexCoords[0][1]);
       for (let i = 1; i < this.vertices.length; i++) {
          ctx.lineTo(this.vertexCoords[i][0], this.vertexCoords[i][1]);
       }
       ctx.closePath();
       ctx.fill();
       ctx.stroke();
    }
    update(): boolean {
        // console.log(this.position, this.velocity, this.angle, this.angularVelocity);
        this.angularVelocity*= this.angularDrag;
        this.angle += this.angularVelocity;
        
        //weeeee more trig!
        
        let radians = (Math.PI / 180) * this.angle;
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        this.velocity.x += this.accelleration * cos;
        this.velocity.y += this.accelleration * sin;
        
        let totalVelocity = pythagTheorem(this.velocity.x, this.velocity.y);
        if (totalVelocity !== 0) {
            let velocityAngle = 0;
            if (this.velocity.y < 0) {
                velocityAngle = Math.PI;
                velocityAngle += - Math.atan((this.velocity.x/-this.velocity.y));
            } else {
                velocityAngle += Math.atan((this.velocity.x/this.velocity.y));
            }
            // if (this.velocity.x < 0) {
            //     velocityAngle += Math.PI /4;
            // }
            // if (this.velocity.y < 0) {
            //     velocityAngle += Math.PI* 3 /4;
            // }
            totalVelocity *= this.drag;
            this.velocity.x = totalVelocity * Math.sin(velocityAngle);
            this.velocity.y = totalVelocity * Math.cos(velocityAngle);

            if (inBetween(globals.checkpoints[this.checkpointReached % globals.checkpoints.length][0] - globals.checkpointSize, globals.checkpoints[this.checkpointReached % globals.checkpoints.length][0] + globals.checkpointSize, this.position.x) && inBetween(globals.checkpoints[this.checkpointReached % globals.checkpoints.length][1] - globals.checkpointSize, globals.checkpoints[this.checkpointReached % globals.checkpoints.length][1] + globals.checkpointSize, this.position.y)) {
                this.checkpointReached++;
            }
        }
        // ctx.strokeStyle = 'black';
        // ctx.beginPath();
        // ctx.moveTo(this.position.x, this.position.y);
        // ctx.lineTo(this.velocity.x * 10 + this.position.x, this.velocity.y * 10 + this.position.y);
        // ctx.stroke();
    


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        for (let i = 0; i < this.vertices.length; i++) {
            this.vertexCoords[i][0] = (sin * this.vertices[i][0]) + (cos * this.vertices[i][1]) + this.position.x;
            this.vertexCoords[i][1] = (sin * this.vertices[i][1]) - (cos * this.vertices[i][0]) + this.position.y;
        }

        for (let obstacles = 0; obstacles < entityList.Barrier[0].vectors.length; obstacles++) {
            if (collisionDetector(this.vertexCoords, entityList.Barrier[0].vectors[obstacles])) {
            return true;
        }}
        return false;
    }
    steer(direction: number) {
        if (direction > 0.5) {
            direction = 1 - direction
            direction = (direction) **0.5
            direction = 0.5 - direction
            this.angularVelocity += direction * this.angularAcceleration;
        } else if (direction < 0.5) {
            direction = ((direction) ** 0.5)
            // console.log(direction);
            direction = -0.5 + direction
            // console.log(direction);

            this.angularVelocity += direction * this.angularAcceleration;
        }
        // this.angularVelocity += (direction-.5) * this.angularAcceleration
    }
}