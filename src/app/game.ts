import { canvas, ctx, globals, entityList, human } from '../index';
import { Pipes } from './classes/Pipes';
import { displayNetwork } from './actions/displayNetwork';
import { activationFunction } from './actions/activationFunction';
import { artificialSelection } from './actions/artificialSelection';
import { deathCheck } from './actions/deathCheck';
import { simulationReset } from './actions/simulationReset';
// import { parralaxBackground } from './actions/parralaxBackground';




export function main() {
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // parralaxBackground(globals.timer, 1, 2, 3, 4, 5);


    if (human) {
        for (let j = 0; j < entityList.Flappies.length; j++) {
            //console.log(key, entityList[key][j]);
            entityList.Flappies[j].update();
            entityList.Flappies[j].draw();
        }
        for (let j = 0; j < entityList.Pipes.length; j++) {
            //console.log(key, entityList[key][j]);
            entityList.Pipes[j].update();
            entityList.Pipes[j].draw();
        }

    } else {
        for (let i=0; i<entityList.Pipes.length; i++)   {
            entityList.Pipes[i].draw();
        }
        for (let i=0; i<entityList.Pipes.length; i++)   {// bad code, but pipes destroying themselves messes things up
            entityList.Pipes[i].update();
        }
        
        let pipeX = entityList.Pipes[0].position.x*2 / canvas.width;
        let pipeGapY = entityList.Pipes[0].position.y / canvas.height;
        
        
        for (let f=0; f<entityList.Flappies.length; f++) {
            if (entityList.Flappies[f] !== undefined) { 
                let flappyY = entityList.Flappies[f].position.y/ canvas.height;
                let flappyVelocity = entityList.Flappies[f].velocity.y;
                // console.log(activationFunction(flappyY, flappyVelocity, pipeX, pipeGapY));
                let inputs = activationFunction(flappyY, flappyVelocity, pipeX, pipeGapY);
    
                let outputs = entityList.NNs[f].update(0, ...inputs);
                if (outputs[0] > .5) {
                    entityList.Flappies[f].jump();
                }
                ctx.font = "30px Arial";
                ctx.fillStyle = "white";
                // ctx.fillText(outputs, 10, 50);
                // ctx.fillText(inputs[0], canvas.width - 100, 50);
                // ctx.fillText(inputs[1], canvas.width - 100, 100);
                // ctx.fillText(inputs[2], canvas.width - 100, 150);
                // ctx.fillText(inputs[3], canvas.width - 100, 200);
                // console.log(outputs);
                if (deathCheck(entityList.Flappies[f].position.x, entityList.Flappies[f].position.y, entityList.Flappies[f].width, entityList.Flappies[f].height)) {
                    globals.fitnessDictionary[f] = globals.timer;
                    entityList.Flappies[f] = undefined;
                    if (Object.keys(globals.fitnessDictionary).length === globals.simulatedFlappies) {
                        simulationReset();
                    }
                } else {
                    entityList.Flappies[f].draw();
                    entityList.Flappies[f].update();
                }
            }
        }
        
        displayNetwork(100, 50, canvas.width -400, canvas.height - 300, entityList.NNs[0].weightArray, entityList.NNs[0].biasArray, 0);
        globals.timer++;
    }
    globals.pipeTimer ++;
    
    if (globals.pipeTimer % 100 === 0) {
        entityList.Pipes.push(new Pipes());
    }
}


    

