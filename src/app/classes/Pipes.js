import { entityList, ctx, canvas } from "../../index";


export class Pipes {
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
            let pipe;
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
