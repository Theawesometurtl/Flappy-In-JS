import { ctx, canvas, entityList } from "../../sharedGlobals";
interface PipesInterface {
    width: number;
    gapHeight: number;
    position: {[key: string]: number}
    velocity: {[key: string]: number}
    pipeNum: number;
}

export class Pipes implements PipesInterface {
    static numOfPipes: number = 0;
    width: number;
    gapHeight: number;
    position: {[key: string]: number}
    velocity: {[key: string]: number}
    pipeNum: number;

    constructor() {
        this.width = 50
        this.gapHeight = 200
        
        Pipes.numOfPipes++;
        this.pipeNum = Pipes.numOfPipes; 
        // ((this.pipeNum % 10)/10)
        this.position = {x: canvas.width + this.width, y: Math.random() * (canvas.height - this.gapHeight) + this.gapHeight/2};
        this.velocity = {x: -9, y: 0};
    }
    update(): void {
        this.position.x += this.velocity.x
        this.velocity.y += this.velocity.y
        if (this.position.x < 0 - this.width) {
            let pipe: any;
            for (pipe in entityList.Pipes) {
                if (entityList.Pipes[pipe].pipeNum === this.pipeNum) {
                    entityList.Pipes.splice(pipe, 1);
                }
            }
        }
    }
    draw(): void {
        ctx.fillStyle = "green";
        //top
        ctx.fillRect(this.position.x - this.width/2, 0, this.width, this.position.y-this.gapHeight/2);
        //bottom
        ctx.fillRect(this.position.x- this.width/2, this.position.y + this.gapHeight/2, this.width, canvas.height + 1000);
    }
}
