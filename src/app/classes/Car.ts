

export class Car {
    position: {[key: string]: number};
    velocity: {[key: string]: number};
    direction: number;
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
        this.direction = 0;
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

    }
    update() {

    }
}