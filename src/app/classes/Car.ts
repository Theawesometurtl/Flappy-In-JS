import { ctx } from "../../driving";

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
    friction: number;

    constructor() {
        this.position = {x: 0, y: 0};
        this.velocity = {x: 0, y: 0};
        this.angle = 0;
        this.accelleration = 2;
        this.length = 50;
        this.width = 20;
        this.angularVelocity = 0;
        this.angularAcceleration = 5;
        this.drag = 0.9;
        this.angularDrag = this.drag;
        this.friction = 1;
    }

    draw() {
        ctx.strokeStyle = 'purple';
        ctx.lineWidth = 1;
        let dFromCentroid = Math.sqrt((this.width/2) ** 2 + (this.length/2) ** 2)
        ctx.beginPath() //weeeeee trig!
        ctx.moveTo(dFromCentroid * Math.cos(this.angle * Math.PI / 180), dFromCentroid * Math.sin(this.angle * Math.PI / 180));
        ctx.lineTo(dFromCentroid * Math.cos((this.angle + 90) * Math.PI / 180), dFromCentroid * Math.sin((this.angle + 90) * Math.PI / 180));
        ctx.lineTo(dFromCentroid * Math.cos((this.angle + 180) * Math.PI / 180), dFromCentroid * Math.sin((this.angle + 180) * Math.PI / 180));
        ctx.lineTo(dFromCentroid * Math.cos((this.angle + 270) * Math.PI / 180), dFromCentroid * Math.sin((this.angle + 2700) * Math.PI / 180));
        ctx.stroke()
        ctx.closePath()
        ctx.fillStyle = 'pink'
        ctx.fill()
    }
    update(): boolean {
        this.angularVelocity*= this.angularDrag;
        this.angle += this.angularVelocity;
        
        //weeeee more trig!
        this.velocity.x += this.accelleration * Math.cos(this.angle);
        this.velocity.y += this.accelleration * Math.sin(this.angle);
        let totalVelocity = Math.sqrt((this.velocity.x/2) ** 2 + (this.velocity.y/2) ** 2);
        totalVelocity *= this.drag;
        let velocityAngle = Math.asin(this.velocity.y/totalVelocity);
        this.velocity.x = totalVelocity * Math.sin(velocityAngle);
        this.velocity.y = totalVelocity * Math.cos(velocityAngle);

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (false) {
            return true;
        }
        return false;
    }
    steer(direction: number) {
        this.angularVelocity += (direction-.5) * this.angularAcceleration
    }
}