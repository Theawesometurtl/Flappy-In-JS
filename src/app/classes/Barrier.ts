import { ctx } from "../../sharedGlobals";

export class Barrier {
    vectors: number[][][];
    constructor(...vectors: number[][][]) {
        this.vectors = vectors;
    }
    draw(): void {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.beginPath()
        for (let listV = 0; listV < this.vectors.length; listV++) {
            ctx.moveTo(this.vectors[listV][0][0], this.vectors[listV][0][1]);
            for (let vect = 1; vect < this.vectors[listV].length; vect++) {
                ctx.lineTo(this.vectors[listV][vect][0], this.vectors[listV][vect][1])
            }
            ctx.stroke()            
        }
    }
 }