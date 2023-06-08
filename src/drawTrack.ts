import { drivingStart } from './app/actions/drivingStart';
import { canvas } from './sharedGlobals';
import { findMousePos } from './app/actions/findMousePos';
import { entityList, globals, ctx } from './sharedGlobals';
import { Barrier } from './app/classes/Barrier';

canvas.addEventListener("mousemove", findMousePos);
entityList.Barrier = [];
entityList.Barrier.push(new Barrier([]))
globals.checkpoints = [];

let mode = "barrier"

canvas.addEventListener("click", function(){
    if (mode === "barrier") {
        entityList.Barrier[0].vectors[entityList.Barrier[0].vectors.length-1].push([globals.mousePos.x, globals.mousePos.y]);
        let s: string = '';
        for (let i = 0; i < entityList.Barrier[0].vectors[entityList.Barrier[0].vectors.length-1].length; i++) {
            s = s + '[' +entityList.Barrier[0].vectors[entityList.Barrier[0].vectors.length-1][i][0] + ',' + entityList.Barrier[0].vectors[entityList.Barrier[0].vectors.length-1][i][1] +'], '
        }
        entityList.Barrier[0].draw();
        console.log(s);
    }
    if (mode === 'checkpoint') {
        globals.checkpoints.push([globals.mousePos.x, globals.mousePos.y]);
        for (let i = 0; i < globals.checkpoints.length; i++) {
            ctx.fillStyle = 'green';
            ctx.lineWidth = 0;
            ctx.fillRect(globals.checkpoints[i][0] - globals.checkpointSize/2, globals.checkpoints[i][1] - globals.checkpointSize/2, globals.checkpointSize, globals.checkpointSize);
        }
    }
});

document.addEventListener('keydown', function(event){
    if (event.key === 'l') {
        mode = 'barrier';
        entityList.Barrier[0].vectors.push([])
    }
    if (event.key === 'b') {
        mode = 'barrier';
    }
    if (event.key === 'c') {
        mode = 'checkpoint';
    }
    if (event.key === 's') {
        localStorage.setItem("barrier", JSON.stringify(entityList.Barrier[0].vectors));
        localStorage.setItem("checkpoint", JSON.stringify(globals.checkpoints));
        window.location.href = "./customSimulation.html"; 
    }
} );





