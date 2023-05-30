import { canvas, ctx, globals, entityList, human } from '../index';
import { Pipes } from './classes/Pipes';
import { displayNetwork } from './actions/displayNetwork';
import { activationFunction } from './actions/activationFunction';
import { artificialSelection, restockEntityList } from './actions/artificialSelection';
import { deathCheck } from './actions/deathCheck';
import { simulationReset } from './actions/simulationReset';
import { basicCheck } from './actions/networkCheck';
import { drawText } from './actions/drawInputs';
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
        let pipeX = entityList.Pipes[0].position.x*2 / canvas.width;
        let pipeGapY = entityList.Pipes[0].position.y / canvas.height;
        let flappyY;
        let flappyVelocity;
        flappyY = entityList.Flappies[0].position.y/ canvas.height;
        flappyVelocity = entityList.Flappies[0].velocity.y / 8;
        if (entityList.Flappies[0] !== undefined) {
            drawText(pipeX, pipeGapY, flappyY, flappyVelocity);
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
        let flappyY;
        let flappyVelocity;
        
        
        for (let f=0; f<entityList.Flappies.length; f++) {
            if (entityList.Flappies[f] !== undefined) { 
                flappyY = entityList.Flappies[f].position.y/ canvas.height;
                flappyVelocity = entityList.Flappies[f].velocity.y / 8;
                // console.log(activationFunction(flappyY, flappyVelocity, pipeX, pipeGapY));
                let inputs: number[] = activationFunction(flappyY, flappyVelocity, pipeX, pipeGapY);
    
                let outputs = entityList.NNs[f].update(0, ...inputs);
                if (outputs[0] > .5) {
                    entityList.Flappies[f].jump();
                }
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
        
        // ctx.fillText(outputs, 10, 50);
        if (entityList.Flappies[0] !== undefined) {
            drawText(pipeX, pipeGapY, flappyY, flappyVelocity);
        }
        
        displayNetwork(100, 50, canvas.width -400, canvas.height - 300, entityList.NNs[0].weightArray, entityList.NNs[0].biasArray, 0);
        //basicCheck()
        globals.timer++;
    }
    globals.pipeTimer ++;
    
    if (globals.pipeTimer % 100 === 0) {
        entityList.Pipes.push(new Pipes());
    }
}


    

