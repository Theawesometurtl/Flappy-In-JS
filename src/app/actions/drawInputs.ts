import { ctx, entityList, canvas } from "../../sharedGlobals";

export function drawText(...inputs: number[]) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    for (let i = 0; i < inputs.length; i++) {
        ctx.fillText(inputs[i].toString(), canvas.width-100, 50 + i * 50);
    }
}