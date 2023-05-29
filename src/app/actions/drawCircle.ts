import { ctx } from "../../index";

export function drawCircle(radius: number, fillColour: string, strokeColour: string, strokeWidth: number, posX : number, posY:number): void {
        ctx.beginPath();
        ctx.arc(posX, posY, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = fillColour;
        ctx.fill();
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = strokeColour;
        ctx.stroke();
    }
