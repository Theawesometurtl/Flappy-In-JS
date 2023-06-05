import { globals, canvas } from "../../sharedGlobals";
export function findMousePos(event: MouseEvent) {
    //needed to get mouse position relative to the canvas
    let rect = canvas.getBoundingClientRect();
    globals.mousePos = { 'x': event.clientX - rect.left, 'y': event.clientY - rect.top};
    //console.log(event.clientX - rect.left, event.clientY - rect.top);
}