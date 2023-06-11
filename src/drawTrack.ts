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

let undoList: Array<string> = [];

canvas.addEventListener("click", function(){
    if (mode === "barrier") {
        entityList.Barrier[0].vectors[entityList.Barrier[0].vectors.length-1].push([globals.mousePos.x, globals.mousePos.y]);
        let s: string = '';
        for (let i = 0; i < entityList.Barrier[0].vectors[entityList.Barrier[0].vectors.length-1].length; i++) {
            s = s + '[' +entityList.Barrier[0].vectors[entityList.Barrier[0].vectors.length-1][i][0] + ',' + entityList.Barrier[0].vectors[entityList.Barrier[0].vectors.length-1][i][1] +'], '
        }
        entityList.Barrier[0].draw();
        ctx.fillStyle= 'black';
        ctx.fillRect(entityList.Barrier[0].vectors[entityList.Barrier[0].vectors.length-1][entityList.Barrier[0].vectors[entityList.Barrier[0].vectors.length-1].length - 1][0]-5, entityList.Barrier[0].vectors[entityList.Barrier[0].vectors.length-1][entityList.Barrier[0].vectors[entityList.Barrier[0].vectors.length-1].length - 1][1]-5, 10, 10)
        console.log(s);
        undoList.push("barrier");
    }
    if (mode === 'checkpoint') {
        globals.checkpoints.push([globals.mousePos.x, globals.mousePos.y]);
        for (let i = 0; i < globals.checkpoints.length; i++) {
            ctx.fillStyle = 'green';
            ctx.lineWidth = 0;
            ctx.fillRect(globals.checkpoints[i][0] - globals.checkpointSize/4, globals.checkpoints[i][1] - globals.checkpointSize/4, globals.checkpointSize/2, globals.checkpointSize/2);
            console.log(globals.checkpoints[i]);
        }
        undoList.push("checkpoint");
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
    if (event.key === 'u') {
        if (undoList[undoList.length - 1] === "barrier") {
            undoList.splice(undoList.length - 1, 1)
            if (entityList.Barrier[0].vectors[entityList.Barrier[0].vectors.length-1].length === 0 && entityList.Barrier[0].vectors.length !== 0) {
                entityList.Barrier[0].vectors.splice(entityList.Barrier[0].vectors.length-1, 1)
            }
            entityList.Barrier[0].vectors[entityList.Barrier[0].vectors.length-1].splice(entityList.Barrier[0].vectors[entityList.Barrier[0].vectors.length-1].length-1, 1);
            if (entityList.Barrier[0].vectors[entityList.Barrier[0].vectors.length-1].length === 0 && entityList.Barrier[0].vectors.length !== 0) {
                entityList.Barrier[0].vectors.splice(entityList.Barrier[0].vectors.length-1, 1)
            }
        } else {if (undoList[undoList.length - 1] === "checkpoint") {
            undoList.splice(undoList.length - 1, 1)
            globals.checkpoints.splice(globals.checkpoints.length-1, 1);
        }}
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        entityList.Barrier[0].draw();
        for (let i = 0; i < globals.checkpoints.length; i++) {
            ctx.fillStyle = 'green';
            ctx.lineWidth = 0;
            ctx.fillRect(globals.checkpoints[i][0] - globals.checkpointSize/4, globals.checkpoints[i][1] - globals.checkpointSize/4, globals.checkpointSize/2, globals.checkpointSize/2);
            console.log(globals.checkpoints[i]);
        }

    }
} );





