import { ctx } from "driving";

export class Barrier {
    vectors: number[][];
    constructor(...vectors: number[][]) {
        this.vectors = [...vectors];
    }
    draw(): void {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.beginPath()
        ctx.moveTo(this.vectors[0][0], this.vectors[0][1]);
        for (let vect = 1; vect < this.vectors.length; vect++) {
            ctx.lineTo(this.vectors[vect][0], this.vectors[vect][1])
        }
        ctx.stroke()
    }
 }