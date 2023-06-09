import { ctx, entityList, canvas } from "../../sharedGlobals";

export function drawText(x: number, y: number, ySpacing: number, ...inputs: any[]) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    for (let i = 0; i < inputs.length; i++) {
        ctx.fillText(inputs[i].toString(), x, y + i * ySpacing);
    }
}